import Product from "../../../../domain/shop/entity/product";
import IBaseRepository from "../common/base_repository";
import { Types } from "mongoose";

export default interface IProductRepository extends IBaseRepository<Product, Types.ObjectId>{

}

export const IIProductRepository = "IProductRepository";