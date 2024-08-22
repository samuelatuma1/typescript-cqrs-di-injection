/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Types } from "mongoose";
import { ProductResponse } from "../dto/responses/product_response";
import User from "../../../domain/authentication/entity/user";
import BaseEntity from "../../../domain/common/entity/base_entity";
import { ItemStatus } from "../enum/item_status";
interface CartItemInit {
    product: Types.ObjectId;
    qty: number;
    priceAtOrder: number;
    currency: string;
    status?: ItemStatus;
}
export declare class CartItem {
    product: Types.ObjectId | ProductResponse;
    qty: number;
    priceAtOrder: number;
    currency: string;
    status: string | ItemStatus;
    constructor(init: CartItemInit);
}
interface CartInit {
    cartItems: CartItem[];
    totalAmount?: number;
    user?: string;
}
export default class Cart extends BaseEntity<Types.ObjectId> {
    cartItems: CartItem[];
    totalAmount: number;
    currency: string;
    user: string | User | null;
    isActive: boolean;
    constructor(init: CartInit);
}
export {};
