import Brand from "../../../../domain/shop/entity/brand";
import IBaseRepository from "../common/base_repository";
import { Types } from "mongoose";

export default interface IBrandRepository extends IBaseRepository<Brand, Types.ObjectId>{
    
}

export const IIBrandRepository = 'IBrandRepository';