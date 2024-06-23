import User from "../../../domain/authentication/entity/user";
import BaseEntity from "../../../domain/common/entity/base_entity";
import { Types } from "mongoose";

export class ReviewResponse{
    title: string;
    body: string;
    _id: Types.ObjectId;
    responseBy: Types.ObjectId | User | null = null
}
export default class Review extends BaseEntity<Types.ObjectId>{
    rating: number;
    reviewedBy: User | Types.ObjectId | null;
    title: string;
    body: string;
    reviewedAt: Date;
    responses: ReviewResponse[] = []
    wouldRecommend: boolean
}