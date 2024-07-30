export class CreateCountryRequest {
    public name: string;
    public code: string; 
}
export class CreateStateRequest {
    public name: string;
    public code: string; 
    public countryCode: string ;
}

export class CreateCityRequest {
    public name: string;
    public code: string; 
    public stateCode: string ;
    public countryCode: string ;
}