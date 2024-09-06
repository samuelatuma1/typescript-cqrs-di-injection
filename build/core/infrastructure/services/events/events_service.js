"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serialization_utility_1 = __importDefault(require("../../../application/common/utilities/serialization_utility"));
const redis_config_1 = require("../../../application/common/config/redis_config");
const redis_1 = require("redis");
const tsyringe_1 = require("tsyringe");
const event_tracer_1 = require("../../../application/contract/observability/event_tracer");
const subscribe_event_options_1 = require("../../../domain/model/events/subscribe_event_options");
const date_utility_1 = __importDefault(require("../../../application/common/utilities/date_utility"));
let RedisEventService = class RedisEventService {
    config;
    eventTracer;
    redisClient = null;
    constructor(config, eventTracer) {
        this.config = config;
        this.eventTracer = eventTracer;
    }
    getRedisConnection = async () => {
        try {
            // Connect and assign the redisClient
            if (!this.redisClient) {
                const redis = (0, redis_1.createClient)({ url: this.config.REDIS_URL });
                this.redisClient = await redis.connect();
            }
            return this.redisClient;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            return null;
        }
    };
    ///
    publishToQueue = async (queueName, message, options) => {
        try {
            let connection = await this.getRedisConnection();
            if (!connection) {
                return null;
            }
            let dataPack = { data: serialization_utility_1.default.serializeJson(message) };
            console.log({ dataPack });
            let id = '*';
            let messageId = await connection.xAdd(queueName, id, dataPack);
            if (options) {
                console.log({ options });
                if (options instanceof subscribe_event_options_1.EventQueueSizeStrategyMaxLength) {
                    connection.xTrim(queueName, "MAXLEN", options.maxLength); // No need to await this execution
                }
                else if (options instanceof subscribe_event_options_1.EventQueueSizeStrategyRetention) {
                    let unixTimeinMilliseconds = date_utility_1.default.getUnixTimeInMilliseconds();
                    let computedMinId = unixTimeinMilliseconds - date_utility_1.default.getMillisecondsInTime(options.duration, options.unit);
                    // let id = `${computedMinId}-0`
                    connection.xTrim(queueName, "MINID", computedMinId);
                }
            }
            return messageId;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            return null;
        }
    };
    subscribeToQueue = async (options) => {
        let connection = await this.getRedisConnection();
        if (!connection) {
            return;
        }
        const idInitialPosition = '0';
        console.log({ options });
        // if consumer group has not been created create consumer group
        if (!(await connection.exists(options.queueName))) {
            this.eventTracer.say(`Creating new Consumer group with name ${options.consumerGroupName} for queue ${options.queueName}`);
            await connection.xGroupCreate(options.queueName, options.consumerGroupName, idInitialPosition, { MKSTREAM: true });
        }
        let stream = {
            key: options.queueName,
            id: '>', // Next entry ID that no consumer in this group has read
        };
        // read set of message from stream
        while (true) {
            const dataArr = await connection.xReadGroup((0, redis_1.commandOptions)({
                isolated: true
            }), options.consumerGroupName, options.consumerName, [
                stream
            ], {
                COUNT: options.maxNumberOfEntries, // Read n entries at a time
                BLOCK: 5, //block for 0 (infinite) seconds if there are none.
            });
            if (dataArr && dataArr.length) {
                for (let data of dataArr) {
                    const streamKeyName = data.name;
                    if (streamKeyName === options.queueName) {
                        for (let message of data.messages) {
                            //trigger appropriate action callback for each message
                            let callBack = await options.messageHandler(message.message, message.id);
                            if (!callBack) {
                                // Add to dead-letter queue if failed to process after a while
                                if (options.saveFailedProcessesToDeadLetterQueue) {
                                    let retryCount = 1;
                                    let maxRetryCount = options.saveFailedProcessesToDeadLetterQueue.maxReprocessRetry;
                                    while (!callBack && retryCount < maxRetryCount) {
                                        callBack = await options.messageHandler(message.message, message.id);
                                        retryCount++;
                                    }
                                    if (retryCount >= maxRetryCount) {
                                        let dlqName = options.saveFailedProcessesToDeadLetterQueue.deadLetterQueueName;
                                        await this.publishToQueue(dlqName, message, options.saveFailedProcessesToDeadLetterQueue.sizeStrategy);
                                    }
                                }
                            }
                            await connection.xAck(options.queueName, options.consumerGroupName, message.id);
                        }
                    }
                }
            }
        }
    };
};
RedisEventService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(redis_config_1.IIRedisConfig)),
    __param(1, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __metadata("design:paramtypes", [Object, Object])
], RedisEventService);
exports.default = RedisEventService;
//# sourceMappingURL=events_service.js.map