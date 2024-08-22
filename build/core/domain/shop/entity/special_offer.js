"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const base_entity_1 = __importDefault(require("../../../domain/common/entity/base_entity"));
class SpecialOffer extends base_entity_1.default {
    name;
    desc = "";
    validityStartDate;
    validityEndDate;
    discounts;
    constructor(init) {
        super(new mongoose_1.Types.ObjectId());
        this.name = init.name;
        this.desc = init.desc ?? "";
        this.discounts = [];
        this.validityStartDate = init.validityStartDate;
        this.validityEndDate = init.validityEndDate;
    }
}
exports.default = SpecialOffer;
//# sourceMappingURL=special_offer.js.map