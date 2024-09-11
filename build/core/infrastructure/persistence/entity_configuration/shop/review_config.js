"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewModel = exports.ReviewSchema = void 0;
const mongoose_1 = require("mongoose");
const ReviewResponseSchema = new mongoose_1.Schema({
    body: { type: String },
    responseBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: null },
});
const FoundHelpfulSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId },
    userEmail: { type: String },
    helpful: { type: Boolean }
});
exports.ReviewSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    recordStatus: { type: String },
    rating: { type: Number },
    reviewedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', default: null },
    title: { type: String },
    body: { type: String },
    reviewedAt: { type: Date, default: new Date() },
    responses: { type: [ReviewResponseSchema] },
    wouldRecommend: { type: Boolean },
    foundHelpful: [FoundHelpfulSchema]
});
exports.reviewModel = (0, mongoose_1.model)('Review', exports.ReviewSchema);
//# sourceMappingURL=review_config.js.map