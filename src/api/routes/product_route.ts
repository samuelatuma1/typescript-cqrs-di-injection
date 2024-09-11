import { upload } from "../../api/middlewares/multer_upload";
import ProductController from "../../api/controllers/product_controller";
import { iocContainer } from "../../api/program";
import { NextFunction, Router } from "express";
import { Request, Response } from "express";
import { Types } from "mongoose";
import JwtMiddlewareAuth from "../../api/middlewares/jwt_auth_middleware";
import { BestSellersQuery } from "../../core/domain/shop/dto/requests/product_requests";

const productRoute = Router();
const productController = iocContainer.resolve(ProductController);
const jwtMiddleware = iocContainer.resolve(JwtMiddlewareAuth)
// public addPackProduct = async (req: Request<{productId: Types.ObjectId }>, res: Response, next: NextFunction) 
productRoute.post("/", 
    (req: Request, res: Response, next: NextFunction) => jwtMiddleware.verifyUserHasPermission(["createproduct", "updateshop"], req, res, next),
    upload.fields([{name: 'mainImg', maxCount: 1}, {name: 'otherMedia', maxCount: 10}]), 
    (req, res, next) => productController.createProduct(req, res, next));


productRoute.post("/add-pack-product/:productId",  upload.fields([{name: 'mainImg', maxCount: 1}, {name: 'otherMedia', maxCount: 10}]), (req: Request, res , next) => productController.addPackProduct(req as unknown as Request<{productId: Types.ObjectId}>, res, next));
productRoute.post("/add-pack-products/:productId", upload.fields(
    [
        {name: 'mainImg1', maxCount: 1}, {name: 'mainImg2', maxCount: 1}, {name: 'mainImg3', maxCount: 1}, {name: 'mainImg4', maxCount: 1}, {name: 'mainImg5', maxCount: 1},
        {name: 'mainImg6', maxCount: 1}, {name: 'mainImg7', maxCount: 1}, {name: 'mainImg8', maxCount: 1}, {name: 'mainImg9', maxCount: 1}, {name: 'mainImg10', maxCount: 1}
    
    ]), 
    (req: Request, res , next) => productController.addPackProducts(req as unknown as Request<{productId: Types.ObjectId}>, res, next));

productRoute.delete("/delete-pack-product/:productId", (req: Request, res , next) => productController.deletePackProduct(req as unknown as Request<{productId: Types.ObjectId}, {}, {}, {packProductId: Types.ObjectId | string}>, res, next));
productRoute.put("/update-pack-product/:productId", upload.fields([{name: 'mainImg', maxCount: 1}, {name: 'otherMedia', maxCount: 10}]), (req: Request, res , next) => productController.updatePackProduct(req as unknown as Request<{productId: Types.ObjectId }, {}, {data: string}, {packProductId: Types.ObjectId | string}>, res, next));

productRoute.get("/special-offer/:offerId", (req: Request<{offerId: Types.ObjectId }>, res, next ) => productController.specialOffers(req, res, next));

productRoute.post("/review", (req: Request<{productId: string}>, res, next) => productController.createReview(req, res, next))

productRoute.get("/best-sellers", (req: Request, res, next) => productController.bestSellers(req, res, next));



productRoute.get("/:productId", (req: Request<{productId: string}>, res, next) => productController.getProduct(req, res, next))
productRoute.put("/:productId", (req: Request<{productId: string}>, res, next) => productController.updateProduct(req, res, next))



export default productRoute;