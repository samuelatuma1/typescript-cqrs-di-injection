import Cart, { CartItem } from "../../../../domain/shop/entity/cart";
import { model, Schema } from "mongoose";

const CartItemSchema = new Schema<CartItem>({
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    qty: {type: Number },
    priceAtOrder: {type: Number},
    currency: {type: String}
});
export const CartSchema = new Schema<Cart>({
    createdAt: { type: Date, required: true },
    updatedAt : { type: Date, required: true },
    recordStatus: {type: String, required: true},

    cartItems: {type: [CartItemSchema]},
    totalAmount: {type: Number, default: 0},
    user: {type: String}
})

export const cartModel = model<Cart>( 'Cart', CartSchema)