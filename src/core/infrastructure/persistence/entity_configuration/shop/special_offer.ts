import SpecialOffer from "../../../../domain/shop/entity/special_offer";
import { model, Schema } from "mongoose";

export const SpecialOfferSchema = new Schema<SpecialOffer>({
    createdAt: {type: Date},
    updatedAt: {type: Date},
    recordStatus: {type: String},
    
    name: {type: String},
    desc: {type: String, default: ""},
    discounts: {type: [Schema.Types.ObjectId], ref: 'Discount'},
    validityStartDate: {type: Date, required: true},
    validityEndDate: {type: Date, required: true}
});

export const scpecialOfferModel =  model('SpecialOffer', SpecialOfferSchema);