import { Types } from "mongoose";
import IBaseRepository from "../common/base_repository";
import Discount from "../../../../domain/shop/entity/discount";

export default interface IDiscountRepository extends IBaseRepository<Discount, Types.ObjectId>  {

}

export const IIDiscountRepository = "IDiscountRepository";