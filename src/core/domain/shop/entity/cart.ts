import { Types } from "mongoose";
import { ProductResponse } from "../dto/responses/product_response";
import User from "../../../domain/authentication/entity/user";
import BaseEntity from "../../../domain/common/entity/base_entity";

interface CartItemInit {
    product: Types.ObjectId;
    qty: number;
    priceAtOrder: number;
    currency: string;
}

export  class CartItem {
    product: Types.ObjectId | ProductResponse;
    qty: number;
    priceAtOrder: number;
    currency: string;
    public constructor(init: CartItemInit){
        this.product = init.product;
        this.qty = init.qty;
        this.priceAtOrder = init.priceAtOrder;
        this.currency = init.currency;
    }
}
interface CartInit {
    cartItems: CartItem[];
    totalAmount?: number;
    user?: string; // user email
}
export default class Cart extends BaseEntity<Types.ObjectId>{
    public cartItems: CartItem[];
    public totalAmount: number;
    public currency: string = "";
    public user: string | User | null = null; // user email
    isActive: boolean;
    
    public constructor(init: CartInit){
        let _id = new Types.ObjectId;
        super(_id);
        this.cartItems = init.cartItems;
        this.totalAmount = init.totalAmount ?? 0;
        this.user = init.user ?? null;
        this.isActive = true;
    }
}

