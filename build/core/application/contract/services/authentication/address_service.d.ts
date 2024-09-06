/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Types } from "mongoose";
import { CreateCityRequest, CreateCountryRequest, CreateStateRequest } from "../../../../domain/authentication/dto/requests/address_request";
import Address, { City, Country, State } from "../../../../domain/authentication/entity/address";
export default interface IAddressService {
    addCountries(createCountryRequests: CreateCountryRequest[]): Promise<Country[]>;
    addStates(createStatesRequests: CreateStateRequest[]): Promise<State[]>;
    addCities(createCitiesRequests: CreateCityRequest[]): Promise<City[]>;
    getOrCreateAddress(address: Address | Types.ObjectId | string): Promise<Address | null>;
}
export declare const IIAddressService = "IAddressService";
