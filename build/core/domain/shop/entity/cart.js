"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
const mongoose_1 = require("mongoose");
const base_entity_1 = __importDefault(require("../../../domain/common/entity/base_entity"));
const item_status_1 = require("../enum/item_status");
class CartItem {
    product;
    qty;
    priceAtOrder;
    currency;
    status;
    constructor(init) {
        this.product = init.product;
        this.qty = init.qty;
        this.priceAtOrder = init.priceAtOrder;
        this.currency = init.currency;
        this.status = init.status ?? item_status_1.ItemStatus.AVAILABLE;
    }
}
exports.CartItem = CartItem;
class Cart extends base_entity_1.default {
    cartItems;
    totalAmount;
    currency = "";
    user = null; // user email
    isActive;
    orderId = null;
    constructor(init) {
        let _id = new mongoose_1.Types.ObjectId;
        super(_id);
        this.cartItems = init.cartItems;
        this.totalAmount = init.totalAmount ?? 0;
        this.user = init.user ?? null;
        this.isActive = true;
    }
}
exports.default = Cart;
//# sourceMappingURL=cart.js.map