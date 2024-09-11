"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoundHelpful = exports.ReviewResponse = void 0;
const base_entity_1 = __importDefault(require("../../../domain/common/entity/base_entity"));
const mongoose_1 = require("mongoose");
class ReviewResponse {
    body;
    _id;
    responseBy = null;
}
exports.ReviewResponse = ReviewResponse;
class FoundHelpful {
    userId;
    userEmail;
    helpful;
}
exports.FoundHelpful = FoundHelpful;
class Review extends base_entity_1.default {
    productId;
    rating;
    reviewedBy;
    reviewedAt;
    title;
    body;
    responses = [];
    wouldRecommend;
    isFeatured;
    foundHelpful;
    constructor(init) {
        super(new mongoose_1.Types.ObjectId());
        this.productId = init.productId;
        this.rating = init.rating;
        this.reviewedBy = init.reviewedBy;
        this.reviewedAt = init.reviewedAt;
        this.title = init.title;
        this.body = init.body;
        this.responses = [];
        this.wouldRecommend = init.wouldRecommend;
        this.isFeatured = true;
        this.foundHelpful = [];
    }
}
exports.default = Review;
//# sourceMappingURL=review.js.map