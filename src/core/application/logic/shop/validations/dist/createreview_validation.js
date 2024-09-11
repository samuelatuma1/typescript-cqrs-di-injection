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
var mongoose_1 = require("mongoose");
var fluentvalidation_ts_1 = require("fluentvalidation-ts");
var CreateReviewValidation = /** @class */ (function (_super) {
    __extends(CreateReviewValidation, _super);
    function CreateReviewValidation() {
        var _this = _super.call(this) || this;
        _this.ruleFor('rating').notNull().lessThan(6).withMessage("Rating must nut exceed 5");
        _this.ruleFor('wouldRecommend').notNull();
        _this.ruleFor('title').notEmpty().notNull();
        _this.ruleFor('body').notEmpty().notNull();
        _this.ruleFor('productId').notNull().must(function (id) {
            try {
                id = new mongoose_1.Types.ObjectId(id);
                return true;
            }
            catch (ex) {
                return false;
            }
        }).withMessage('Please use a valid productId');
        return _this;
    }
    return CreateReviewValidation;
}(fluentvalidation_ts_1.Validator));
exports["default"] = CreateReviewValidation;
