import SerializationUtility from "../../../application/common/utilities/serialization_utility";
import IRedisConfig, { IIRedisConfig } from "../../../application/common/config/redis_config";
import { commandOptions, createClient, RedisClientType } from "redis";
import { inject, injectable } from "tsyringe";
import IEventTracer, { IIEventTracer } from "../../../application/contract/observability/event_tracer";
import IEventService from "../../../application/contract/services/events/event_service";
import { listenToStreamOptions } from "../../../domain/model/events/subscribe_event_options";





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

    public addMessage = async (streamName: string, message: any): Promise<string | null> => {
        try{
            let connection = await this.getRedisConnection();
            if(!connection){
                return null;
            }
            let dataPack = {data: SerializationUtility.serializeJson(message)};
            let id = '*';
            let messageId = await connection.xAdd(streamName, id, dataPack);
            return messageId;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            return null;
        }
    }

    public subscribe = async (options: listenToStreamOptions): Promise<void> => {
        let connection = await this.getRedisConnection();
        if(!connection){
            return ;
        }
        const idInitialPosition = '0';
        console.log({options})
        
        // if stream has not been created create consumer group
        if(!(await connection.exists(options.streamName))){ 
            await connection.xGroupCreate(options.streamName, options.consumerGroupName, idInitialPosition, {MKSTREAM: true} )
        }

        let stream = {
            key: options.streamName,
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
                    if(streamKeyName === options.streamName){
                        for(let message of data.messages){
                            //trigger appropriate action callback for each message
                            await options.messageHandler(message, message.id)
                            await connection.xAck(options.streamName, options.consumerGroupName, message.id)
                        }

                    }
                }
            }
        }
        
    }
}