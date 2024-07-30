import Cart from "../../../../domain/shop/entity/cart";
import { CreateCartRequest } from "../../../../domain/shop/dto/requests/cart_request";

export default interface IOrderService {
    createCart (createCartRequest: CreateCartRequest): Promise<Cart> 
}

export const IIOrderService = "IOrderService";