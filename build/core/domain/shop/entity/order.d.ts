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
import User from "../../../domain/authentication/entity/user";
import Address from "../../../domain/authentication/entity/address";
import { OrderStatus } from "../enum/order_status";
import { Currency } from "../../../domain/common/enum/currency";
import OrderItem from "./order_item";
import BaseEntity from "../../../domain/common/entity/base_entity";
interface OrderInit {
    orderItems: OrderItem[];
    totalAmount: number;
    payment: null;
    user?: Types.ObjectId | User | null;
    address?: Address | Types.ObjectId | null;
    status?: OrderStatus | string;
    currency: Currency | string;
}
export default class Order extends BaseEntity<Types.ObjectId> {
    orderItems: OrderItem[];
    totalAmount: number;
    currency: Currency | string;
    payment: null;
    user: Types.ObjectId | User | null;
    address: Address | Types.ObjectId | null;
    orderDate: Date;
    status: OrderStatus | string;
    constructor(orderInit: OrderInit);
}
export {};
