import IRedisConfig from "../../../application/common/config/redis_config";
import IEventTracer from "../../../application/contract/observability/event_tracer";
import IEventService from "../../../application/contract/events/event_service";
import { EventQueueSizeStrategyMaxLength, EventQueueSizeStrategyRetention, listenToQueueOptions } from "../../../domain/model/events/subscribe_event_options";
export default class RedisEventService implements IEventService {
    private readonly config;
    private readonly eventTracer;
    private redisClient;
    constructor(config: IRedisConfig, eventTracer: IEventTracer);
    private getRedisConnection;
    publishToQueue: (queueName: string, message: any, options?: EventQueueSizeStrategyRetention | EventQueueSizeStrategyMaxLength) => Promise<string | null>;
    subscribeToQueue: (options: listenToQueueOptions) => Promise<void>;
}
