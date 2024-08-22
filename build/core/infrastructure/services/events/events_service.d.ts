import IRedisConfig from "../../../application/common/config/redis_config";
import IEventTracer from "../../../application/contract/observability/event_tracer";
import IEventService from "../../../application/contract/services/events/event_service";
import { listenToStreamOptions } from "../../../domain/model/events/subscribe_event_options";
export default class RedisEventService implements IEventService {
    private readonly config;
    private readonly eventTracer;
    private redisClient;
    constructor(config: IRedisConfig, eventTracer: IEventTracer);
    private getRedisConnection;
    addMessage: (streamName: string, message: any) => Promise<string | null>;
    subscribe: (options: listenToStreamOptions) => Promise<void>;
}
