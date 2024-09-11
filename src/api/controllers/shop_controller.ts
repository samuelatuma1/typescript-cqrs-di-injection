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
import { ApplyProductToDiscount } from "../../core/domain/shop/dto/requests/product_requests";
import ICatalogueService, { IICatalogueService } from "../../core/application/contract/services/shop/catalogue_service";
import { AddProductsToCatalogueRequest, CreateCatalogueRequest, QueryCatalogue, RemoveProductsToCatalogueRequest, UpdateCatalogueRequest } from "../../core/domain/shop/dto/requests/catalogue_requests";
import IBrandLogic, { IIBrandLogic } from "../../core/application/contract/logic/shop/brand_logic";
import { CreateBrandRequest } from "../../core/domain/shop/dto/requests/brand_requests";
import { ICategoryLogic, IICategoryLogic } from "../../core/application/contract/logic/shop/category_logic";
import Address from "../../core/domain/authentication/entity/address";

@injectable()
export default class ShopController extends BaseController{

  constructor(
    @inject(IICategoryService) private categoryService: ICategoryService,
    @inject(IIProductService) private readonly productService: IProductService,
    @inject(IIDiscountService) private readonly discountService: IDiscountService,
    @inject(IIOrderService) private readonly orderService: IOrderService,
    @inject(IIBillboardService) private readonly billboardService: IBillboardService,
    @inject(IICatalogueService) private readonly catalogueService: ICatalogueService,
    @inject(IIBrandLogic) private readonly brandLogic: IBrandLogic,
    @inject(IICategoryLogic) private readonly cateoryLogic: ICategoryLogic,
  ) {
    super();
  }

  createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        let data = req.body.data;
        let categoryDTO = SerializationUtility.deserializeJson<CreateCategoryRequest>(data);
        categoryDTO.img = this.convertReqFilesToUploadFiles(req, 'mainImg')[0] ?? null;
        console.log("Chai")
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
        console.log({data})
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
      let page = parseInt((filters.page ?? 0 ).toString())
      let pageSize = parseInt((filters.pageSize ?? 10 ).toString())
      const enrichedCategory = await this.cateoryLogic.getCategoryEnriched(categoryId, filters, page, pageSize);
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

  addProductsWithDiscountToSpecialOffer = async (req: Request<{specialOfferId: Types.ObjectId}, {}, ApplyProductToDiscount[]>, res: Response, next: NextFunction) => {
    try{
      const specialOfferId = new Types.ObjectId(req.params.specialOfferId);
      let specialOfferDiscounts = await this.productService.addProductsWithDiscountToSpecialOffer(specialOfferId, req.body);
      return res.json(specialOfferDiscounts);
    }
    catch(ex){

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
      //TODO: add middleware to harness email for user
      let userCart = await this.orderService.createCart(req.body);
      return res.json(userCart);
    }
    catch(ex){
      next(ex);
    }
  }

  createBillboard = async (req: Request<{}, {}>, res: Response, next: NextFunction) => {
    try{
      let reqBody = SerializationUtility.deserializeJson<CreateBillboardRequest>(req.body.data);
      reqBody.img = this.convertReqFilesToUploadFiles(req as unknown as Request, "mainImg")[0] ?? null;
      let billBoard = await this.billboardService.createBillBoard(reqBody)
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

  createCatalogue = async (req: Request, res: Response, next: NextFunction) => {
    try{
      let reqBody = SerializationUtility.deserializeJson<CreateCatalogueRequest>(req.body.data);
      reqBody.mainImg = this.convertReqFilesToUploadFiles(req as unknown as Request, `mainImg`)[0] ?? null;
      let createdCatalogue = await this.catalogueService.createCatalogue(reqBody);
      return res.json(createdCatalogue);
    }
    catch(ex){
      next(ex);
    }
  }

  updateCatalogue = async (req: Request<{catalogueId: Types.ObjectId | string}>, res: Response, next: NextFunction) => {
    try{
      let reqBody = SerializationUtility.deserializeJson<UpdateCatalogueRequest>(req.body.data);
      reqBody.mainImg = (this.convertReqFilesToUploadFiles(req as unknown as Request, `mainImg`) ?? [])[0] ?? null;
      console.log('Imela')
      let updatedCatalogue = await this.catalogueService.updateCatalogue(req.params.catalogueId, reqBody);
      return res.json(updatedCatalogue);
    }
    catch(ex){
      next(ex);
    }
  }

  featureCatalogues = async (req: Request<{}, {}, {catalogueIds:  Types.ObjectId[], feature: boolean}>, res: Response, next: NextFunction) => {
    try{
      console.log({b: req.body})
      let updatedCatalogue = await this.catalogueService.featureCatalogues(req.body.catalogueIds, req.body.feature);
      return res.json(updatedCatalogue);
    }
    catch(ex){
      next(ex);
    }
  }
  
  getCatalogue = async (req: Request<{}, {}, {}, QueryCatalogue>, res: Response, next: NextFunction) => {
    try{
      let query: QueryCatalogue = req.query
      if(query.isFeatured){
        query.isFeatured = req.query.isFeatured.toString().toLowerCase() === "true" ? true : false;
      }
      console.log({query})
      let response = await this.catalogueService.getCatalogues(query);
      return res.json(response);
    }
    catch(ex){
      next(ex);
    }
  }

  addProductsToCatalogue = async (req: Request<{}, {}, AddProductsToCatalogueRequest>, res: Response, next: NextFunction) => {
    try{
      let updatedCatalogue = await this.catalogueService.addProductsToCatalogue(req.body);
      return res.json(updatedCatalogue);
    }
    catch(ex){
      next(ex);
    }
  }

  removeProductsFromCatalogue = async (req: Request<{}, {}, RemoveProductsToCatalogueRequest>, res: Response, next: NextFunction) => {
    try{
      let updatedCatalogue = await this.catalogueService.removeProductsFromCatalogue(req.body);
      return res.json(updatedCatalogue);
    }
    catch(ex){
      next(ex);
    }
  }

  createBrand = async (req: Request, res: Response, next: NextFunction) => {
    try{
      let reqBody = SerializationUtility.deserializeJson<CreateBrandRequest>(req.body.data);
      reqBody.mainImg = this.convertReqFilesToUploadFiles(req as unknown as Request, "mainImg")[0] ?? null;
      
      let createdBrand = await this.brandLogic.createBrand(reqBody);
      return res.json(createdBrand);
    }
    catch(ex){
      next(ex);
    }
  }

  addProductsToBrand = async (req: Request<{brandId: Types.ObjectId}, {}, Types.ObjectId[]>, res: Response, next: NextFunction) => {
    try{
      let brandId = req.params.brandId
      console.log("Iscabas")
      let addedProducts = await this.brandLogic.addProductsToBrand(brandId, req.body);
      return res.json(addedProducts);
    }
    catch(ex){
      next(ex)
    }
  }

  // NOTE: UNREFINED
  completeOrder = async (req: Request<{}, {}, {cart: Types.ObjectId | string, paymentId: Types.ObjectId | string, user: {email: string, phone: string}, address: Address}>, res: Response, next: NextFunction) => {
    try{
      let order = await this.orderService.completeOrder(req.body.cart, req.body.paymentId, req.body.user, req.body.address);
      return res.json(order);
    }
    catch(ex){
      next(ex)
    }
  }


  

}