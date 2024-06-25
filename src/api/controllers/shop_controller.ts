import { inject, injectable } from "tsyringe";
import BaseController from "./base_controller";
import { Request, Response, NextFunction } from "express";
import SerializationUtility from "../../core/application/common/utilities/serialization_utility";
import { CreateCategoryRequest, CreateFilterRequest, UpdateFilterRequest } from "../../core/domain/shop/dto/requests/category_requests";
import ICategoryService, { IICategoryService } from "../../core/application/contract/services/shop/category_service";
import { Types } from "mongoose";
import IProductService, { IIProductService } from "../../core/application/contract/services/shop/product_service";

@injectable()
export default class ShopController extends BaseController{

  constructor(
    @inject(IICategoryService) private categoryService: ICategoryService,
    @inject(IIProductService) private readonly productService: IProductService
  ) {
    super();
  }

  createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        let data = req.body.data;
        let categoryDTO = SerializationUtility.deserializeJson<CreateCategoryRequest>(data);
        categoryDTO.img = this.convertReqFileToUploadFile(req);
        console.log({categoryDTO})
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
}