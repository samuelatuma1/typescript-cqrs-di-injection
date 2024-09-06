import SerializationUtility from "../../../application/common/utilities/serialization_utility";
import IRedisConfig, { IIRedisConfig } from "../../../application/common/config/redis_config";
import { commandOptions, createClient, RedisClientType } from "redis";
import { inject, injectable } from "tsyringe";
import IEventTracer, { IIEventTracer } from "../../../application/contract/observability/event_tracer";
import IEventService from "../../../application/contract/services/events/event_service";
import { EventQueueSizeStrategyMaxLength, EventQueueSizeStrategyRetention, listenToQueueOptions } from "../../../domain/model/events/subscribe_event_options";
import DateUtility from "../../../application/common/utilities/date_utility";

@injectable()
export default class RedisEventService implements IEventService {
    private redisClient: RedisClientType | null = null;

    constructor(
        @inject(IIRedisConfig)private readonly config: IRedisConfig,
        @inject(IIEventTracer)private readonly eventTracer: IEventTracer
    ) {
        
    }

    private getRedisConnection = async () => {
        try {
            // Connect and assign the redisClient
            if(!this.redisClient){
                const redis: RedisClientType = createClient({ url: this.config.REDIS_URL });
                this.redisClient = await redis.connect();
            }
            return this.redisClient;
            
        } catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            return null;
        }
      }

    ///
    public publishToQueue = async (queueName: string, message: any, options?: EventQueueSizeStrategyRetention | EventQueueSizeStrategyMaxLength): Promise<string | null> => {
        try{
            let connection = await this.getRedisConnection();
            if(!connection){
                return null;
            }
            let dataPack = {data: SerializationUtility.serializeJson(message)};
            console.log({dataPack})
            let id = '*';
            let messageId = await connection.xAdd(queueName, id, dataPack);
            if(options){
                console.log({options})
                if(options instanceof EventQueueSizeStrategyMaxLength){
                    connection.xTrim(queueName, "MAXLEN", options.maxLength) // No need to await this execution
                }
                else if(options instanceof EventQueueSizeStrategyRetention){
                    let unixTimeinMilliseconds = DateUtility.getUnixTimeInMilliseconds();
                    let computedMinId = unixTimeinMilliseconds - DateUtility.getMillisecondsInTime(options.duration, options.unit);
                    // let id = `${computedMinId}-0`
                    connection.xTrim(queueName, "MINID", computedMinId)
                }
            }
            
            return messageId;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            return null;
        }
    }

    public subscribeToQueue = async (options: listenToQueueOptions): Promise<void> => {
        let connection = await this.getRedisConnection();
        if(!connection){
            return ;
        }
        const idInitialPosition = '0';
        console.log({options})
        
        // if consumer group has not been created create consumer group
        if(!(await connection.exists(options.queueName))){ 
            this.eventTracer.say(`Creating new Consumer group with name ${options.consumerGroupName} for queue ${options.queueName}`)

            await connection.xGroupCreate(options.queueName, options.consumerGroupName, idInitialPosition, {MKSTREAM: true} )
        }

        let stream = {
            key: options.queueName,
            id: '>', // Next entry ID that no consumer in this group has read
        };
        
        // read set of message from stream
        while(true){
            const dataArr = await connection.xReadGroup(
                commandOptions({
                    isolated: true
                }),
                options.consumerGroupName,
                options.consumerName,
                [
                    stream
                ],
                {
                    COUNT: options.maxNumberOfEntries, // Read n entries at a time
                    BLOCK: 5, //block for 0 (infinite) seconds if there are none.
                },

            )

            if (dataArr && dataArr.length){
                for(let data of dataArr){
                    const streamKeyName = data.name;
                    if(streamKeyName === options.queueName){
                        for(let message of data.messages){
                            //trigger appropriate action callback for each message
                            let callBack = await options.messageHandler(message.message, message.id)
                            if(!callBack){
                                 // Add to dead-letter queue if failed to process after a while
                                if(options.saveFailedProcessesToDeadLetterQueue){
                                    let retryCount = 1;
                                    let maxRetryCount = options.saveFailedProcessesToDeadLetterQueue.maxReprocessRetry;
                                    while(!callBack  && retryCount < maxRetryCount){
                                        callBack = await options.messageHandler(message.message, message.id)
                                        retryCount++;
                                    }
                                    if(retryCount >= maxRetryCount){
                                        let dlqName = options.saveFailedProcessesToDeadLetterQueue.deadLetterQueueName;

                                        await this.publishToQueue(dlqName, message, options.saveFailedProcessesToDeadLetterQueue.sizeStrategy);
                                    }
                                }
                            }
                            await connection.xAck(options.queueName, options.consumerGroupName, message.id)
                        }

                    }
                }
            }
        }
        
    }
}