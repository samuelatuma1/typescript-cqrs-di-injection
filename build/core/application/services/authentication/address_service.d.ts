import IAddressService from "../../../application/contract/services/authentication/address_service";
import ICityRepository from "../../../application/contract/data_access/authentication/city_repository";
import ICountryRepository from "../../../application/contract/data_access/authentication/country_repository";
import IStateRepository from "../../../application/contract/data_access/authentication/state_repository";
import { City, Country, State } from "../../../domain/authentication/entity/address";
import IAddressRepository from "../../../application/contract/data_access/authentication/address_repository";
import { CreateCityRequest, CreateCountryRequest, CreateStateRequest } from "../../../domain/authentication/dto/requests/address_request";
import IEventTracer from "../../../application/contract/observability/event_tracer";
export default class AddressService implements IAddressService {
    readonly cityRepository: ICityRepository;
    readonly countryRepository: ICountryRepository;
    readonly stateRepository: IStateRepository;
    readonly addressRepository: IAddressRepository;
    readonly eventTracer: IEventTracer;
    constructor(cityRepository: ICityRepository, countryRepository: ICountryRepository, stateRepository: IStateRepository, addressRepository: IAddressRepository, eventTracer: IEventTracer);
    addCountries: (createCountryRequests: CreateCountryRequest[]) => Promise<Country[]>;
    addStates: (createStatesRequests: CreateStateRequest[]) => Promise<State[]>;
    addCities: (createCitiesRequests: CreateCityRequest[]) => Promise<City[]>;
}
