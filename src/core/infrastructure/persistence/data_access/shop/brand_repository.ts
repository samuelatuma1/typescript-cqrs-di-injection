import { Types } from "mongoose";
import { BaseRepository } from "../common/base_repository";
import Brand from "../../../../domain/shop/entity/brand";
import IBrandRepository from "core/application/contract/data_access/shop/brand_repository";
import { brandModel } from "../../entity_configuration/shop/brand_config";

export default class BrandRepository extends BaseRepository<Brand, Types.ObjectId> implements IBrandRepository{
    constructor(){
        super(brandModel);
    }
}