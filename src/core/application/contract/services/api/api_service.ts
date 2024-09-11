import { ApiException } from "../../../../application/common/exceptions/api_exception";
import BaseException from "../../../../application/common/exceptions/base_exception";
import SerializationUtility from "../../../../application/common/utilities/serialization_utility";
import { ApiRequest } from "../../../../domain/model/api_service/dto/api_request";
import { ApiRequestContentType, ApiRequestMethod } from "../../../../domain/model/api_service/enum/api_request";

export default interface IApiService {
    apiRequest<IN, OUT>(request: ApiRequest<IN>): Promise<OUT>
}

export const IIApiService = "IApiService";