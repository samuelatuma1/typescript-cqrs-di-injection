import { Types } from "mongoose";

export class CreateProductReview {
    productId: Types.ObjectId 
    rating: number;
    reviewedBy: Types.ObjectId | null;
    title: string;
    body: string;
    wouldRecommend: boolean
}