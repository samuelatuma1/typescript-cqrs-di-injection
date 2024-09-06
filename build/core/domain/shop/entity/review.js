"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewResponse = void 0;
const base_entity_1 = __importDefault(require("../../../domain/common/entity/base_entity"));
class ReviewResponse {
    title;
    body;
    _id;
    responseBy = null;
}
exports.ReviewResponse = ReviewResponse;
class Review extends base_entity_1.default {
    rating;
    reviewedBy;
    title;
    body;
    reviewedAt;
    responses = [];
    wouldRecommend;
}
exports.default = Review;
//# sourceMappingURL=review.js.map