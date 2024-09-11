import { injectable } from "tsyringe";
import { ApiException } from "../../../application/common/exceptions/api_exception";
import SerializationUtility from "../../../application/common/utilities/serialization_utility";
import IApiService from "../../../application/contract/services/api/api_service";
import { ApiRequest } from "../../../domain/model/api_service/dto/api_request";
import { ApiRequestContentType } from "../../../domain/model/api_service/enum/api_request";


@injectable()
export class ApiService implements IApiService {
    public async apiRequest<IN, OUT>  (request: ApiRequest<IN>): Promise<OUT> {
        try{
            let headers: {[key: string]: string} = {
                'Content-Type': ApiRequestContentType.JSON,
            };
            if(request.headers?.contentType){
                headers['Content-Type'] = request.headers?.contentType
            }
            if(request.headers?.authorization){
                headers.authorization = request.headers?.authorization
            }
            let body;
            if(request.body){
                switch(headers['Content-Type']){
                    case ApiRequestContentType.JSON:
                        body = SerializationUtility.serializeJson(request.body as object)
                        break;

                    default:
                        break
                }

                console.log({body})
            }

            const response = await fetch(request.url, {
                method: request.method,
                headers,
                body
            })
            if(response.ok){
                let resp;
                switch (request.headers?.responseType){
                    case ApiRequestContentType.TEXT:
                        resp = await response.text() as OUT
                        break;
                    default:
                        resp = await response.json() as OUT
                }

                return resp
            }
            else{
                let res = await response.text()
                throw new ApiException(`${res}`)
            }
        } catch(ex){
            console.log("##################__________________")
            console.log("##################__________________")
            console.log({ex})
            console.log(ex)
            console.log("##################__________________")
            console.log("##################__________________")
            throw new ApiException(`${ex}`)
        }
        
    }
}