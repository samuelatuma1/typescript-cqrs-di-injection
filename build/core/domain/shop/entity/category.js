"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const base_entity_1 = __importDefault(require("../../common/entity/base_entity"));
class Category extends base_entity_1.default {
    name;
    urlName;
    desc = "";
    img;
    parentCategory = null;
    subCategories = [];
    filters;
    products; //TODO: Replace with actual product
    pagedProducts;
    isFeatured;
    constructor(init) {
        const id = new mongoose_1.Types.ObjectId();
        super(id);
        this.name = init.name;
        this.urlName = init.urlName;
        this.desc = init.desc ?? '';
        this.img = init.img ?? null;
        this.parentCategory = init.parentCategory ? new mongoose_1.Types.ObjectId(init.parentCategory) : null;
        this.filters = init.filters ?? [];
        this.products = init.products ?? [];
        this.subCategories = [];
        this.pagedProducts = null;
        this.isFeatured = init.isFeatured ?? false;
    }
}
exports.default = Category;
//# sourceMappingURL=category.js.map