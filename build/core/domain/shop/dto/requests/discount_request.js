"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialOfferRequest = exports.CreateDiscountRequest = void 0;
class CreateDiscountRequest {
    name;
    appliesTo;
    discountType;
    validityStartDate;
    validityEndDate;
    useageLimit;
    minimumPurchaseAmount;
    isStackable;
    createdBy;
    lastModifiedBy;
    currency;
    value;
}
exports.CreateDiscountRequest = CreateDiscountRequest;
class SpecialOfferRequest {
    name;
    desc;
    validityStartDate;
    validityEndDate;
}
exports.SpecialOfferRequest = SpecialOfferRequest;
//# sourceMappingURL=discount_request.js.map