"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_upload_1 = require("../../api/middlewares/multer_upload");
const product_controller_1 = __importDefault(require("../../api/controllers/product_controller"));
const program_1 = require("../../api/program");
const express_1 = require("express");
const jwt_auth_middleware_1 = __importDefault(require("../../api/middlewares/jwt_auth_middleware"));
const productRoute = (0, express_1.Router)();
const productController = program_1.iocContainer.resolve(product_controller_1.default);
const jwtMiddleware = program_1.iocContainer.resolve(jwt_auth_middleware_1.default);
// public addPackProduct = async (req: Request<{productId: Types.ObjectId }>, res: Response, next: NextFunction) 
productRoute.post("/", (req, res, next) => jwtMiddleware.verifyUserHasPermission(["createproduct", "updateshop"], req, res, next), multer_upload_1.upload.fields([{ name: 'mainImg', maxCount: 1 }, { name: 'otherMedia', maxCount: 10 }]), (req, res, next) => productController.createProduct(req, res, next));
productRoute.post("/add-pack-product/:productId", multer_upload_1.upload.fields([{ name: 'mainImg', maxCount: 1 }, { name: 'otherMedia', maxCount: 10 }]), (req, res, next) => productController.addPackProduct(req, res, next));
productRoute.post("/add-pack-products/:productId", multer_upload_1.upload.fields([
    { name: 'mainImg1', maxCount: 1 }, { name: 'mainImg2', maxCount: 1 }, { name: 'mainImg3', maxCount: 1 }, { name: 'mainImg4', maxCount: 1 }, { name: 'mainImg5', maxCount: 1 },
    { name: 'mainImg6', maxCount: 1 }, { name: 'mainImg7', maxCount: 1 }, { name: 'mainImg8', maxCount: 1 }, { name: 'mainImg9', maxCount: 1 }, { name: 'mainImg10', maxCount: 1 }
]), (req, res, next) => productController.addPackProducts(req, res, next));
productRoute.delete("/delete-pack-product/:productId", (req, res, next) => productController.deletePackProduct(req, res, next));
productRoute.put("/update-pack-product/:productId", multer_upload_1.upload.fields([{ name: 'mainImg', maxCount: 1 }, { name: 'otherMedia', maxCount: 10 }]), (req, res, next) => productController.updatePackProduct(req, res, next));
productRoute.get("/special-offer/:offerId", (req, res, next) => productController.specialOffers(req, res, next));
productRoute.post("/review", (req, res, next) => productController.createReview(req, res, next));
productRoute.get("/best-sellers", (req, res, next) => productController.bestSellers(req, res, next));
productRoute.get("/:productId", (req, res, next) => productController.getProduct(req, res, next));
productRoute.put("/:productId", (req, res, next) => productController.updateProduct(req, res, next));
exports.default = productRoute;
//# sourceMappingURL=product_route.js.map