"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationResponse = void 0;
class PaginationResponse {
    currentPage;
    itemsPerPage;
    totalItems;
    totalPages;
    items;
    constructor(currentPage, itemsPerPage, totalItems, totalPages, items) {
        this.currentPage = currentPage;
        this.itemsPerPage = itemsPerPage;
        this.totalItems = totalItems;
        this.totalPages = totalPages;
        this.items = items;
    }
}
exports.PaginationResponse = PaginationResponse;
//# sourceMappingURL=pagination_result.js.map