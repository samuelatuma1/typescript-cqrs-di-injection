import { Types } from "mongoose";
import { DiscountAppliesTo, DiscountType } from "../../entity/discount";
import { Currency } from "../../../../domain/common/enum/currency";

export class CreateDiscountRequest {
    name!: string;
    appliesTo: DiscountAppliesTo;
    discountType: DiscountType;
    validityStartDate: Date;
    validityEndDate: Date;
    useageLimit?: number;
    minimumPurchaseAmount?: number;
    isStackable?: boolean;
    createdBy?: Types.ObjectId;
    lastModifiedBy?: Types.ObjectId;
    currency?: Currency;
    value: number;
}

export class SpecialOfferRequest {
    name: string;
    desc?: string;
    validityStartDate: Date;
    validityEndDate: Date;
}