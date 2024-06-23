export declare class PaginationResponse<T> {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    items: T[];
    constructor(currentPage: number, itemsPerPage: number, totalItems: number, totalPages: number, items: T[]);
}
