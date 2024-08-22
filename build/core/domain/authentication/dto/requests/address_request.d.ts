export declare class CreateCountryRequest {
    name: string;
    code: string;
}
export declare class CreateStateRequest {
    name: string;
    code: string;
    countryCode: string;
}
export declare class CreateCityRequest {
    name: string;
    code: string;
    stateCode: string;
    countryCode: string;
}
