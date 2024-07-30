import { Types } from "mongoose";
import IBaseRepository from "../common/base_repository";
import Order from "../../../../domain/shop/entity/order";

export default interface IOrderRepository extends IBaseRepository<Order, Types.ObjectId>  {

}

export const IIOrderRepository = "IOrderRepository";