// src/index.js
import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";import mongoose from "mongoose";
import authenticationRoute from "./api/routes/authentication_route";
import { ErrorMiddleware } from "./api/middlewares/error_middleware";

dotenv.config();



const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());

async function bootstrap() {
  mongoose.set("strictQuery", false);
  mongoose.Promise = Promise;
  await mongoose.connect(process.env.MONGO_URL ?? "");
  console.log({url: process.env.MONGO_URL})
  mongoose.connection.on("error", (error: Error) => console.log({error}));
}
bootstrap()

app.get("/", (req: Request, res: Response) => {
  res.json("Express + TypeScript Server");
});

app.use("/auth", authenticationRoute);

app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
