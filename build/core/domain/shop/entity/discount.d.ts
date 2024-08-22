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
import { Currency } from "core/domain/common/enum/currency";
import User from "../../../domain/authentication/entity/user";
import BaseEntity from "../../../domain/common/entity/base_entity";
import { Types } from "mongoose";
export declare enum DiscountAppliesTo {
    category = "category",
    product = "product"
}
export declare enum DiscountType {
    percentage = "percentage",
    fixed = "fixed",
    bogo = "buy-one-get-one-free"
}
export interface DiscountInit {
    name: string;
    appliesTo: DiscountAppliesTo | string;
    discountType: DiscountType | string;
    validityStartDate: Date;
    validityEndDate: Date;
    useageLimit?: number;
    currency?: Currency;
    minimumPurchaseAmount?: number;
    isStackable?: boolean;
    createdBy?: Types.ObjectId;
    lastModifiedBy?: Types.ObjectId;
    value: number;
    specialOfferid?: Types.ObjectId | null;
}
export default class Discount extends BaseEntity<Types.ObjectId> {
    name: string;
    value: number;
    appliesTo: DiscountAppliesTo | string;
    discountType: DiscountType | string;
    validityStartDate: Date;
    validityEndDate: Date;
    useageLimit: number;
    usedCount: number;
    currency: Currency | string | null;
    minimumPurchaseAmount: number;
    isStackable: boolean;
    specialOfferid?: Types.ObjectId | null;
    createdBy: Types.ObjectId | User | null;
    lastModifiedBy: Types.ObjectId | User | null;
    constructor(init: DiscountInit);
}
