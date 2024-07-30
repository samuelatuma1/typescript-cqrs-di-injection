import Discount from "../../../../domain/shop/entity/discount";
import { model, Schema } from "mongoose";

export const DiscountSchema = new Schema<Discount>({

    createdAt: {type: Date},
    updatedAt: {type: Date},
    recordStatus: {type: String},
    name: {type: String},
    value: {type: Number},
    appliesTo: {type: String},
    discountType: {type: String, required: true},
    validityStartDate: {type: Date},
    validityEndDate: {type: Date},
    useageLimit: {type: Number, default : 0},
    usedCount: {type: Number, default : 0},
    minimumPurchaseAmount: {type: Number},
    isStackable: {type: Boolean, default: false},
    currency: {type: String},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
    lastModifiedBy: {type: Schema.Types.ObjectId, ref: 'User'},
    specialOfferid: {type: Schema.Types.ObjectId}
})

export const Discountmodel = model("Discount", DiscountSchema);