import Cart from "../../../../domain/shop/entity/cart";
import { CreateCartRequest } from "../../../../domain/shop/dto/requests/cart_request";
import OrderPlacedEventDTO from "../../../../domain/model/events/dto/order_placed_event_dto";
import Address from "../../../../domain/authentication/entity/address";
import Order from "../../../../domain/shop/entity/order";
import { Types } from "mongoose";

export default interface IOrderService {
    createCart (createCartRequest: CreateCartRequest): Promise<Cart>;
    handleOrderCreatedEvent(orderCreatedDTO: OrderPlacedEventDTO): Promise<boolean>
    completeOrder(cart: Types.ObjectId | string, paymentId: Types.ObjectId | string, user: {email: string, phone: string}, address: Address): Promise<Order> ;
}

export const IIOrderService = "IOrderService";