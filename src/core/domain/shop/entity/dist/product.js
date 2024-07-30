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
var mongoose_1 = require("mongoose");
var base_entity_1 = require("../../../domain/common/entity/base_entity");
var Variant = /** @class */ (function () {
    function Variant() {
        this.desc = "";
        this.mainImg = null;
        this.otherMedia = [];
        this.price = 0;
        this.currency = "";
        this.filters = new Map(); // key is the filterId as string
        this.reviews = [];
    }
    return Variant;
}());
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product(init) {
        var _a, _b, _c, _d, _e, _f;
        var _this = this;
        var id = new mongoose_1.Types.ObjectId();
        _this = _super.call(this, id) || this;
        _this.reviews = [];
        _this.variants = [];
        _this.discounts = [];
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
        return _this;
    }
    return Product;
}(base_entity_1["default"]));
exports["default"] = Product;
