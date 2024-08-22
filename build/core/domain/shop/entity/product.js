"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackProduct = void 0;
const mongoose_1 = require("mongoose");
const base_entity_1 = __importDefault(require("../../../domain/common/entity/base_entity"));
class PackProduct {
    _id;
    name;
    desc;
    mainImg;
    otherMedia;
    qty = 1;
    isDeleted = false;
}
exports.PackProduct = PackProduct;
class Product extends base_entity_1.default {
    name;
    desc;
    mainImg;
    otherMedia;
    inventory;
    price;
    currency;
    filters; // key is the filterId as string
    categories;
    reviews = [];
    extras;
    variants = [];
    discounts = [];
    isPack = false;
    packProducts;
    catalogues;
    brandId;
    constructor(init) {
        const id = new mongoose_1.Types.ObjectId();
        super(id);
        this.name = init.name;
        this.desc = init.desc ?? "";
        this.mainImg = init.mainImg ?? null;
        this.otherMedia = init.otherMedia ?? [];
        this.inventory = init.inventory,
            this.price = init.price;
        this.currency = init.currency;
        this.filters = init.filters ?? new Map();
        this.categories = init.categories ?? [];
        this.reviews = [];
        this.extras = init.extras ?? [];
        this.discounts = init.discounts;
        this.isPack = init.isPack ?? false;
        this.packProducts = init.packProducts ?? [];
        this.brandId = init.brandId ?? null;
    }
}
exports.default = Product;
class Variant extends Product {
    variants = null;
    productId = null;
}
//# sourceMappingURL=product.js.map