import Category from "core/domain/shop/entity/category";
import IBaseRepository from "../common/base_repository";
import { Types } from "mongoose";

export default interface ICategoryRepository extends IBaseRepository<Category, Types.ObjectId>{

}

export const IICategoryRepository = 'ICategoryRepository';