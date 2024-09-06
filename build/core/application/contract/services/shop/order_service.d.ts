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
import Cart from "../../../../domain/shop/entity/cart";
import { CreateCartRequest } from "../../../../domain/shop/dto/requests/cart_request";
import OrderPlacedEventDTO from "../../../../domain/model/events/dto/order_placed_event_dto";
import Address from "../../../../domain/authentication/entity/address";
import Order from "../../../../domain/shop/entity/order";
import { Types } from "mongoose";
export default interface IOrderService {
    createCart(createCartRequest: CreateCartRequest): Promise<Cart>;
    handleOrderCreatedEvent(orderCreatedDTO: OrderPlacedEventDTO): Promise<boolean>;
    completeOrder(cart: Types.ObjectId | string, paymentId: Types.ObjectId | string, user: {
        email: string;
        phone: string;
    }, address: Address): Promise<Order>;
}
export declare const IIOrderService = "IOrderService";
