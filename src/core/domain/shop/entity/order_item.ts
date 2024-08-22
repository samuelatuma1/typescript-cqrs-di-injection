import { Types } from "mongoose";
import { ProductResponse } from "../dto/responses/product_response";
import { ItemStatus } from "../enum/item_status";

export default class OrderItem {
    product: Types.ObjectId | ProductResponse;
    qty: number;
    priceAtOrder: number;
    currency: string;
    productVariantId: Types.ObjectId | null = null;
    status: string | ItemStatus
    public constructor(init: {
        product: Types.ObjectId | ProductResponse,
        productVariantId?: Types.ObjectId | null;
        qty: number,
        priceAtOrder: number,
        currency: string,
        status?: ItemStatus
    }){
        this.product = init.product;
        this.qty = init.qty;
        this.priceAtOrder = init.priceAtOrder;
        this.currency = init.currency;
        this.productVariantId = init.productVariantId ?? null;
        this.status = init.status ?? ItemStatus.AVAILABLE;
    }
}