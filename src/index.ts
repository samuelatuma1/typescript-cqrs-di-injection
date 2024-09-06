// src/index.js
import "reflect-metadata";
import express, { Express, NextFunction, Request, response, Response } from "express";
import dotenv from "dotenv";import mongoose from "mongoose";
import authenticationRoute from "./api/routes/authentication_route";
import { ErrorMiddleware } from "./api/middlewares/error_middleware";

import { iocContainer } from "./api/program";
import shopRoute from "./api/routes/shop_route";
import productRoute from "./api/routes/product_route";
import saveCitiesCountriesStates from "./migrations/0001_save_cities";
import { commandOptions, createClient, RedisClientType } from 'redis'
import { inject, injectable } from "tsyringe";
import ICacheService, { IICacheService } from "./core/application/contract/services/cache/cache_service";
import SerializationUtility from "./core/application/common/utilities/serialization_utility";
import IEventService, { IIEventService } from "./core/application/contract/services/events/event_service";
import { EventQueueSizeStrategyMaxLength, EventQueueSizeStrategyRetention } from "./core/domain/model/events/subscribe_event_options";
import { TimeUnit } from "./core/domain/model/utiliities/time_unit";
import { orderServiceEventManager } from "./events/event_managers/shop/order_service_event_manager";
// Create a Multer instance with a destination folder for file uploads

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());

async function bootstrapMongoose() {
  mongoose.set("strictQuery", false);
  mongoose.Promise = Promise;
  await mongoose.connect(process.env.MONGO_URL ?? "");
  console.log({url: process.env.MONGO_URL})
  mongoose.connection.on("error", (error: Error) => console.log({error}));
}
bootstrapMongoose()

app.get("/", (req: Request, res: Response) => {
  res.json("Express + TypeScript Server");
});

// TEST REDIS


async function bootstrapRedis(){
  try{
    const redis = createClient({url: process.env.REDIS_URL})
    redis.on('error', (err) => console.log('Redis Client Error', err));
    console.log(`Successfully connected to redis on : ...:...${process.env.REDIS_URL?.slice(10)}`)
    return await redis.connect();
  }
  catch(ex){
    console.log('Redis Client Error', ex)
  }
}

bootstrapRedis()
@injectable()
class TestCache{
  constructor(@inject(IICacheService) private readonly cache: ICacheService){

  }

  public test = async () => {
    await this.cache.addAsync("Test_IN_CONFIG_2", {name: "Test in config 2000-100"}, 50)
    let saved = await this.cache.getAsync("Test_IN_CONFIG_2")
    return saved
  }
}

// let cacheTest = iocContainer.resolve(TestCache);
// app.get("/test-redis",  async (req, res, next) => {
//   let response = await cacheTest.test()
//   return res.json(response);
// })

/*
// consumer producer test

class Order {
  name: string;
  price: number;
  qty: number
}


@injectable()
class TestRedisEventservice{
   public constructor(@inject(IIEventService)private readonly eventService: IEventService){

   }
   testsendMessag = async (order: Order) => {
      let streamName = "STREAM_TEST"
      let d = new EventQueueSizeStrategyRetention({duration: 30, unit: TimeUnit.seconds});
      return await this.eventService.publishToQueue(streamName, order, d);
   }
}

let resolvedEventService = iocContainer.resolve(IIEventService) as unknown as IEventService

app.post("/test-redis-produce",  async (req: Request<{}, {}, Order>, res: Response, next: NextFunction) => {
  let eventService = iocContainer.resolve(TestRedisEventservice)
  let response = await eventService.testsendMessag(req.body)
  return res.json(response);
})

resolvedEventService.subscribeToQueue({
  queueName: "STREAM_TEST",
  consumerGroupName: "STREAM_TEST_GROUP",
  consumerName: "STREAM_TEST_CONSUMER",
  maxNumberOfEntries: 10,
  messageHandler: async (message: any, messageId: string) => {
    console.log("Handler for STREAM_TEST Event")
    let data = message
    console.log({message, messageId})
    return true;
  }
})
*/

// MIGRATIONS // PLEASE UNCOMMENT SESSION
// saveCitiesCountriesStates()


// consumers
orderServiceEventManager.consumeCreateOrderService();


//APIs
app.use("/auth", authenticationRoute);
app.use("/shop", shopRoute);
app.use("/product", productRoute)
app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
