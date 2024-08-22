import { createClient, RedisClientType,  } from "redis";
import IRedisConfig, { IIRedisConfig } from "../../../application/common/config/redis_config";
import SerializationUtility from "../../../application/common/utilities/serialization_utility";
import { inject, injectable } from "tsyringe";
import ICacheService from "../../../application/contract/services/cache/cache_service";

@injectable()
export class RedisCache implements ICacheService{
    private redisClient: RedisClientType | null = null;

    constructor(@inject(IIRedisConfig)private readonly config: IRedisConfig) {
        try {
            const redis: RedisClientType = createClient({ url: this.config.REDIS_URL });
            console.log({redis_url: this.config.REDIS_URL})
            redis.on('error', (err) => console.log('Redis Client Error', err));

            // Connect and assign the redisClient
            this.getRedisConnection()
              .then(resp => {
                this.redisClient = resp;
              })
        } catch (ex) {
            console.log('Redis Client Error', ex);
        }
    }

    public getRedisConnection = async () => {
      if(!this.redisClient){
          const redis: RedisClientType = createClient({ url: this.config.REDIS_URL });
          this.redisClient = await redis.connect();
      }
      return this.redisClient;
    }
    public addAsync = async (key: string, value: object, durationInSeconds: number): Promise<boolean> => {
      try{
        let redisConnection = await this.getRedisConnection();
        let valueAsJson = SerializationUtility.serializeJson(value)
        let response = redisConnection.set(key, valueAsJson, {EX: durationInSeconds})
        
        return true;
      }
      catch(ex){
        console.log(ex);
        return false;
      }
    }
  
    public getAsync = async <T>(key: string): Promise<T | null> => {
      try{
        let redisConnection = await this.getRedisConnection();
        let json = await redisConnection.get(key);
        return SerializationUtility.deserializeJson<T>(json);
      }
      catch(ex){
        console.log(ex);
        return null;
      }
    }
  }