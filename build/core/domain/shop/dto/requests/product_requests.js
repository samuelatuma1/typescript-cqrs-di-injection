"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BestSellersQuery = exports.ApplyProductToDiscount = exports.UpdateProductRequest = exports.UpdateProductInventory = exports.UpdatePackProduct = exports.CreatePackProduct = exports.CreateProductRequest = exports.CreateFilterForProduct = void 0;
const currency_1 = require("../../../../domain/common/enum/currency");
const paginate_request_1 = __importDefault(require("../../../../domain/common/dto/requests/paginate_request"));
class CreateFilterForProduct {
    name;
    values;
    filterId;
}
exports.CreateFilterForProduct = CreateFilterForProduct;
class CreateProductRequest {
    name;
    desc;
    mainImg = null;
    otherMedia = [];
    inventory;
    price = 0;
    currency = currency_1.Currency.NGN;
    filters = {}; // key is the filterId as string
    categories = [];
    extras = [];
    brandId;
    isPack = false;
    tags = [];
    constructor(init = null) {
        this.name = init?.name;
        this.desc = init?.desc ?? "";
        this.mainImg = init?.mainImg ?? null;
        this.otherMedia = init?.otherMedia ?? [],
            this.inventory = init?.inventory ?? null;
        this.price = init?.price ?? 0;
        this.currency = init?.currency ?? currency_1.Currency.NGN;
        this.filters = init?.filters ?? {};
        this.categories = init?.categories ?? [];
        this.extras = init?.extras ?? [];
        this.isPack = init?.isPack ?? false;
        this.brandId = init?.brandId ?? null;
        this.tags = init?.tags ?? [];
    }
}
exports.CreateProductRequest = CreateProductRequest;
class CreatePackProduct {
    name;
    desc;
    mainImg;
    otherMedia;
    qty = 1;
}
exports.CreatePackProduct = CreatePackProduct;
class UpdatePackProduct {
    name;
    desc;
    mainImg;
    otherMedia;
    qty = 1;
}
exports.UpdatePackProduct = UpdatePackProduct;
class UpdateProductInventory {
    qty;
    updateType;
}
exports.UpdateProductInventory = UpdateProductInventory;
class UpdateProductRequest {
    name;
    desc;
    // public mainImg?: UploadFile;
    // public otherMedia?: UploadFile[];
    inventory;
    price = 0;
    currency = currency_1.Currency.NGN;
    filters;
    addCategories;
    removeCategories;
    // public extras?: ProductExtra[];
    brandId = null;
    addTags = [];
    removeTags = [];
    addExtras = [];
    removeExtras = [];
}
exports.UpdateProductRequest = UpdateProductRequest;
class ApplyProductToDiscount {
    productId;
    discountId;
    discount;
}
exports.ApplyProductToDiscount = ApplyProductToDiscount;
class BestSellersQuery extends paginate_request_1.default {
    categoryId;
    catalogueId;
    brandId;
    lastItemId;
}
exports.BestSellersQuery = BestSellersQuery;
//# sourceMappingURL=product_requests.js.map