import { PaginationResponse } from "../../../domain/authentication/dto/results/pagination_result";
export default class PaginationUtility {
    static paginateData<T>(dataList: T[], page?: number, pageSize?: number): PaginationResponse<T>;
}
