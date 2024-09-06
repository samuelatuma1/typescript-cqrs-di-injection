import { inject, injectable } from "tsyringe";
import IOrderService from "../../contract/services/shop/order_service";
import IEventTracer, { IIEventTracer } from "../../contract/observability/event_tracer";
import { CreateCartItemRequest, CreateCartRequest } from "../../../domain/shop/dto/requests/cart_request";
import IUserService, { IIUserService } from "../../../application/contract/services/authentication/user_service";
import Cart, { CartItem } from "../../../domain/shop/entity/cart";
import ICartRepository, { IICartRepository } from "../../../application/contract/data_access/shop/cart_repository";
import { Types } from "mongoose";
import IProductService, { IIProductService } from "../../../application/contract/services/shop/product_service";
import { ProductResponse } from "../../../domain/shop/dto/responses/product_response";
import Address from "../../../domain/authentication/entity/address";
import Order from "../../../domain/shop/entity/order";
import OrderItem from "../../../domain/shop/entity/order_item";
import { OrderStatus } from "../../../domain/shop/enum/order_status";
import IOrderRepository, { IIOrderRepository } from "../../../application/contract/data_access/shop/order_repository";
import { ItemStatus } from "../../../domain/shop/enum/item_status";
import { IIOrderServiceProducer, IOrderServiceProducer } from "../../../application/contract/services/events/shop/producer/order_service_producer";
import DateUtility from "../../../application/common/utilities/date_utility";
import OrderPlacedEventDTO from "../../../domain/model/events/dto/order_placed_event_dto";

import IAddressService, { IIAddressService } from "../../../application/contract/services/authentication/address_service";


