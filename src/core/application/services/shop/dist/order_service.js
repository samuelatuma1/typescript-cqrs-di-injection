"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var tsyringe_1 = require("tsyringe");
var event_tracer_1 = require("../../contract/observability/event_tracer");
var user_service_1 = require("../../../application/contract/services/authentication/user_service");
var cart_1 = require("../../../domain/shop/entity/cart");
var cart_repository_1 = require("../../../application/contract/data_access/shop/cart_repository");
var mongoose_1 = require("mongoose");
var product_service_1 = require("../../../application/contract/services/shop/product_service");
var order_1 = require("../../../domain/shop/entity/order");
var order_item_1 = require("../../../domain/shop/entity/order_item");
var order_status_1 = require("../../../domain/shop/enum/order_status");
var order_repository_1 = require("../../../application/contract/data_access/shop/order_repository");
var OrderService = /** @class */ (function () {
    function OrderService(eventTracer, userService, cartRepository, orderRepository, productService) {
        var _this = this;
        this.eventTracer = eventTracer;
        this.userService = userService;
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
        this.productService = productService;
        this.transformCartItemsToOrderItems = function (cartItems) {
            return cartItems.map(function (cartItem) {
                var orderEquivalent = new order_item_1["default"]({
                    product: cartItem.product,
                    qty: cartItem.qty,
                    priceAtOrder: cartItem.priceAtOrder,
                    currency: cartItem.currency
                });
                return orderEquivalent;
            });
        };
        this.completeOrder = function (cart, paymentId, user, address) { return __awaiter(_this, void 0, void 0, function () {
            var cartId, savedCart, isValidPayment, order, savedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cartId = new mongoose_1.Types.ObjectId(cart);
                        return [4 /*yield*/, this.cartRepository.getByIdAsync(cartId)];
                    case 1:
                        savedCart = _a.sent();
                        isValidPayment = true;
                        order = new order_1["default"]({
                            orderItems: this.transformCartItemsToOrderItems(savedCart.cartItems),
                            totalAmount: savedCart.totalAmount,
                            payment: null,
                            user: null,
                            address: address,
                            status: order_status_1.OrderStatus.PENDING,
                            currency: savedCart.currency
                        });
                        return [4 /*yield*/, this.orderRepository.addAsync(order)];
                    case 2:
                        savedOrder = _a.sent();
                        //TODO: Good place to create an event to handle notifying appropriate admin an order has been placed
                        //TODO: Reduce quantities available for selected orders 
                        savedCart.isActive = false;
                        return [4 /*yield*/, this.cartRepository.updateByIdAsync(savedCart._id, { isActive: false })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, savedOrder];
                }
            });
        }); };
        this.checkout = function (cart) { return __awaiter(_this, void 0, void 0, function () {
            var cartId, savedCart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cartId = new mongoose_1.Types.ObjectId(cart);
                        return [4 /*yield*/, this.cartRepository.getByIdAsync(cartId)];
                    case 1:
                        savedCart = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.createCart = function (createCartRequest) { return __awaiter(_this, void 0, Promise, function () {
            var user, userCart, cartItems, cart, mergedCartItems, _a, total, currency, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        this.eventTracer.say("Create Cart");
                        this.eventTracer.request = createCartRequest;
                        // get user by email
                        if (!createCartRequest.user) {
                            this.eventTracer.isErrorWithMessage("No user inputted");
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.userService.getUserByEmail(createCartRequest.user)];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            this.eventTracer.isErrorWithMessage("User with email not found");
                            return [2 /*return*/, null];
                        }
                        this.eventTracer.say("Getting user cart");
                        return [4 /*yield*/, this.cartRepository.firstOrDefaultAsync({ user: user.email, isActive: true })];
                    case 2:
                        userCart = _b.sent();
                        if (!!userCart) return [3 /*break*/, 4];
                        // create cart without adding cart items
                        this.eventTracer.say("Creating user cart");
                        cartItems = [];
                        cart = new cart_1["default"]({ cartItems: cartItems, user: user.email });
                        return [4 /*yield*/, this.cartRepository.addAsync(cart)];
                    case 3:
                        userCart = _b.sent();
                        _b.label = 4;
                    case 4: return [4 /*yield*/, this.mergeCart(createCartRequest.cartItems, userCart.cartItems)];
                    case 5:
                        mergedCartItems = _b.sent();
                        userCart.cartItems = mergedCartItems;
                        _a = this.getTotal(mergedCartItems), total = _a.total, currency = _a.currency;
                        userCart.totalAmount = total;
                        userCart.currency = currency;
                        this.eventTracer.isSuccessWithResponseAndMessage(userCart);
                        return [4 /*yield*/, this.cartRepository.addAsync(userCart)];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7:
                        ex_1 = _b.sent();
                        this.eventTracer.isErrorWithMessage("" + ex_1);
                        throw ex_1;
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.getTotal = function (items) {
            var total = 0;
            if (!items.length) {
                return { total: total, currency: "" };
            }
            var currency = items[0].currency;
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                if (item.currency === currency) {
                    total += item.qty * item.priceAtOrder;
                }
                else {
                    // TODO: items have multiple currencies, convert or raise exception
                }
            }
            return { total: total, currency: currency };
        };
        this.mergeCart = function (createCartItems, cartItems) { return __awaiter(_this, void 0, Promise, function () {
            var createCartItemsProductIdDict, cartItemsProductIdDict, _i, createCartItems_1, cartItem, cartItemProductIdString, _a, cartItems_1, cartItem, cartItemProductIdString, createItemProductKey, createCartItemsProductIds, cartItemsProductIds, productResponsesForCreateCartItems, productResponsesForCartItems, mergedProducts, mergedCartItemCreateCartItemDict, mergedCartItems;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        createCartItemsProductIdDict = {};
                        cartItemsProductIdDict = {};
                        for (_i = 0, createCartItems_1 = createCartItems; _i < createCartItems_1.length; _i++) {
                            cartItem = createCartItems_1[_i];
                            cartItemProductIdString = cartItem.product;
                            if (!Object.hasOwn(createCartItemsProductIdDict, cartItemProductIdString)) {
                                this.eventTracer.say("new Item entry productId: " + cartItemProductIdString);
                                createCartItemsProductIdDict[cartItemProductIdString] = cartItem;
                            }
                            else {
                                // product already exists, add the  quantities to make a single product
                                this.eventTracer.say("duplicate Item entry productId: " + cartItemProductIdString);
                                createCartItemsProductIdDict[cartItemProductIdString].qty += cartItem.qty;
                            }
                        }
                        for (_a = 0, cartItems_1 = cartItems; _a < cartItems_1.length; _a++) {
                            cartItem = cartItems_1[_a];
                            cartItemProductIdString = cartItem.product.toString();
                            if (!Object.hasOwn(cartItemsProductIdDict, cartItemProductIdString)) {
                                cartItemsProductIdDict[cartItemProductIdString] = cartItem;
                            }
                            else {
                                // product already exists, add the  quantities to make a single product
                                cartItemsProductIdDict[cartItemProductIdString].qty += cartItem.qty;
                            }
                        }
                        for (createItemProductKey in createCartItemsProductIdDict) {
                            if (Object.hasOwn(cartItemsProductIdDict, createItemProductKey)) {
                                delete cartItemsProductIdDict[createItemProductKey]; // delete from cartItems if item features in create Items List
                            }
                        }
                        createCartItemsProductIds = Object.keys(createCartItemsProductIdDict).map(function (key) { return new mongoose_1.Types.ObjectId(key); });
                        cartItemsProductIds = Object.keys(cartItemsProductIdDict).map(function (key) { return new mongoose_1.Types.ObjectId(key); });
                        return [4 /*yield*/, this.productService.getProductsWithDiscountedPriceByIds(createCartItemsProductIds)];
                    case 1:
                        productResponsesForCreateCartItems = _b.sent();
                        return [4 /*yield*/, this.productService.getProductsWithDiscountedPriceByIds(cartItemsProductIds)];
                    case 2:
                        productResponsesForCartItems = _b.sent();
                        console.log({ createCartItemsProductIds: createCartItemsProductIds, cartItemsProductIds: cartItemsProductIds });
                        mergedProducts = __spreadArrays(productResponsesForCartItems, productResponsesForCreateCartItems);
                        mergedCartItemCreateCartItemDict = __assign(__assign({}, cartItemsProductIdDict), createCartItemsProductIdDict);
                        console.log({ createCartItemsProductIdDict: createCartItemsProductIdDict, cartItemsProductIdDict: cartItemsProductIdDict, mergedCartItemCreateCartItemDict: mergedCartItemCreateCartItemDict, mergedProducts: mergedProducts });
                        mergedCartItems = mergedProducts.map(function (product) {
                            // ensure cart items available products is not more than is available in inventory
                            return new cart_1.CartItem({
                                product: product._id,
                                qty: mergedCartItemCreateCartItemDict[product._id.toString()].qty <= product.inventory.qtyAvailable ? mergedCartItemCreateCartItemDict[product._id.toString()].qty : product.inventory.qtyAvailable,
                                priceAtOrder: product.discountedPrice,
                                currency: product.currency
                            });
                        });
                        return [2 /*return*/, mergedCartItems];
                }
            });
        }); };
    }
    OrderService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(event_tracer_1.IIEventTracer)),
        __param(1, tsyringe_1.inject(user_service_1.IIUserService)),
        __param(2, tsyringe_1.inject(cart_repository_1.IICartRepository)),
        __param(3, tsyringe_1.inject(order_repository_1.IIOrderRepository)),
        __param(4, tsyringe_1.inject(product_service_1.IIProductService))
    ], OrderService);
    return OrderService;
}());
exports["default"] = OrderService;
