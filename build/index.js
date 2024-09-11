"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.js
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const authentication_route_1 = __importDefault(require("./api/routes/authentication_route"));
const error_middleware_1 = require("./api/middlewares/error_middleware");
const shop_route_1 = __importDefault(require("./api/routes/shop_route"));
const product_route_1 = __importDefault(require("./api/routes/product_route"));
const redis_1 = require("redis");
const order_service_event_manager_1 = require("./events/event_managers/shop/order_service_event_manager");
const product_service_event_manager_1 = require("./events/event_managers/shop/product_service_event_manager");
// Create a Multer instance with a destination folder for file uploads
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
async function bootstrapMongoose() {
    mongoose_1.default.set("strictQuery", false);
    mongoose_1.default.Promise = Promise;
    await mongoose_1.default.connect(process.env.MONGO_URL ?? "");
    console.log({ url: process.env.MONGO_URL });
    mongoose_1.default.connection.on("error", (error) => console.log({ error }));
}
bootstrapMongoose();
app.get("/", (req, res) => {
    res.json("Express + TypeScript Server");
});
// TEST REDIS Connection
async function bootstrapRedis() {
    try {
        const redis = (0, redis_1.createClient)({ url: process.env.REDIS_URL });
        redis.on('error', (err) => console.log('Redis Client Error', err));
        console.log(`Successfully connected to redis on : ...:...${process.env.REDIS_URL?.slice(10)}`);
        return await redis.connect();
    }
    catch (ex) {
        console.log('Redis Client Error', ex);
    }
}
bootstrapRedis();
// MIGRATIONS // PLEASE UNCOMMENT SESSION
// saveCitiesCountriesStates()
// consumers
order_service_event_manager_1.orderServiceEventManager.consumeCreateOrderService();
product_service_event_manager_1.productServiceEventManager.consumeCreateReviewService();
//APIs
app.use("/auth", authentication_route_1.default);
app.use("/shop", shop_route_1.default);
app.use("/product", product_route_1.default);
app.use(error_middleware_1.ErrorMiddleware);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map