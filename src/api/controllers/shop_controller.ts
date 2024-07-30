import { inject, injectable } from "tsyringe";
import BaseController from "./base_controller";
import { Request, Response, NextFunction } from "express";
import SerializationUtility from "../../core/application/common/utilities/serialization_utility";
import { CreateCategoryRequest, CreateFilterRequest, UpdateFilterRequest } from "../../core/domain/shop/dto/requests/category_requests";
import ICategoryService, { IICategoryService } from "../../core/application/contract/services/shop/category_service";
import { Types } from "mongoose";
import IProductService, { IIProductService } from "../../core/application/contract/services/shop/product_service";
import IDiscountService, { IIDiscountService } from "../../core/application/contract/services/shop/discount_service";
import { CreateDiscountRequest, SpecialOfferRequest } from "../../core/domain/shop/dto/requests/discount_request";
import IOrderService, { IIOrderService } from "../../core/application/contract/services/shop/order_service";
import { CreateCartRequest } from "../../core/domain/shop/dto/requests/cart_request";
import { IBillboardService, IIBillboardService } from "../../core/application/contract/services/shop/billboard_service";
import { CreateBillboardRequest, SearchBillboardRequest, UpdateBillboardRequest } from "../../core/domain/shop/dto/requests/billboard_requests";

@injectable()
export default class ShopController extends BaseController{

  constructor(
    @inject(IICategoryService) private categoryService: ICategoryService,
    @inject(IIProductService) private readonly productService: IProductService,
    @inject(IIDiscountService) private readonly discountService: IDiscountService,
    @inject(IIOrderService) private readonly orderService: IOrderService,
    @inject(IIBillboardService) private readonly billboardService: IBillboardService
  ) {
    super();
  }

  createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        let data = req.body.data;
        let categoryDTO = SerializationUtility.deserializeJson<CreateCategoryRequest>(data);
        categoryDTO.img = this.convertReqFileToUploadFile(req);
        const createdCategory = await this.categoryService.createCategory(categoryDTO);
        res.json(createdCategory);
    }
    catch(ex){
        next(ex)
    }
  }

  addFiltersToCategory = async (req: Request<{categoryId: string}, {}, CreateFilterRequest[]>, res: Response, next: NextFunction)=> {
    try{
        let categoryId = new Types.ObjectId(req.params.categoryId);
        let data = req.body;
        const categoryWithUpdatedFilters = await this.categoryService.addFiltersToCategory(categoryId, data);
        return res.json(categoryWithUpdatedFilters);
    }
    catch(ex){
        next(ex)
    }
  }

  deleteFilters = async (req: Request<{categoryId: string}, {}, Types.ObjectId[]>, res: Response, next: NextFunction) => {
    try{
      let categoryId = new Types.ObjectId(req.params.categoryId);
      let filterIds = req.body.map(id => new Types.ObjectId(id));
      const categoryWithoutDeletedFilters = await this.categoryService.deleteFilters(categoryId, filterIds);
      return res.json(categoryWithoutDeletedFilters);
    }
    catch(ex){
        next(ex)
    }
  }

  updateFilter = async (req: Request<{categoryId: string}, {}, UpdateFilterRequest>, res: Response, next: NextFunction) => {
    try{
      let categoryId = new Types.ObjectId(req.params.categoryId);
      const categoryWithUpdatedFilter = await this.categoryService.updateFilter(categoryId, req.body);
      return res.json(categoryWithUpdatedFilter);
    }
    catch(ex){
        next(ex)
    }
  }

  getCategory =  async (req: Request<{categoryId: string}>, res: Response, next: NextFunction) => {
    try{
      let categoryId = new Types.ObjectId(req.params.categoryId);
      let filters = req.query as { [key: string]: string };
      const enrichedCategory = await this.productService.getCategoryEnriched(categoryId, filters);
      return res.json(enrichedCategory);
    }
    catch(ex){
        next(ex)
    }
  }

  createDiscount = async (req: Request<{}, {}, CreateDiscountRequest>, res: Response, next: NextFunction) => {
    try{
        const discount = await this.discountService.createDiscount(req.body);
        return res.json(discount);
    }
    catch(ex){
      next(ex);
    }
  }

  addDiscount = async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    let queryParams = req.query as unknown as {discountId: Types.ObjectId, productId?: Types.ObjectId};
    
    try{
      let addedDiscountForProduct = await this.productService.applyDiscount(queryParams.productId, queryParams.discountId);
      return res.json(addedDiscountForProduct)
    }
    catch(ex){
      next(ex);
    }
  }

  createSpecialOffer = async (req: Request<{}, {}, SpecialOfferRequest>, res: Response, next: NextFunction) => {
    try{
      let specialOffer = await this.discountService.createSpecialOffer(req.body);
      return res.json(specialOffer)
    }
    catch(ex){
      next(ex);
    }
  }

  addDiscountsToSpecialOffer = async (req: Request<{specialOfferId: Types.ObjectId}, {}, Types.ObjectId[]>, res: Response, next: NextFunction) => {
    try{
      const specialOfferId = new Types.ObjectId(req.params.specialOfferId);
      let specialOfferDiscounts = await this.discountService.addDiscountsToSpecialOffer(specialOfferId, req.body);
      return res.json(specialOfferDiscounts)
    }
    catch(ex){
      next(ex);
    }
  }

  getActiveSpecialOffers = async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    try{
      const activeSpecialOffers = await this.discountService.getActiveSpecialOffers(true);
      return res.json(activeSpecialOffers);
    }
    catch(ex){
      next(ex);
    }
  }

