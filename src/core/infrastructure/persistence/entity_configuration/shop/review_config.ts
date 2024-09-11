import Review, { FoundHelpful, ReviewResponse } from "../../../../domain/shop/entity/review";
import { model, Schema } from "mongoose";

const ReviewResponseSchema = new Schema<ReviewResponse>({
    body: {type: String},
    responseBy: {type: Schema.Types.ObjectId, ref: 'User', default: null},
})

const FoundHelpfulSchema = new Schema<FoundHelpful>({
    userId: {type: Schema.Types.ObjectId},
    userEmail: {type: String},
    helpful: {type: Boolean}
})
export const ReviewSchema = new Schema<Review>({
    productId: {type: Schema.Types.ObjectId, ref: 'Product'},
    createdAt: {type: Date},
    updatedAt: {type: Date},
    recordStatus: {type: String},
    
    rating: {type: Number},
    reviewedBy: {type: Schema.Types.ObjectId, ref: 'User', default: null},
    title: {type: String},
    body: {type: String},

    reviewedAt: {type: Date, default: new Date()},
    responses: {type: [ReviewResponseSchema]},
    wouldRecommend: {type: Boolean},
    foundHelpful: [FoundHelpfulSchema]
});

export const reviewModel = model<Review>('Review', ReviewSchema);