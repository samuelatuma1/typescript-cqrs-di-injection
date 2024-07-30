import { CreateCityRequest, CreateCountryRequest, CreateStateRequest } from "../../../../domain/authentication/dto/requests/address_request";
import { City, Country, State } from "../../../../domain/authentication/entity/address";

export default interface IAddressService {
    addCountries (createCountryRequests: CreateCountryRequest[]): Promise<Country[]>
    addStates(createStatesRequests: CreateStateRequest[]): Promise<State[]>
    addCities(createCitiesRequests: CreateCityRequest[]): Promise<City[]>
}

export const IIAddressService = "IAddressService";