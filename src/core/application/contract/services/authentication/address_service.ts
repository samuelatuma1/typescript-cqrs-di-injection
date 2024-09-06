import { Types } from "mongoose";
import { CreateCityRequest, CreateCountryRequest, CreateStateRequest } from "../../../../domain/authentication/dto/requests/address_request";
import Address, { City, Country, State } from "../../../../domain/authentication/entity/address";

export default interface IAddressService {
    addCountries (createCountryRequests: CreateCountryRequest[]): Promise<Country[]>
    addStates(createStatesRequests: CreateStateRequest[]): Promise<State[]>
    addCities(createCitiesRequests: CreateCityRequest[]): Promise<City[]>

    getOrCreateAddress(address: Address | Types.ObjectId | string): Promise<Address | null>
}

export const IIAddressService = "IAddressService";