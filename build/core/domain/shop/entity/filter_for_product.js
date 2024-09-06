"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FilterForProduct {
    name;
    values;
    categoryId;
    filterType;
    filterId;
    constructor(filterForProductInit) {
        this.name = filterForProductInit.name;
        this.values = filterForProductInit.values;
        this.filterType = filterForProductInit.filterType;
        this.filterId = filterForProductInit.filterId;
    }
}
exports.default = FilterForProduct;
//# sourceMappingURL=filter_for_product.js.map