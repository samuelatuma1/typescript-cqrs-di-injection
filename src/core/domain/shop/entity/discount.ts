import { Currency } from "core/domain/common/enum/currency";
import User from "../../../domain/authentication/entity/user";
import BaseEntity from "../../../domain/common/entity/base_entity";
import { Types } from "mongoose";
export enum DiscountAppliesTo {
    category = "category",
    product = "product"
}

export enum DiscountType {
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
    isStackable?: boolean
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
    createdBy: Types.ObjectId | User | null = null;
    lastModifiedBy: Types.ObjectId | User | null = null;
    public constructor(init: DiscountInit){
        const _id = new Types.ObjectId();
        super(_id);
        this.name = init.name;
        this.appliesTo = init.appliesTo;
        this.discountType = init.discountType;
        this.validityStartDate = init.validityStartDate;
        this.validityEndDate = init.validityEndDate;
        this.useageLimit = init.useageLimit ?? 0;
        this.usedCount = 0;
        this.minimumPurchaseAmount = init.minimumPurchaseAmount ?? 0;
        this.isStackable = init.isStackable ?? false;
        this.createdBy = init.createdBy ?? null;
        this.lastModifiedBy = init.lastModifiedBy ?? null;
        this.currency = init.currency ?? null;
        this.value = init.value;
        this.specialOfferid  =  init.specialOfferid;
    }
}