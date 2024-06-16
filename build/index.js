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
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
async function bootstrap() {
    mongoose_1.default.set("strictQuery", false);
    mongoose_1.default.Promise = Promise;
    await mongoose_1.default.connect(process.env.MONGO_URL ?? "");
    console.log({ url: process.env.MONGO_URL });
    mongoose_1.default.connection.on("error", (error) => console.log({ error }));
}
bootstrap();
app.get("/", (req, res) => {
    res.json("Express + TypeScript Server");
});
app.use("/auth", authentication_route_1.default);
app.use(error_middleware_1.ErrorMiddleware);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map