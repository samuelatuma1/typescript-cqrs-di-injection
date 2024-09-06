"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scpecialOfferModel = exports.SpecialOfferSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SpecialOfferSchema = new mongoose_1.Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    recordStatus: { type: String },
    name: { type: String },
    desc: { type: String, default: "" },
    discounts: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'Discount' },
    validityStartDate: { type: Date, required: true },
    validityEndDate: { type: Date, required: true }
});
exports.scpecialOfferModel = (0, mongoose_1.model)('SpecialOffer', exports.SpecialOfferSchema);
//# sourceMappingURL=special_offer.js.map