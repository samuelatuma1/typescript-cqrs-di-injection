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
const tsyringe_1 = require("tsyringe");
const cache_service_1 = require("./core/application/contract/services/cache/cache_service");
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
// TEST REDIS
async function bootstrapRedis() {
    try {
        const redis = (0, redis_1.createClient)({ url: process.env.REDIS_URL });
        redis.on('error', (err) => console.log('Redis Client Error', err));
        return await redis.connect();
        console.log("Redis connected on " + process.env.REDIS_URL);
    }
    catch (ex) {
        console.log('Redis Client Error', ex);
    }
}
// bootstrapRedis()
let TestCache = class TestCache {
    cache;
    constructor(cache) {
        this.cache = cache;
    }
    test = async () => {
        await this.cache.addAsync("Test_IN_CONFIG_2", { name: "Test in config 2000-100" }, 50);
        let saved = await this.cache.getAsync("Test_IN_CONFIG_2");
        return saved;
    };
};
TestCache = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(cache_service_1.IICacheService)),
    __metadata("design:paramtypes", [Object])
], TestCache);
// let cacheTest = iocContainer.resolve(TestCache);
// app.get("/test-redis",  async (req, res, next) => {
//   let response = await cacheTest.test()
//   return res.json(response);
// })
// consumer producer test
class Order {
    name;
    price;
    qty;
}
// @injectable()
// class TestRedisEventservice{
//    public constructor(@inject(IIEventService)private readonly eventService: IEventService){
//    }
//    testsendMessag = async (order: Order) => {
//       let streamName = "STREAM_TEST"
//       return await this.eventService.addMessage(streamName, order);
//    }
// }
// let resolvedEventService = iocContainer.resolve(IIEventService) as unknown as IEventService
// app.post("/test-redis-produce",  async (req: Request<{}, {}, Order>, res: Response, next: NextFunction) => {
//   let eventService = iocContainer.resolve(TestRedisEventservice)
//   let response = await eventService.testsendMessag(req.body)
//   return res.json(response);
// })
// resolvedEventService.subscribe({
//   streamName: "STREAM_TEST",
//   consumerGroupName: "STREAM_TEST_GROUP",
//   consumerName: "STREAM_TEST_CONSUMER",
//   maxNumberOfEntries: 10,
//   messageHandler: async (message: any, messageId: string) => {
//     console.log("Handler for STREAM_TEST Event")
//     let data = message
//     console.log({message, messageId})
//     return true;
//   }
// })
// MIGRATIONS // PLEASE UNCOMMENT SESSION
// saveCitiesCountriesStates()
app.use("/auth", authentication_route_1.default);
app.use("/shop", shop_route_1.default);
app.use("/product", product_route_1.default);
app.use(error_middleware_1.ErrorMiddleware);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map