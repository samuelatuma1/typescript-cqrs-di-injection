"use strict";
exports.__esModule = true;
exports.BrandResponse = void 0;
var BrandResponse = /** @class */ (function () {
    function BrandResponse(init) {
        this._id = init._id;
        this.isFeatured = init.isFeatured;
        this.name = init.name;
        this.desc = init.desc;
        this.mainImg = init.mainImg;
        this.products = init.products;
        this.categories = [];
    }
    return BrandResponse;
}());
exports.BrandResponse = BrandResponse;
