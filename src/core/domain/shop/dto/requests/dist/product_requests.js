"use strict";
exports.__esModule = true;
exports.UpdateProductRequest = exports.CreateProductRequest = exports.CreateFilterForProduct = void 0;
var currency_1 = require("../../../../domain/common/enum/currency");
var CreateFilterForProduct = /** @class */ (function () {
    function CreateFilterForProduct() {
    }
    return CreateFilterForProduct;
}());
exports.CreateFilterForProduct = CreateFilterForProduct;
var CreateProductRequest = /** @class */ (function () {
    function CreateProductRequest(init) {
        if (init === void 0) { init = null; }
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.mainImg = null;
        this.otherMedia = [];
        this.price = 0;
        this.currency = currency_1.Currency.NGN;
        this.filters = {}; // key is the filterId as string
        this.categories = [];
        this.extras = [];
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
    }
    return CreateProductRequest;
}());
exports.CreateProductRequest = CreateProductRequest;
var UpdateProductRequest = /** @class */ (function () {
    function UpdateProductRequest() {
        this.price = 0;
        this.currency = currency_1.Currency.NGN;
    }
    return UpdateProductRequest;
}());
exports.UpdateProductRequest = UpdateProductRequest;
