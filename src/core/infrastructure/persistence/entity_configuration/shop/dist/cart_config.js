"use strict";
exports.__esModule = true;
exports.cartModel = exports.CartSchema = void 0;
var mongoose_1 = require("mongoose");
var CartItemSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' },
    qty: { type: Number },
    priceAtOrder: { type: Number },
    currency: { type: String }
});
exports.CartSchema = new mongoose_1.Schema({
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    recordStatus: { type: String, required: true },
    cartItems: { type: [CartItemSchema] },
    totalAmount: { type: Number, "default": 0 },
    user: { type: String }
});
exports.cartModel = mongoose_1.model('Cart', exports.CartSchema);
