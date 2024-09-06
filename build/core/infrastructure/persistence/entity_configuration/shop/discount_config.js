"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discountmodel = exports.DiscountSchema = void 0;
const mongoose_1 = require("mongoose");
exports.DiscountSchema = new mongoose_1.Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    recordStatus: { type: String },
    name: { type: String },
    value: { type: Number },
    appliesTo: { type: String },
    discountType: { type: String, required: true },
    validityStartDate: { type: Date },
    validityEndDate: { type: Date },
    useageLimit: { type: Number, default: 0 },
    usedCount: { type: Number, default: 0 },
    minimumPurchaseAmount: { type: Number },
    isStackable: { type: Boolean, default: false },
    currency: { type: String },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    lastModifiedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    specialOfferid: { type: mongoose_1.Schema.Types.ObjectId }
});
exports.Discountmodel = (0, mongoose_1.model)("Discount", exports.DiscountSchema);
//# sourceMappingURL=discount_config.js.map