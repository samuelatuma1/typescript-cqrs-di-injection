"use strict";
exports.__esModule = true;
var CatalogueResponse = /** @class */ (function () {
    function CatalogueResponse(init) {
        var _a;
        this.isFeatured = init.isFeatured;
        this.title = init.title;
        this.desc = init.desc;
        this.mainImg = init.mainImg;
        this.products = (_a = init.products) !== null && _a !== void 0 ? _a : [];
        this._id = init._id;
    }
    return CatalogueResponse;
}());
exports["default"] = CatalogueResponse;
