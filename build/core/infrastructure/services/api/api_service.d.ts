import IApiService from "../../../application/contract/services/api/api_service";
import { ApiRequest } from "../../../domain/model/api_service/dto/api_request";
export declare class ApiService implements IApiService {
    apiRequest<IN, OUT>(request: ApiRequest<IN>): Promise<OUT>;
}
