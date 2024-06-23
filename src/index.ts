// src/index.js
import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";import mongoose from "mongoose";
import authenticationRoute from "./api/routes/authentication_route";
import { ErrorMiddleware } from "./api/middlewares/error_middleware";

import {v2 as cloudinary} from 'cloudinary';
import { iocContainer } from "./api/program";
import IFileService, { IIFileService } from "./core/application/contract/services/files/file_service";
import UploadFile from "./core/domain/common/model/upload_file";
import { upload } from "./api/middlewares/multer_upload";
import shopRoute from "./api/routes/shop_route";
import productRoute from "./api/routes/product_route";

// Create a Multer instance with a destination folder for file uploads

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





const deleteImage = async (public_id: string) => {
  const deleted = await cloudinary.uploader.destroy(public_id)
}
let testCloudinary: IFileService = iocContainer.resolve(IIFileService)
app.post("/test-image", upload.single('file'), async (req: Request, res: Response) => {
  req.files
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  console.log({file: req.file})
  let uploadedImage = await testCloudinary.uploadFile(new UploadFile("", req.file.path))
  res.json({ uploadedImage });
});

app.use("/auth", authenticationRoute);
app.use("/shop", shopRoute);
app.use("/product", productRoute)
app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
