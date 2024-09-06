"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CatalogueResponse {
    _id;
    isFeatured;
    title;
    desc;
    mainImg;
    products;
    constructor(init) {
        this.isFeatured = init.isFeatured;
        this.title = init.title;
        this.desc = init.desc;
        this.mainImg = init.mainImg;
        this.products = init.products ?? [];
        this._id = init._id;
    }
}
exports.default = CatalogueResponse;
//# sourceMappingURL=catalogue_response.js.map