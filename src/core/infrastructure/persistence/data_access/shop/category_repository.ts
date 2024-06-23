import ICategoryRepository from "../../../../application/contract/data_access/shop/category_repository";
import { BaseRepository } from "../common/base_repository";
import Category from "../../../../domain/shop/entity/category";
import { Types } from "mongoose";
import { injectable } from "tsyringe";
import { categoryModel } from "../../entity_configuration/shop/category_config";

@injectable()
export default class CategoryRepository extends BaseRepository<Category, Types.ObjectId> implements ICategoryRepository{
    public constructor(){
        super(categoryModel);
    }
}