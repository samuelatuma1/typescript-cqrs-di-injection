"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.DiscountType = exports.DiscountAppliesTo = void 0;
var base_entity_1 = require("../../../domain/common/entity/base_entity");
var mongoose_1 = require("mongoose");
var DiscountAppliesTo;
(function (DiscountAppliesTo) {
    DiscountAppliesTo["category"] = "category";
    DiscountAppliesTo["product"] = "product";
})(DiscountAppliesTo = exports.DiscountAppliesTo || (exports.DiscountAppliesTo = {}));
var DiscountType;
(function (DiscountType) {
    DiscountType["percentage"] = "percentage";
    DiscountType["fixed"] = "fixed";
    DiscountType["bogo"] = "buy-one-get-one-free";
})(DiscountType = exports.DiscountType || (exports.DiscountType = {}));
var Discount = /** @class */ (function (_super) {
    __extends(Discount, _super);
    function Discount(init) {
        var _a, _b, _c, _d, _e, _f;
        var _this = this;
        var _id = new mongoose_1.Types.ObjectId();
        _this = _super.call(this, _id) || this;
        _this.createdBy = null;
        _this.lastModifiedBy = null;
        _this.name = init.name;
        _this.appliesTo = init.appliesTo;
        _this.discountType = init.discountType;
        _this.validityStartDate = init.validityStartDate;
        _this.validityEndDate = init.validityEndDate;
        _this.useageLimit = (_a = init.useageLimit) !== null && _a !== void 0 ? _a : 0;
        _this.usedCount = 0;
        _this.minimumPurchaseAmount = (_b = init.minimumPurchaseAmount) !== null && _b !== void 0 ? _b : 0;
        _this.isStackable = (_c = init.isStackable) !== null && _c !== void 0 ? _c : false;
        _this.createdBy = (_d = init.createdBy) !== null && _d !== void 0 ? _d : null;
        _this.lastModifiedBy = (_e = init.lastModifiedBy) !== null && _e !== void 0 ? _e : null;
        _this.currency = (_f = init.currency) !== null && _f !== void 0 ? _f : null;
        _this.value = init.value;
        _this.specialOfferid = init.specialOfferid;
        return _this;
    }
    return Discount;
}(base_entity_1["default"]));
exports["default"] = Discount;
