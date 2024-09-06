import Cart, { CartItem } from "../../../../domain/shop/entity/cart";
import { model, Schema } from "mongoose";

const CartItemSchema = new Schema<CartItem>({
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    qty: {type: Number },
    priceAtOrder: {type: Number},
    currency: {type: String},
    status: {type: String, default : ''}
});
export const CartSchema = new Schema<Cart>({
    createdAt: { type: Date, required: true },
    updatedAt : { type: Date, required: true },
    recordStatus: {type: String, required: true},

    cartItems: {type: [CartItemSchema]},
    totalAmount: {type: Number, default: 0},
    user: {type: String},
    orderId: {type: Schema.Types.ObjectId, default: null}
})

export const cartModel = model<Cart>( 'Cart', CartSchema)