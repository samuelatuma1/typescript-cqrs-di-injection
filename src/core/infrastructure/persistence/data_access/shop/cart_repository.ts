import { Types } from "mongoose";
import { BaseRepository } from "../common/base_repository";
import Cart from "../../../../domain/shop/entity/cart";
import { cartModel } from "../../entity_configuration/shop/cart_config";
import { injectable } from "tsyringe";
import ICartRepository from "../../../../application/contract/data_access/shop/cart_repository";

@injectable()
export default class CartRepository extends BaseRepository<Cart, Types.ObjectId> implements ICartRepository{
    public constructor(){
        const _model = cartModel;
        super(_model);
    }
}