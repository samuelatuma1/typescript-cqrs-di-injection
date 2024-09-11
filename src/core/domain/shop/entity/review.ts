import User from "../../../domain/authentication/entity/user";
import BaseEntity from "../../../domain/common/entity/base_entity";
import { Types } from "mongoose";

export class ReviewResponse{
    body: string;
    _id: Types.ObjectId;
    responseBy: Types.ObjectId | User | null = null
}

export class FoundHelpful {
    userId: Types.ObjectId | null;
    userEmail: string | null;
    helpful: boolean
}

export interface ReviewInit{
    productId: Types.ObjectId 
    rating: number;
    reviewedBy: User | Types.ObjectId | null;
    title: string;
    body: string;
    reviewedAt: Date;
    wouldRecommend: boolean;
}
export default class Review extends BaseEntity<Types.ObjectId>{
    productId: Types.ObjectId 
    rating: number;
    reviewedBy: User | Types.ObjectId | null;
    reviewedAt: Date;
    title: string;
    body: string;
    responses: ReviewResponse[] = []
    wouldRecommend: boolean;
    isFeatured: boolean;
    foundHelpful: FoundHelpful[]

    public constructor(init: ReviewInit){
        super(new Types.ObjectId())
        this.productId = init.productId;
        this.rating = init.rating;
        this.reviewedBy = init.reviewedBy;
        this.reviewedAt = init.reviewedAt;
        this.title = init.title;
        this.body = init.body;
        this.responses = [];
        this.wouldRecommend = init.wouldRecommend;
        this.isFeatured = true 
        this.foundHelpful = [];
    }
}