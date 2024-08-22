"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandResponse = void 0;
class BrandResponse {
    _id;
    name;
    desc;
    isFeatured;
    products;
    mainImg;
    categories;
    constructor(init) {
        this._id = init._id;
        this.isFeatured = init.isFeatured;
        this.name = init.name;
        this.desc = init.desc;
        this.mainImg = init.mainImg;
        this.products = init.products;
        this.categories = [];
    }
}
exports.BrandResponse = BrandResponse;
//# sourceMappingURL=brand_response.js.map