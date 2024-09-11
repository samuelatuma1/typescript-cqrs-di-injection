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
import IOrderService from "../../contract/services/shop/order_service";
import IEventTracer from "../../contract/observability/event_tracer";
import { CreateCartItemRequest, CreateCartRequest } from "../../../domain/shop/dto/requests/cart_request";
import IUserService from "../../../application/contract/services/authentication/user_service";
import Cart, { CartItem } from "../../../domain/shop/entity/cart";
import ICartRepository from "../../../application/contract/data_access/shop/cart_repository";
import { Types } from "mongoose";
import IProductService from "../../../application/contract/services/shop/product_service";
import Address from "../../../domain/authentication/entity/address";
import Order from "../../../domain/shop/entity/order";
import OrderItem from "../../../domain/shop/entity/order_item";
import IOrderRepository from "../../../application/contract/data_access/shop/order_repository";
import { IOrderServiceProducer } from "../../contract/events/shop/producer/order_service_producer";
import OrderPlacedEventDTO from "../../../domain/model/events/dto/order_placed_event_dto";
import IAddressService from "../../../application/contract/services/authentication/address_service";
export default class OrderService implements IOrderService {
    readonly eventTracer: IEventTracer;
    readonly userService: IUserService;
    readonly cartRepository: ICartRepository;
    readonly orderRepository: IOrderRepository;
    readonly productService: IProductService;
    readonly orderServiceProducer: IOrderServiceProducer;
    private readonly addressService;
    constructor(eventTracer: IEventTracer, userService: IUserService, cartRepository: ICartRepository, orderRepository: IOrderRepository, productService: IProductService, orderServiceProducer: IOrderServiceProducer, addressService: IAddressService);
    private transformCartItemsToOrderItems;
    completeOrder: (cart: Types.ObjectId | string, paymentId: Types.ObjectId | string, user: {
        email: string;
        phone: string;
    }, address: Address | string) => Promise<Order>;
    checkout: (cart: Types.ObjectId | string) => Promise<void>;
    createCart: (createCartRequest: CreateCartRequest) => Promise<Cart>;
    getTotal: (items: CartItem[] | OrderItem[]) => {
        total: number;
        currency: string;
    };
    mergeCartWithUptoDateData: (createCartItems: CreateCartItemRequest[], cartItems: CartItem[]) => Promise<CartItem[]>;
    handleOrderCreatedEvent: (orderCreatedDTO: OrderPlacedEventDTO) => Promise<boolean>;
}
