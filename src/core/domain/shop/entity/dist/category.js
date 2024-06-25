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
var base_entity_1 = require("../../common/entity/base_entity");
var Category = /** @class */ (function (_super) {
    __extends(Category, _super);
    function Category(init) {
        var _a, _b, _c, _d;
        var _this = this;
        var id = new mongoose_1.Types.ObjectId();
        _this = _super.call(this, id) || this;
        _this.desc = "";
        _this.parentCategory = null;
        _this.subCategories = [];
        _this.name = init.name;
        _this.urlName = init.urlName;
        _this.desc = (_a = init.desc) !== null && _a !== void 0 ? _a : '';
        _this.img = (_b = init.img) !== null && _b !== void 0 ? _b : null;
        _this.parentCategory = init.parentCategory ? new mongoose_1.Types.ObjectId(init.parentCategory) : null;
        _this.filters = (_c = init.filters) !== null && _c !== void 0 ? _c : [];
        _this.products = (_d = init.products) !== null && _d !== void 0 ? _d : [];
        _this.subCategories = [];
        return _this;
    }
    return Category;
}(base_entity_1["default"]));
exports["default"] = Category;
