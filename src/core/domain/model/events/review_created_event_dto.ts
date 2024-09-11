import { Types } from "mongoose";

export default class ReviewCreatedEventDTO {
    reviewId: Types.ObjectId;
    createdAt: Date;
    public constructor(init: {reviewId: Types.ObjectId, createdAt: Date}){
        this.reviewId = init.reviewId;
        this.createdAt = init.createdAt;
    }
}