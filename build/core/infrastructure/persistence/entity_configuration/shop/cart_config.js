"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartModel = exports.CartSchema = void 0;
const mongoose_1 = require("mongoose");
const CartItemSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' },
    qty: { type: Number },
    priceAtOrder: { type: Number },
    currency: { type: String },
    status: { type: String, default: '' }
});
exports.CartSchema = new mongoose_1.Schema({
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    recordStatus: { type: String, required: true },
    cartItems: { type: [CartItemSchema] },
    totalAmount: { type: Number, default: 0 },
    user: { type: String },
    orderId: { type: mongoose_1.Schema.Types.ObjectId, default: null }
});
exports.cartModel = (0, mongoose_1.model)('Cart', exports.CartSchema);
//# sourceMappingURL=cart_config.js.map