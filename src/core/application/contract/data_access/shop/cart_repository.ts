import { Interface } from "readline"
import IBaseRepository from "../common/base_repository";
import Cart from "core/domain/shop/entity/cart";
import { Types } from "mongoose";


export default interface ICartRepository extends IBaseRepository<Cart, Types.ObjectId> {

}

export const IICartRepository = "ICartRepository";