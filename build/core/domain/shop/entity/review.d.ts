/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import User from "../../../domain/authentication/entity/user";
import BaseEntity from "../../../domain/common/entity/base_entity";
import { Types } from "mongoose";
export declare class ReviewResponse {
    body: string;
    _id: Types.ObjectId;
    responseBy: Types.ObjectId | User | null;
}
export declare class FoundHelpful {
    userId: Types.ObjectId | null;
    userEmail: string | null;
    helpful: boolean;
}
export interface ReviewInit {
    productId: Types.ObjectId;
    rating: number;
    reviewedBy: User | Types.ObjectId | null;
    title: string;
    body: string;
    reviewedAt: Date;
    wouldRecommend: boolean;
}
export default class Review extends BaseEntity<Types.ObjectId> {
    productId: Types.ObjectId;
    rating: number;
    reviewedBy: User | Types.ObjectId | null;
    reviewedAt: Date;
    title: string;
    body: string;
    responses: ReviewResponse[];
    wouldRecommend: boolean;
    isFeatured: boolean;
    foundHelpful: FoundHelpful[];
    constructor(init: ReviewInit);
}
