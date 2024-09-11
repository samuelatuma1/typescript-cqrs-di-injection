"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const event_tracer_1 = require("../../contract/observability/event_tracer");
const user_service_1 = require("../../../application/contract/services/authentication/user_service");
const cart_1 = __importDefault(require("../../../domain/shop/entity/cart"));
const cart_repository_1 = require("../../../application/contract/data_access/shop/cart_repository");
const mongoose_1 = require("mongoose");
const product_service_1 = require("../../../application/contract/services/shop/product_service");
const order_1 = __importDefault(require("../../../domain/shop/entity/order"));
const order_item_1 = __importDefault(require("../../../domain/shop/entity/order_item"));
const order_status_1 = require("../../../domain/shop/enum/order_status");
const order_repository_1 = require("../../../application/contract/data_access/shop/order_repository");
const item_status_1 = require("../../../domain/shop/enum/item_status");
const order_service_producer_1 = require("../../contract/events/shop/producer/order_service_producer");
const date_utility_1 = __importDefault(require("../../../application/common/utilities/date_utility"));
const order_placed_event_dto_1 = __importDefault(require("../../../domain/model/events/dto/order_placed_event_dto"));
const address_service_1 = require("../../../application/contract/services/authentication/address_service");
let OrderService = class OrderService {
    eventTracer;
    userService;
    cartRepository;
    orderRepository;
    productService;
    orderServiceProducer;
    addressService;
    constructor(eventTracer, userService, cartRepository, orderRepository, productService, orderServiceProducer, addressService) {
        this.eventTracer = eventTracer;
        this.userService = userService;
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
        this.productService = productService;
        this.orderServiceProducer = orderServiceProducer;
        this.addressService = addressService;
    }
    transformCartItemsToOrderItems = (cartItems) => {
        return cartItems.map(cartItem => {
            const orderEquivalent = new order_item_1.default({
                product: cartItem.product,
                qty: cartItem.qty,
                priceAtOrder: cartItem.priceAtOrder,
                currency: cartItem.currency,
                status: cartItem.status
            });
            return orderEquivalent;
        });
    };
    completeOrder = async (cart, paymentId, user, address) => {
        // validate payment for cartRequest 
        let cartId = new mongoose_1.Types.ObjectId(cart);
        let savedCart = await this.cartRepository.getByIdAsync(cartId);
        //TODO: get payment   
        //TODO: Validate stock
        //TODO:validate payment
        const isValidPayment = true;
        let savedAddress = await this.addressService.getOrCreateAddress(address);
        let order = new order_1.default({
            orderItems: this.transformCartItemsToOrderItems(savedCart.cartItems),
            totalAmount: savedCart.totalAmount,
            payment: null,
            user: null,
            address: savedAddress._id,
            status: order_status_1.OrderStatus.PENDING,
            currency: savedCart.currency,
        });
        // TODO: Save order
        let savedOrder = await this.orderRepository.addAsync(order);
        //TODO: Good place to create an event to handle notifying appropriate admin an order has been placed
        let orderPlacedEventDTO = new order_placed_event_dto_1.default({
            orderId: savedOrder._id,
            createdAt: date_utility_1.default.getUTCNow()
        });
        let orderPlacedEvent = await this.orderServiceProducer.publishNewOrderCreatedEvent(orderPlacedEventDTO);
        this.eventTracer.say(orderPlacedEvent ? `OrderPlaced event  with id ${orderPlacedEvent} successful` : `Failed to initiate order placed event`);
        //TODO: Reduce quantities available for selected orders 
        savedCart.isActive = false;
        await this.cartRepository.updateByIdAsync(savedCart._id, { isActive: false, orderId: savedOrder._id });
        return savedOrder;
    };
    checkout = async (cart) => {
        // Convert cart to order. Important to save a snapshot of total amount
        let cartId = new mongoose_1.Types.ObjectId(cart);
        let savedCart = await this.cartRepository.getByIdAsync(cartId);
    };
    createCart = async (createCartRequest) => {
        try {
            this.eventTracer.say("Create Cart");
            this.eventTracer.request = createCartRequest;
            // get user by email
            if (!createCartRequest.user) {
                this.eventTracer.isErrorWithMessage(`No user inputted`);
                return null;
            }
            const user = await this.userService.getUserByEmail(createCartRequest.user);
            if (!user) {
                this.eventTracer.isErrorWithMessage(`User with email not found`);
                return null;
            }
            this.eventTracer.say("Getting user cart");
            let userCart = await this.cartRepository.firstOrDefaultAsync({ user: user.email, isActive: true });
            if (!userCart) {
                // create cart without adding cart items
                this.eventTracer.say(`Creating user cart`);
                let cartItems = [];
                let cart = new cart_1.default({ cartItems: cartItems, user: user.email });
                userCart = await this.cartRepository.addAsync(cart);
            }
            let mergedCartItems = await this.mergeCartWithUptoDateData(createCartRequest.cartItems, userCart.cartItems);
            let { total, currency } = this.getTotal(mergedCartItems);
            userCart.totalAmount = total;
            userCart.currency = currency;
            userCart.cartItems = mergedCartItems;
            this.eventTracer.isSuccessWithResponseAndMessage(userCart);
            await this.cartRepository.updateAsync(userCart);
            return await this.cartRepository.getByIdAsync(userCart._id);
        }
        catch (ex) {
            this.eventTracer.isErrorWithMessage(`${ex}`);
            throw ex;
        }
    };
    getTotal = (items) => {
        let total = 0;
        if (!items.length) {
            return { total, currency: "" };
        }
        let currency = items[0].currency;
        for (let item of items) {
            if (item.status === item_status_1.ItemStatus.AVAILABLE) { // Only add if status is available
                if (item.currency === currency) {
                    total += item.qty * item.priceAtOrder;
                }
                else {
                    //TODO: items have multiple currencies, convert or raise exception
                }
            }
        }
        return { total, currency };
    };
    mergeCartWithUptoDateData = async (createCartItems, cartItems) => {
        // get products from 
        let createCartItemsProductIdDict = {};
        let cartItemsProductIdDict = {};
        for (let cartItem of createCartItems) {
            let cartItemProductIdString = cartItem.product;
            if (!Object.hasOwn(createCartItemsProductIdDict, cartItemProductIdString)) {
                this.eventTracer.say(`new Item entry productId: ${cartItemProductIdString}`);
                createCartItemsProductIdDict[cartItemProductIdString] = cartItem;
            }
            else {
                // product already exists, add the  quantities to make a single product
                this.eventTracer.say(`duplicate Item entry productId: ${cartItemProductIdString}`);
                createCartItemsProductIdDict[cartItemProductIdString].qty += cartItem.qty;
            }
        }
        for (let cartItem of cartItems) {
            let cartItemProductIdString = cartItem.product.toString();
            if (!Object.hasOwn(cartItemsProductIdDict, cartItemProductIdString)) {
                cartItemsProductIdDict[cartItemProductIdString] = cartItem;
            }
            else {
                // OPTION 1: product already exists, add the  quantities to make a single product
                // cartItemsProductIdDict[cartItemProductIdString].qty += cartItem.qty;
                // OPTION 2: ignore, since createcartitem request is most likely the orderer's new choice 
            }
        }
        for (let createItemProductKey in createCartItemsProductIdDict) {
            if (Object.hasOwn(cartItemsProductIdDict, createItemProductKey)) {
                delete cartItemsProductIdDict[createItemProductKey]; // delete from cartItems if item features in create Items List
            }
        }
        // get all products in createCartitems dict
        let createCartItemsCleaned = Object.values(createCartItemsProductIdDict);
        let cartItemsCleaned = Object.values(cartItemsProductIdDict);
        return await this.productService.setProductsAvailabilityPriceAndCurrencyForCartItems([...createCartItemsCleaned, ...cartItemsCleaned]);
        ;
    };
    handleOrderCreatedEvent = async (orderCreatedDTO) => {
        console.log({ handleOrderCreatedEvent: "Not implemented", orderCreatedDTO });
        return true;
        throw new Error("Not implemented");
    };
};
OrderService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __param(1, (0, tsyringe_1.inject)(user_service_1.IIUserService)),
    __param(2, (0, tsyringe_1.inject)(cart_repository_1.IICartRepository)),
    __param(3, (0, tsyringe_1.inject)(order_repository_1.IIOrderRepository)),
    __param(4, (0, tsyringe_1.inject)(product_service_1.IIProductService)),
    __param(5, (0, tsyringe_1.inject)(order_service_producer_1.IIOrderServiceProducer)),
    __param(6, (0, tsyringe_1.inject)(address_service_1.IIAddressService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
], OrderService);
exports.default = OrderService;
//# sourceMappingURL=order_service.js.map