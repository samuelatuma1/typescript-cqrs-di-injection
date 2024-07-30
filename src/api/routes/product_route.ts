import { upload } from "../../api/middlewares/multer_upload";
import ProductController from "../../api/controllers/product_controller";
import { iocContainer } from "../../api/program";
import { Router } from "express";
import { Request } from "express";
import { Types } from "mongoose";

const productRoute = Router();
const productController = iocContainer.resolve(ProductController);
productRoute.post("/", upload.fields([{name: 'mainImg', maxCount: 1}, {name: 'otherMedia', maxCount: 10}]), (req, res, next) => productController.createProduct(req, res, next));
productRoute.put("/:productId", (req: Request<{productId: string}>, res, next) => productController.updateProduct(req, res, next))
productRoute.get("/:productId", (req: Request<{productId: string}>, res, next) => productController.getProduct(req, res, next))
productRoute.post("/:productId")
productRoute.get("/special-offer/:offerId", (req: Request<{offerId: Types.ObjectId }>, res, next ) => productController.specialOffers(req, res, next));
export default productRoute;