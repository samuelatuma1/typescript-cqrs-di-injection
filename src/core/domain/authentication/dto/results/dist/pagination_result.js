"use strict";
exports.__esModule = true;
exports.PaginationResponse = void 0;
var PaginationResponse = /** @class */ (function () {
    function PaginationResponse(currentPage, itemsPerPage, totalItems, totalPages, items) {
        if (typeof (currentPage) === "number") {
            this.currentPage = currentPage;
            this.itemsPerPage = itemsPerPage;
            this.totalItems = totalItems;
            this.totalPages = totalPages;
            this.items = items;
        }
        else {
            this.currentPage = currentPage.currentPage;
            this.itemsPerPage = currentPage.itemsPerPage;
            this.totalItems = currentPage.totalItems;
            this.totalPages = currentPage.totalPages;
            this.items = currentPage.items;
        }
    }
    return PaginationResponse;
}());
exports.PaginationResponse = PaginationResponse;
