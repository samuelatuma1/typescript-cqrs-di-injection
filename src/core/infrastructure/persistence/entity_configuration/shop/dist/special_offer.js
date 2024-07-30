"use strict";
exports.__esModule = true;
exports.scpecialOfferModel = exports.SpecialOfferSchema = void 0;
var mongoose_1 = require("mongoose");
exports.SpecialOfferSchema = new mongoose_1.Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    recordStatus: { type: String },
    name: { type: String },
    desc: { type: String, "default": "" },
    discounts: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'Discount' },
    validityStartDate: { type: Date, required: true },
    validityEndDate: { type: Date, required: true }
});
exports.scpecialOfferModel = mongoose_1.model('SpecialOffer', exports.SpecialOfferSchema);
