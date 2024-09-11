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
import IEventService, { IIEventService } from "./core/application/contract/events/event_service";
import { EventQueueSizeStrategyMaxLength, EventQueueSizeStrategyRetention } from "./core/domain/model/events/subscribe_event_options";
import { TimeUnit } from "./core/domain/model/utiliities/time_unit";
import { orderServiceEventManager } from "./events/event_managers/shop/order_service_event_manager";
import { productServiceEventManager } from "./events/event_managers/shop/product_service_event_manager";
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

// TEST REDIS Connection
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



// MIGRATIONS // PLEASE UNCOMMENT SESSION
// saveCitiesCountriesStates()


// consumers
orderServiceEventManager.consumeCreateOrderService();
productServiceEventManager.consumeCreateReviewService();

//APIs
app.use("/auth", authenticationRoute);
app.use("/shop", shopRoute);
app.use("/product", productRoute)
app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
