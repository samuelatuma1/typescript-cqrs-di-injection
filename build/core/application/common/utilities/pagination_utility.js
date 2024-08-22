"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_result_1 = require("../../../domain/authentication/dto/results/pagination_result");
class PaginationUtility {
    static paginateData(dataList, page = 0, pageSize = 10) {
        // get totalCount first
        if (page === 0) {
            return new pagination_result_1.PaginationResponse({ currentPage: page, itemsPerPage: dataList.length, totalItems: dataList.length, totalPages: 1, items: dataList });
        }
        const itemsToSkipCount = page === 0 ? 0 : (page - 1) * pageSize;
        const totalCount = dataList.length;
        const sliceEnd = page ? itemsToSkipCount + pageSize : totalCount;
        const paginatedItems = dataList.slice(itemsToSkipCount, sliceEnd);
        const totalPages = page ? Math.floor(totalCount / pageSize) + ((totalCount % pageSize == 0) ? 0 : 1) : 1;
        return new pagination_result_1.PaginationResponse({ currentPage: page, itemsPerPage: pageSize, totalItems: totalCount, totalPages, items: paginatedItems });
    }
}
exports.default = PaginationUtility;
//# sourceMappingURL=pagination_utility.js.map