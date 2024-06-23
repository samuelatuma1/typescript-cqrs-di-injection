import Review, { ReviewResponse } from "../../../../domain/shop/entity/review";
import { model, Schema } from "mongoose";

const ReviewResponseSchema = new Schema<ReviewResponse>({
    title: {type: String},
    body: {type: String},
    responseBy: {type: Schema.Types.ObjectId, ref: 'User', default: null},
})
export const ReviewSchema = new Schema<Review>({
    rating: {type: Number},
    reviewedBy: {type: Schema.Types.ObjectId, ref: 'User', default: null},
    title: {type: String},
    body: {type: String},

    reviewedAt: {type: Date, default: new Date()},
    responses: {type: [ReviewResponseSchema]},
    wouldRecommend: {type: Boolean}
});

export const reviewModel = model<Review>('Review', ReviewSchema);