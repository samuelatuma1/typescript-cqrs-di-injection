"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.CreateProductReview = exports.BestSellersQuery = exports.ApplyProductToDiscount = exports.UpdateProductRequest = exports.UpdateProductInventory = exports.UpdatePackProduct = exports.CreatePackProduct = exports.CreateProductRequest = exports.CreateFilterForProduct = void 0;
var currency_1 = require("../../../../domain/common/enum/currency");
var paginate_request_1 = require("../../../../domain/common/dto/requests/paginate_request");
var CreateFilterForProduct = /** @class */ (function () {
    function CreateFilterForProduct() {
    }
    return CreateFilterForProduct;
}());
exports.CreateFilterForProduct = CreateFilterForProduct;
var CreateProductRequest = /** @class */ (function () {
    function CreateProductRequest(init) {
        if (init === void 0) { init = null; }
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        this.mainImg = null;
        this.otherMedia = [];
        this.price = 0;
        this.currency = currency_1.Currency.NGN;
        this.filters = {}; // key is the filterId as string
        this.categories = [];
        this.extras = [];
        this.isPack = false;
        this.tags = [];
        this.isFeatured = true;
        this.name = init === null || init === void 0 ? void 0 : init.name;
        this.desc = (_a = init === null || init === void 0 ? void 0 : init.desc) !== null && _a !== void 0 ? _a : "";
        this.mainImg = (_b = init === null || init === void 0 ? void 0 : init.mainImg) !== null && _b !== void 0 ? _b : null;
        this.otherMedia = (_c = init === null || init === void 0 ? void 0 : init.otherMedia) !== null && _c !== void 0 ? _c : [],
            this.inventory = (_d = init === null || init === void 0 ? void 0 : init.inventory) !== null && _d !== void 0 ? _d : null;
        this.price = (_e = init === null || init === void 0 ? void 0 : init.price) !== null && _e !== void 0 ? _e : 0;
        this.currency = (_f = init === null || init === void 0 ? void 0 : init.currency) !== null && _f !== void 0 ? _f : currency_1.Currency.NGN;
        this.filters = (_g = init === null || init === void 0 ? void 0 : init.filters) !== null && _g !== void 0 ? _g : {};
        this.categories = (_h = init === null || init === void 0 ? void 0 : init.categories) !== null && _h !== void 0 ? _h : [];
        this.extras = (_j = init === null || init === void 0 ? void 0 : init.extras) !== null && _j !== void 0 ? _j : [];
        this.isPack = (_k = init === null || init === void 0 ? void 0 : init.isPack) !== null && _k !== void 0 ? _k : false;
        this.brandId = (_l = init === null || init === void 0 ? void 0 : init.brandId) !== null && _l !== void 0 ? _l : null;
        this.tags = (_m = init === null || init === void 0 ? void 0 : init.tags) !== null && _m !== void 0 ? _m : [];
        this.isFeatured = (_o = init === null || init === void 0 ? void 0 : init.isFeatured) !== null && _o !== void 0 ? _o : true;
    }
    return CreateProductRequest;
}());
exports.CreateProductRequest = CreateProductRequest;
var CreatePackProduct = /** @class */ (function () {
    function CreatePackProduct() {
        this.qty = 1;
    }
    return CreatePackProduct;
}());
exports.CreatePackProduct = CreatePackProduct;
var UpdatePackProduct = /** @class */ (function () {
    function UpdatePackProduct() {
    }
    return UpdatePackProduct;
}());
exports.UpdatePackProduct = UpdatePackProduct;
var UpdateProductInventory = /** @class */ (function () {
    function UpdateProductInventory() {
    }
    return UpdateProductInventory;
}());
exports.UpdateProductInventory = UpdateProductInventory;
var UpdateProductRequest = /** @class */ (function () {
    function UpdateProductRequest() {
        this.price = 0;
        this.currency = currency_1.Currency.NGN;
        // public extras?: ProductExtra[];
        this.brandId = null;
        this.addTags = [];
        this.removeTags = [];
        this.addExtras = [];
        this.removeExtras = [];
    }
    return UpdateProductRequest;
}());
exports.UpdateProductRequest = UpdateProductRequest;
var ApplyProductToDiscount = /** @class */ (function () {
    function ApplyProductToDiscount() {
    }
    return ApplyProductToDiscount;
}());
exports.ApplyProductToDiscount = ApplyProductToDiscount;
var BestSellersQuery = /** @class */ (function (_super) {
    __extends(BestSellersQuery, _super);
    function BestSellersQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BestSellersQuery;
}(paginate_request_1["default"]));
exports.BestSellersQuery = BestSellersQuery;
var CreateProductReview = /** @class */ (function () {
    function CreateProductReview() {
    }
    return CreateProductReview;
}());
exports.CreateProductReview = CreateProductReview;
