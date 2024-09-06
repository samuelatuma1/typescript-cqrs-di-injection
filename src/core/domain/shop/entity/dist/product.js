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
exports.PackProduct = void 0;
var mongoose_1 = require("mongoose");
var base_entity_1 = require("../../../domain/common/entity/base_entity");
var PackProduct = /** @class */ (function () {
    function PackProduct() {
        this.qty = 1;
        this.isDeleted = false;
    }
    return PackProduct;
}());
exports.PackProduct = PackProduct;
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product(init) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var _this = this;
        var id = new mongoose_1.Types.ObjectId();
        _this = _super.call(this, id) || this;
        _this.reviews = [];
        _this.variants = [];
        _this.discounts = [];
        _this.isPack = false;
        _this.tags = [];
        _this.name = init.name;
        _this.desc = (_a = init.desc) !== null && _a !== void 0 ? _a : "";
        _this.mainImg = (_b = init.mainImg) !== null && _b !== void 0 ? _b : null;
        _this.otherMedia = (_c = init.otherMedia) !== null && _c !== void 0 ? _c : [];
        _this.inventory = init.inventory,
            _this.price = init.price;
        _this.currency = init.currency;
        _this.filters = (_d = init.filters) !== null && _d !== void 0 ? _d : new Map();
        _this.categories = (_e = init.categories) !== null && _e !== void 0 ? _e : [];
        _this.reviews = [];
        _this.extras = (_f = init.extras) !== null && _f !== void 0 ? _f : [];
        _this.discounts = init.discounts;
        _this.isPack = (_g = init.isPack) !== null && _g !== void 0 ? _g : false;
        _this.packProducts = (_h = init.packProducts) !== null && _h !== void 0 ? _h : [];
        _this.brandId = (_j = init.brandId) !== null && _j !== void 0 ? _j : null;
        _this.tags = (_k = init.tags) !== null && _k !== void 0 ? _k : [];
        return _this;
    }
    return Product;
}(base_entity_1["default"]));
exports["default"] = Product;
var Variant = /** @class */ (function (_super) {
    __extends(Variant, _super);
    function Variant() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.variants = null;
        _this.productId = null;
        return _this;
    }
    return Variant;
}(Product));
