"use strict";
exports.__esModule = true;
exports.reviewModel = exports.ReviewSchema = void 0;
var mongoose_1 = require("mongoose");
var ReviewResponseSchema = new mongoose_1.Schema({
    title: { type: String },
    body: { type: String },
    responseBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', "default": null }
});
exports.ReviewSchema = new mongoose_1.Schema({
    rating: { type: Number },
    reviewedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', "default": null },
    title: { type: String },
    body: { type: String },
    reviewedAt: { type: Date, "default": new Date() },
    responses: { type: [ReviewResponseSchema] },
    wouldRecommend: { type: Boolean }
});
exports.reviewModel = mongoose_1.model('Review', exports.ReviewSchema);
