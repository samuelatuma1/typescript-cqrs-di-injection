"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscountType = exports.DiscountAppliesTo = void 0;
const base_entity_1 = __importDefault(require("../../../domain/common/entity/base_entity"));
const mongoose_1 = require("mongoose");
var DiscountAppliesTo;
(function (DiscountAppliesTo) {
    DiscountAppliesTo["category"] = "category";
    DiscountAppliesTo["product"] = "product";
})(DiscountAppliesTo || (exports.DiscountAppliesTo = DiscountAppliesTo = {}));
var DiscountType;
(function (DiscountType) {
    DiscountType["percentage"] = "percentage";
    DiscountType["fixed"] = "fixed";
    DiscountType["bogo"] = "buy-one-get-one-free";
})(DiscountType || (exports.DiscountType = DiscountType = {}));
class Discount extends base_entity_1.default {
    name;
    value;
    appliesTo;
    discountType;
    validityStartDate;
    validityEndDate;
    useageLimit;
    usedCount;
    currency;
    minimumPurchaseAmount;
    isStackable;
    specialOfferid;
    createdBy = null;
    lastModifiedBy = null;
    constructor(init) {
        const _id = new mongoose_1.Types.ObjectId();
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
        this.specialOfferid = init.specialOfferid;
    }
}
exports.default = Discount;
//# sourceMappingURL=discount.js.map