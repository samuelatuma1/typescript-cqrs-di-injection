import Product from "../../../../domain/shop/entity/product";
import IProductRepository from "../../../../application/contract/data_access/shop/product_repository";
import { injectable } from "tsyringe";
import { Types } from "mongoose";
import { BaseRepository } from "../common/base_repository";
import { productModel } from "../../entity_configuration/shop/product_config";

@injectable()
export default class ProductRepository extends  BaseRepository<Product, Types.ObjectId> implements IProductRepository{
    public constructor(){
        const _model = productModel;
        super(_model);
    }
}