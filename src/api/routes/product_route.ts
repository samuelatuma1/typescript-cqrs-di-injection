import { upload } from "../../api/middlewares/multer_upload";
import ProductController from "../../api/controllers/product_controller";
import { iocContainer } from "../../api/program";
import { Router } from "express";
import { Request } from "express";
import { Types } from "mongoose";

const productRoute = Router();
const productController = iocContainer.resolve(ProductController);
// public addPackProduct = async (req: Request<{productId: Types.ObjectId }>, res: Response, next: NextFunction) 
productRoute.post("/", upload.fields([{name: 'mainImg', maxCount: 1}, {name: 'otherMedia', maxCount: 10}]), (req, res, next) => productController.createProduct(req, res, next));


productRoute.post("/add-pack-product/:productId", upload.fields([{name: 'mainImg', maxCount: 1}, {name: 'otherMedia', maxCount: 10}]), (req: Request, res , next) => productController.addPackProduct(req as unknown as Request<{productId: Types.ObjectId}>, res, next));
productRoute.delete("/delete-pack-product/:productId", (req: Request, res , next) => productController.deletePackProduct(req as unknown as Request<{productId: Types.ObjectId}, {}, {}, {packProductId: Types.ObjectId | string}>, res, next));

productRoute.put("/update-pack-product/:productId", upload.fields([{name: 'mainImg', maxCount: 1}, {name: 'otherMedia', maxCount: 10}]), (req: Request, res , next) => productController.updatePackProduct(req as unknown as Request<{productId: Types.ObjectId }, {}, {data: string}, {packProductId: Types.ObjectId | string}>, res, next));

productRoute.put("/:productId", (req: Request<{productId: string}>, res, next) => productController.updateProduct(req, res, next))
productRoute.get("/:productId", (req: Request<{productId: string}>, res, next) => productController.getProduct(req, res, next))
productRoute.post("/:productId")
productRoute.get("/special-offer/:offerId", (req: Request<{offerId: Types.ObjectId }>, res, next ) => productController.specialOffers(req, res, next));



export default productRoute;