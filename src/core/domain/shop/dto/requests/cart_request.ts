import { Types } from "mongoose";
import User from "../../../../domain/authentication/entity/user";
import { CartItem } from "../../entity/cart";


export  class CreateCartItemRequest {
    product: string ;
    qty: number;
}
export class CreateCartRequest {
    public cartItems: CreateCartItemRequest[];
    public user: string = null; // user email
}