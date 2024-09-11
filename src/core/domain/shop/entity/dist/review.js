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
exports.FoundHelpful = exports.ReviewResponse = void 0;
var base_entity_1 = require("../../../domain/common/entity/base_entity");
var mongoose_1 = require("mongoose");
var ReviewResponse = /** @class */ (function () {
    function ReviewResponse() {
        this.responseBy = null;
    }
    return ReviewResponse;
}());
exports.ReviewResponse = ReviewResponse;
var FoundHelpful = /** @class */ (function () {
    function FoundHelpful() {
    }
    return FoundHelpful;
}());
exports.FoundHelpful = FoundHelpful;
var Review = /** @class */ (function (_super) {
    __extends(Review, _super);
    function Review(init) {
        var _this = _super.call(this, new mongoose_1.Types.ObjectId()) || this;
        _this.responses = [];
        _this.productId = init.productId;
        _this.rating = init.rating;
        _this.reviewedBy = init.reviewedBy;
        _this.reviewedAt = init.reviewedAt;
        _this.title = init.title;
        _this.body = init.body;
        _this.responses = [];
        _this.wouldRecommend = init.wouldRecommend;
        _this.isFeatured = true;
        _this.foundHelpful = [];
        return _this;
    }
    return Review;
}(base_entity_1["default"]));
exports["default"] = Review;
