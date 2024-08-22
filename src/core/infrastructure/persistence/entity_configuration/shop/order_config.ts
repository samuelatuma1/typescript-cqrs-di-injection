import Order from "../../../../domain/shop/entity/order";
import OrderItem from "../../../../domain/shop/entity/order_item";
import { model, Schema } from "mongoose";

const OrderItemSchema = new Schema<OrderItem>({
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    qty: {type: Number},
    priceAtOrder: {type: Number},
    currency: {type: String},
    status: {type: String, default : ""}
})
export const OrderSchema = new Schema<Order>({
    createdAt: { type: Date, required: true },
    updatedAt : { type: Date, required: true },
    recordStatus: {type: String, required: true},

    orderItems: {type: [OrderItemSchema]},
    totalAmount: {type: Number},
    currency: {type: String},
    // payment: {type: null},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    address: {type: Schema.Types.ObjectId, ref: 'Address'}
});

export const orderModel = model('Order', OrderSchema);