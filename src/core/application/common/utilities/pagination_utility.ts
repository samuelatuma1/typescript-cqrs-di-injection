import { PaginationResponse } from "../../../domain/authentication/dto/results/pagination_result";

export default class PaginationUtility {
    static paginateData<T>(dataList: T[], page: number = 0, pageSize: number = 10): PaginationResponse<T>{
        // get totalCount first
        if(page === 0){
            return new PaginationResponse<T>({currentPage: page, itemsPerPage: dataList.length, totalItems: dataList.length, totalPages: 1, items: dataList})
        }
        const itemsToSkipCount = page === 0 ? 0 : (page - 1 ) * pageSize;
        
          
        const totalCount = dataList.length;
        const sliceEnd = page ? itemsToSkipCount + pageSize : totalCount
        const paginatedItems: T[] = dataList.slice(itemsToSkipCount, sliceEnd);
        const totalPages = page ? Math.floor(totalCount / pageSize) + ((totalCount % pageSize == 0) ? 0 : 1): 1;
        return new PaginationResponse<T>({currentPage: page, itemsPerPage: pageSize, totalItems: totalCount, totalPages, items: paginatedItems})
    }
}