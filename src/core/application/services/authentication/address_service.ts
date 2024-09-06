import { inject, injectable } from "tsyringe";
import IAddressService from "../../../application/contract/services/authentication/address_service";
import ICityRepository, { IICityRepository } from "../../../application/contract/data_access/authentication/city_repository";
import ICountryRepository, { IICountryRepository } from "../../../application/contract/data_access/authentication/country_repository";
import IStateRepository, { IIStateRepository } from "../../../application/contract/data_access/authentication/state_repository";
import Address, { City, Country, State } from "../../../domain/authentication/entity/address";
import IAddressRepository, { IIAddressRepository } from "../../../application/contract/data_access/authentication/address_repository";
import { CreateCityRequest, CreateCountryRequest, CreateStateRequest } from "../../../domain/authentication/dto/requests/address_request";
import IEventTracer, { IIEventTracer } from "../../../application/contract/observability/event_tracer";
import { Types } from "mongoose";
import NotFoundException from "../../../application/common/exceptions/not_found_exception";



@injectable()
export default class AddressService implements IAddressService {
    public constructor(
        @inject(IICityRepository) public readonly cityRepository:  ICityRepository,
        @inject(IICountryRepository) public readonly  countryRepository:  ICountryRepository,
        @inject(IIStateRepository) public readonly  stateRepository:  IStateRepository,
        @inject(IIAddressRepository) public readonly addressRepository: IAddressRepository,
        @inject(IIEventTracer) public readonly eventTracer: IEventTracer
    ){}
    
    public addCountries = async (createCountryRequests: CreateCountryRequest[]): Promise<Country[]> => {
        this.eventTracer.say(`AddressService: Add Country`)
        try{
            let countryCodes = createCountryRequests.map(country => country.code);
            let existingCountriesWithCode = await this.countryRepository.contains({code: countryCodes})

            let filteredCountryList = createCountryRequests.filter(country => !(existingCountriesWithCode.find(existingCountry => existingCountry.code === country.code)))

            const countries = filteredCountryList.map(country => new Country({...country}));
            let countriesSaved = await this.countryRepository.addManyAsync(countries);
            this.eventTracer.isSuccessWithResponseAndMessage(countriesSaved);
            return countriesSaved;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`)
            throw ex;
        }
    }

    public addStates = async (createStatesRequests: CreateStateRequest[]): Promise<State[]> => {
        this.eventTracer.say(`AddressService: Add State`)
        try{
            let countryCodes =[...new Set<string>(createStatesRequests.map(state => state.countryCode))];
            
            let existingCountriesWithCode = await this.countryRepository.contains({code: countryCodes})
            this.eventTracer.say(`country codes : ${countryCodes}`)
            let existingStatesOrQuery = createStatesRequests.map(
                stateRequest => ({code: stateRequest.code, countryCode: stateRequest.countryCode }))

            let existingStates = await this.stateRepository.or(existingStatesOrQuery)
            let newStates = []
            for (let state of createStatesRequests){ // Find a way to improve performance here
                let stateExists = existingStates.find(existingState => state.code === existingState.code && state.countryCode === existingState.countryCode)
                
                if(!stateExists){
                    newStates.push(state);
                }
            }
            console.log({existingStatesOrQuery, existingStates, newStates, existingCountriesWithCode})

            let newStatesWithValidCountryCode = newStates.filter(state => (existingCountriesWithCode.find(existingCountry => existingCountry.code === state.countryCode)))

            const states = newStatesWithValidCountryCode.map(state => new State({...state}));
            
            let statesSaved = await this.stateRepository.addManyAsync(states);
            this.eventTracer.isSuccessWithResponseAndMessage(statesSaved);
            return statesSaved;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`)
            throw ex;
        }
    }

    public addCities = async (createCitiesRequests: CreateCityRequest[]): Promise<City[]> => {
        this.eventTracer.say(`AddressService: Add City`)
        try{
            let citiesWithValidStaesQuery = createCitiesRequests.map(city => ({code: city.stateCode, countryCode: city.countryCode}));
            let validStates = await this.stateRepository.or(citiesWithValidStaesQuery);

            let validcities: City[] = [];
            for( let cityRequest of createCitiesRequests){
                let stateForcity = validStates.find(state => state.code === cityRequest.stateCode && state.countryCode === cityRequest.countryCode)
                if(!stateForcity){
                    
                } else{
                    let reconstructedCity = new City({name: cityRequest.name, code: cityRequest.code, state: stateForcity._id});
                    validcities.push(reconstructedCity)
                }
            };

            let existingCitiesORQuery = validcities.map(city => ({code: city.code, state: city.state}))
            
            let existingCities =existingCitiesORQuery.length ? await this.cityRepository.or(existingCitiesORQuery): [];

            let citiesToSave: City[] = []
            for(let city of validcities){
                let cityExists = existingCities.find(existingcity => existingcity.code === city.code && existingcity.state._id.toString() === city.state.toString())
                if(!cityExists){
                    citiesToSave.push(city)
                }
            }

            let citiesSaved = citiesToSave.length ? await this.cityRepository.addManyAsync(citiesToSave) : [];
            this.eventTracer.isSuccessWithResponseAndMessage(citiesSaved);
            return citiesSaved;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`)
            throw ex;
        }
    }

    public getOrCreateAddress = async (address: Address | Types.ObjectId | string): Promise<Address | null> => {
        if(address instanceof Types.ObjectId || typeof(address) === 'string'){
            address = new Types.ObjectId(address)
            return await this.addressRepository.getByIdAsync(address)
        }
        let {streetNo, street, extraDetails, phone, city} = address;
        let cityQuery = city as Partial<City>
        let savedCity: City;
        if(city instanceof Types.ObjectId){
            savedCity = await this.cityRepository.getByIdAsync(new Types.ObjectId(city))
            if(!savedCity){
                throw new NotFoundException(`City not found`)
            }
            
        }else{
            let state = await this.stateRepository.firstOrDefaultAsync({code: cityQuery.state})
            savedCity = await this.cityRepository.firstOrDefaultAsync({code: cityQuery.code, state: state?._id})
            if(!savedCity){
                throw new NotFoundException(`City not found`)
            }
        }

        let savedAddress = await this.addressRepository.firstOrDefaultAsync({streetNo, street, city: savedCity._id, phone, extraDetails})
        if(savedAddress){
            return savedAddress
        }
        address.city = savedCity._id
        return await this.addressRepository.addAsync(address)
    }
}