@injectable()
export default class OrderService implements IOrderService{
    public constructor(
        @inject(IIEventTracer) public readonly eventTracer: IEventTracer,
        @inject(IIUserService) public readonly userService: IUserService,
        @inject(IICartRepository) public readonly cartRepository: ICartRepository,
        @inject(IIOrderRepository) public readonly orderRepository: IOrderRepository,
        @inject(IIProductService) public readonly productService: IProductService,
        @inject(IIOrderServiceProducer) public readonly orderServiceProducer: IOrderServiceProducer,
        @inject(IIAddressService) private readonly addressService: IAddressService
    ){
    }
    private transformCartItemsToOrderItems = (cartItems: CartItem[]): OrderItem[] => {
        return cartItems.map(cartItem => {

            const orderEquivalent = new OrderItem({
                product : cartItem.product,
                qty: cartItem.qty,
                priceAtOrder: cartItem.priceAtOrder,
                currency: cartItem.currency,
                status: cartItem.status
            })
            ;
            return orderEquivalent;
        })
    }
    public completeOrder = async (cart: Types.ObjectId | string, paymentId: Types.ObjectId | string, user: {email: string, phone: string}, address: Address | string): Promise<Order> => {
        // validate payment for cartRequest 
        let cartId = new Types.ObjectId(cart);
        let savedCart = await this.cartRepository.getByIdAsync(cartId);

        //TODO: get payment   
        //TODO: Validate stock

        //TODO:validate payment
        const isValidPayment = true;
        let savedAddress = await this.addressService.getOrCreateAddress(address)
        let order = new Order({
            orderItems: this.transformCartItemsToOrderItems(savedCart.cartItems),
            totalAmount : savedCart.totalAmount,
            payment: null,
            user: null,
            address: savedAddress._id,
            status: OrderStatus.PENDING,
            currency: savedCart.currency,
        })

        // TODO: Save order
        let savedOrder = await this.orderRepository.addAsync(order);
        //TODO: Good place to create an event to handle notifying appropriate admin an order has been placed
        let orderPlacedEventDTO = new OrderPlacedEventDTO ({
            orderId: savedOrder._id,
            createdAt: DateUtility.getUTCNow()
        })
        let orderPlacedEvent = await this.orderServiceProducer.publishNewOrderCreatedEvent(orderPlacedEventDTO);
        this.eventTracer.say(orderPlacedEvent ? `OrderPlaced event  with id ${orderPlacedEvent} successful`: `Failed to initiate order placed event`)
        //TODO: Reduce quantities available for selected orders 
        
        savedCart.isActive = false;
        await this.cartRepository.updateByIdAsync(savedCart._id, {isActive: false, orderId: savedOrder._id})
        return savedOrder;
    }
    public checkout = async ( cart: Types.ObjectId | string ) => {
         // Convert cart to order. Important to save a snapshot of total amount
         let cartId = new Types.ObjectId(cart);
         let savedCart = await this.cartRepository.getByIdAsync(cartId);
    }
    public createCart = async (createCartRequest: CreateCartRequest): Promise<Cart> => {
        try{
            this.eventTracer.say("Create Cart");
            this.eventTracer.request = createCartRequest;
            // get user by email
            if(!createCartRequest.user){
                this.eventTracer.isErrorWithMessage(`No user inputted`);
                return null;
            }
            const user = await this.userService.getUserByEmail(createCartRequest.user);
            if(!user){
                this.eventTracer.isErrorWithMessage(`User with email not found`);
                return null;
            }
            this.eventTracer.say("Getting user cart")
            let userCart = await this.cartRepository.firstOrDefaultAsync({user: user.email, isActive: true})

            if(!userCart){
                // create cart without adding cart items
                this.eventTracer.say(`Creating user cart`);
                let cartItems: CartItem[] = [];
                let cart = new Cart({cartItems: cartItems, user: user.email});
                userCart = await this.cartRepository.addAsync(cart);
            }

            let mergedCartItems = await this.mergeCartWithUptoDateData(createCartRequest.cartItems, userCart.cartItems);
            let {total, currency} = this.getTotal(mergedCartItems);

            userCart.totalAmount = total;
            userCart.currency = currency;
            userCart.cartItems = mergedCartItems;
            this.eventTracer.isSuccessWithResponseAndMessage(userCart);
            
            await this.cartRepository.updateAsync(userCart)
            return await this.cartRepository.getByIdAsync(userCart._id);
        }
        catch(ex){
            this.eventTracer.isErrorWithMessage(`${ex}`);
            throw ex;
        }
    }
    public getTotal = (items: CartItem[] | OrderItem[]): {total: number, currency: string} => {
        let total = 0;
        if(!items.length){
            return {total, currency: ""};
        }
        let currency = items[0].currency;
        for(let item of items){
            if(item.status === ItemStatus.AVAILABLE){ // Only add if status is available
                if(item.currency === currency){

                    total += item.qty * item.priceAtOrder
                }
                else{
                    //TODO: items have multiple currencies, convert or raise exception
                }
            }
        }

        return {total, currency}
    }
    public mergeCartWithUptoDateData = async (createCartItems: CreateCartItemRequest[], cartItems: CartItem[]): Promise<CartItem[]> => {
        // get products from 
        let createCartItemsProductIdDict: {[key: string]: CreateCartItemRequest}= {};
        let cartItemsProductIdDict: {[key: string]: CartItem}= {};
        for(let cartItem of createCartItems){
            let cartItemProductIdString  = cartItem.product;

            if(!Object.hasOwn(createCartItemsProductIdDict, cartItemProductIdString)){
                this.eventTracer.say(`new Item entry productId: ${cartItemProductIdString}`)
                createCartItemsProductIdDict[cartItemProductIdString] = cartItem;
            }
            else{
                // product already exists, add the  quantities to make a single product
                this.eventTracer.say(`duplicate Item entry productId: ${cartItemProductIdString}`)

                createCartItemsProductIdDict[cartItemProductIdString].qty += cartItem.qty;
            }
        }

        for(let cartItem of cartItems){
            let cartItemProductIdString  = cartItem.product.toString();
            if(!Object.hasOwn(cartItemsProductIdDict, cartItemProductIdString)){
                cartItemsProductIdDict[cartItemProductIdString] = cartItem;
            }
            else{
                // OPTION 1: product already exists, add the  quantities to make a single product
                    // cartItemsProductIdDict[cartItemProductIdString].qty += cartItem.qty;
                // OPTION 2: ignore, since createcartitem request is most likely the orderer's new choice 
            }
        }
        
        for(let createItemProductKey in createCartItemsProductIdDict){
            if(Object.hasOwn(cartItemsProductIdDict, createItemProductKey)){
                delete cartItemsProductIdDict[createItemProductKey]; // delete from cartItems if item features in create Items List
            }
        }
        // get all products in createCartitems dict
        let createCartItemsCleaned = Object.values(createCartItemsProductIdDict);
        let cartItemsCleaned = Object.values(cartItemsProductIdDict);

        return  await this.productService.setProductsAvailabilityPriceAndCurrencyForCartItems([...createCartItemsCleaned, ...cartItemsCleaned]);;
    }

    

    handleOrderCreatedEvent = async (orderCreatedDTO: OrderPlacedEventDTO): Promise<boolean> => {
        console.log({handleOrderCreatedEvent: "Not implemented", orderCreatedDTO})
        return true;
        throw new Error("Not implemented");
    }
}