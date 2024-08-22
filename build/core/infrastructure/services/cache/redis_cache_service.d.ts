import { RedisClientType } from "redis";
import IRedisConfig from "../../../application/common/config/redis_config";
import ICacheService from "../../../application/contract/services/cache/cache_service";
export declare class RedisCache implements ICacheService {
    private readonly config;
    private redisClient;
    constructor(config: IRedisConfig);
    getRedisConnection: () => Promise<RedisClientType>;
    addAsync: (key: string, value: object, durationInSeconds: number) => Promise<boolean>;
    getAsync: <T>(key: string) => Promise<T | null>;
}
