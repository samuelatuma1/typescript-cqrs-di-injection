import { upload } from "../../api/middlewares/multer_upload";
import ProductController from "../../api/controllers/product_controller";
import { iocContainer } from "../../api/program";
import { Router } from "express";


const productRoute = Router();
const productController = iocContainer.resolve(ProductController);
productRoute.post("/", upload.fields([{name: 'mainImg', maxCount: 1}, {name: 'otherMedia', maxCount: 10}]), (req, res, next) => productController.createProduct(req, res, next));

export default productRoute;