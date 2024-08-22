"use strict";
exports.__esModule = true;
var pagination_result_1 = require("../../../domain/authentication/dto/results/pagination_result");
var PaginationUtility = /** @class */ (function () {
    function PaginationUtility() {
    }
    PaginationUtility.paginateData = function (dataList, page, pageSize) {
        if (page === void 0) { page = 0; }
        if (pageSize === void 0) { pageSize = 10; }
        // get totalCount first
        if (page === 0) {
            return new pagination_result_1.PaginationResponse({ currentPage: page, itemsPerPage: dataList.length, totalItems: dataList.length, totalPages: 1, items: dataList });
        }
        var itemsToSkipCount = page === 0 ? 0 : (page - 1) * pageSize;
        var totalCount = dataList.length;
        var sliceEnd = page ? itemsToSkipCount + pageSize : totalCount;
        var paginatedItems = dataList.slice(itemsToSkipCount, sliceEnd);
        var totalPages = page ? Math.floor(totalCount / pageSize) + ((totalCount % pageSize == 0) ? 0 : 1) : 1;
        return new pagination_result_1.PaginationResponse({ currentPage: page, itemsPerPage: pageSize, totalItems: totalCount, totalPages: totalPages, items: paginatedItems });
    };
    return PaginationUtility;
}());
exports["default"] = PaginationUtility;