//createCart = async (createCartRequest: CreateCartRequest): Promise<Cart> 
  createCart = async (req: Request<{}, {}, CreateCartRequest>, res: Response, next: NextFunction) => {
    try{
      // TODO: add middleware to harness email for user
      let userCart = await this.orderService.createCart(req.body);
      return res.json(userCart);
    }
    catch(ex){
      next(ex);
    }
  }

  createBillboard = async (req: Request<{}, {}, CreateBillboardRequest>, res: Response, next: NextFunction) => {
    try{
      let billBoard = await this.billboardService.createBillBoard(req.body)
      return res.json(billBoard);
    }
    catch(ex){
      next(ex);
    }
  }

  updateBillboard = async (req: Request<{billboardId: Types.ObjectId}, {}, UpdateBillboardRequest>, res: Response, next: NextFunction) => {
    try{
      let {billboardId} = req.params;
      let updatedBillboard = await this.billboardService.updateBillBoard(billboardId, req.body)
      return res.json(updatedBillboard);
    }
    catch(ex){
      next(ex);
    }
  }

  deleteBillboard = async (req: Request<{billboardId: Types.ObjectId}, {}, UpdateBillboardRequest>, res: Response, next: NextFunction) => {
    try{
      let {billboardId} = req.params;
      let updatedBillboard = await this.billboardService.deleteBillboard(billboardId)
      return res.json(updatedBillboard);
    }
    catch(ex){
      next(ex);
    }
  }

  getActiveBillboards = async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    try{
      let activeBillboads = await this.billboardService.getActiveBillboards()
      return res.json(activeBillboads);
    }
    catch(ex){
      next(ex);
    }
  }

  getBillboard = async (req: Request<{billboardId: Types.ObjectId}, {}, {}>, res: Response, next: NextFunction) => {
    try{
      let {billboardId} = req.params;
      let billboard = await this.billboardService.getBillboard(billboardId);
      return res.json(billboard);
    }
    catch(ex){
      next(ex);
    }
  }

  searchBillboards = async (req: Request<{}, {}, {}, SearchBillboardRequest>, res: Response, next: NextFunction) => {
    try{
      
      let billboards = await this.billboardService.search(req.query);
      return res.json(billboards);
    }
    catch(ex){
      next(ex);
    }
  }




}