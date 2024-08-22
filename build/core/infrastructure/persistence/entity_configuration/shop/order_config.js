"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = exports.OrderSchema = void 0;
const mongoose_1 = require("mongoose");
const OrderItemSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' },
    qty: { type: Number },
    priceAtOrder: { type: Number },
    currency: { type: String },
    status: { type: String, default: "" }
});
exports.OrderSchema = new mongoose_1.Schema({
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    recordStatus: { type: String, required: true },
    orderItems: { type: [OrderItemSchema] },
    totalAmount: { type: Number },
    currency: { type: String },
    // payment: {type: null},
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    address: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Address' }
});
exports.orderModel = (0, mongoose_1.model)('Order', exports.OrderSchema);
//# sourceMappingURL=order_config.js.map