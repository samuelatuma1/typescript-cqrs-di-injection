import ShopController from "./../../api/controllers/shop_controller";
import { iocContainer } from "./../../api/program";
import { Router } from "express";
import { upload } from "./../../api/middlewares/multer_upload";



const shopRoute = Router();

const shopController = iocContainer.resolve(ShopController);

shopRoute.post('/category', upload.single('img'), (req, res, next) => shopController.createCategory(req, res, next));
shopRoute.post('/add-filters/:categoryId', (req, res, next) => shopController.addFiltersToCategory(req, res, next));
shopRoute.delete("/delete-filters/:categoryId", (req, res, next) => shopController.deleteFilters(req, res, next));
shopRoute.patch("/update-filter/:categoryId", (req, res, next) =>  shopController.updateFilter(req, res, next));
shopRoute.get("/category/:categoryId", (req, res, next) =>  shopController.getCategory(req, res, next));
export default shopRoute;