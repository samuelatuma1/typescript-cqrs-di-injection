"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = __importDefault(require("../../../domain/common/entity/base_entity"));
const mongoose_1 = require("mongoose");
class Catalogue extends base_entity_1.default {
    isFeatured;
    title;
    desc;
    mainImg;
    products;
    constructor(init) {
        super(new mongoose_1.Types.ObjectId());
        this.isFeatured = init.isFeatured;
        this.title = init.title;
        this.desc = init.desc;
        this.mainImg = init.mainImg;
        this.products = [];
    }
}
exports.default = Catalogue;
//# sourceMappingURL=catalogue.js.map