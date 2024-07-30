"use strict";
exports.__esModule = true;
exports.DiscountSchema = void 0;
var mongoose_1 = require("mongoose");
exports.DiscountSchema = new mongoose_1.Schema({
    name: { type: String },
    appliesTo: { type: String },
    validityStartDate: { type: Date },
    validityEndDate: { type: Date },
    useageLimit: { type: Number, "default": 0 },
    usedCount: { type: Number, "default": 0 },
    minimumPurchaseAmount: { type: Number },
    isStackable: { type: Boolean, "default": false },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    lastModifiedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }
});
