import ShopController from "./../../api/controllers/shop_controller";
import { iocContainer } from "./../../api/program";
import { Router } from "express";
import { upload } from "./../../api/middlewares/multer_upload";
import { Types } from "mongoose";
import { Request } from "express";


const shopRoute = Router();

const shopController = iocContainer.resolve(ShopController);

shopRoute.post('/category', upload.single('img'), (req, res, next) => shopController.createCategory(req, res, next));
shopRoute.post('/add-filters/:categoryId', (req, res, next) => shopController.addFiltersToCategory(req, res, next));
shopRoute.delete("/delete-filters/:categoryId", (req, res, next) => shopController.deleteFilters(req, res, next));
shopRoute.patch("/update-filter/:categoryId", (req, res, next) =>  shopController.updateFilter(req, res, next));
shopRoute.get("/category/:categoryId", (req, res, next) =>  shopController.getCategory(req, res, next));

shopRoute.post("/discount", (req, res, next) => shopController.createDiscount(req, res, next));
shopRoute.post("/discount/add", (req, res, next) => shopController.addDiscount(req, res, next));
shopRoute.post("/special-offer", (req, res, next) => shopController.createSpecialOffer(req, res, next));
shopRoute.post("/special-offer/add-discounts/:specialOfferId", (req: Request<{specialOfferId: Types.ObjectId}>, res, next) => shopController.addDiscountsToSpecialOffer(req, res, next));
shopRoute.get("/special-offer/active", (req, res, next) => shopController.getActiveSpecialOffers(req, res, next));

shopRoute.post("/cart", (req, res, next) => shopController.createCart(req, res, next));


shopRoute.post("/billboard", (req, res, next) => shopController.createBillboard(req, res, next));
shopRoute.get("/billboard/active", (req, res, next) => shopController.getActiveBillboards(req, res, next));
shopRoute.put("/billboard/:billboardId", (req: Request<{billboardId: Types.ObjectId}>, res, next) => shopController.updateBillboard(req, res, next));
shopRoute.delete("/billboard/:billboardId", (req: Request<{billboardId: Types.ObjectId}>, res, next) => shopController.deleteBillboard(req, res, next));
shopRoute.get("/billboard", (req, res, next) => shopController.searchBillboards(req, res, next));
shopRoute.get("/billboard/:billboardId", (req: Request<{billboardId: Types.ObjectId}>, res, next) => shopController.getBillboard(req, res, next));
export default shopRoute;