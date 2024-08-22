"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const city_repository_1 = require("../../../application/contract/data_access/authentication/city_repository");
const country_repository_1 = require("../../../application/contract/data_access/authentication/country_repository");
const state_repository_1 = require("../../../application/contract/data_access/authentication/state_repository");
const address_1 = require("../../../domain/authentication/entity/address");
const address_repository_1 = require("../../../application/contract/data_access/authentication/address_repository");
const event_tracer_1 = require("../../../application/contract/observability/event_tracer");
let AddressService = class AddressService {
    cityRepository;
    countryRepository;
    stateRepository;
    addressRepository;
    eventTracer;
    constructor(cityRepository, countryRepository, stateRepository, addressRepository, eventTracer) {
        this.cityRepository = cityRepository;
        this.countryRepository = countryRepository;
        this.stateRepository = stateRepository;
        this.addressRepository = addressRepository;
        this.eventTracer = eventTracer;
    }
    addCountries = async (createCountryRequests) => {
        this.eventTracer.say(`AddressService: Add Country`);
        try {
            let countryCodes = createCountryRequests.map(country => country.code);
            let existingCountriesWithCode = await this.countryRepository.contains({ code: countryCodes });
            let filteredCountryList = createCountryRequests.filter(country => !(existingCountriesWithCode.find(existingCountry => existingCountry.code === country.code)));
            const countries = filteredCountryList.map(country => new address_1.Country({ ...country }));
            let countriesSaved = await this.countryRepository.addManyAsync(countries);
            this.eventTracer.isSuccessWithResponseAndMessage(countriesSaved);
            return countriesSaved;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    addStates = async (createStatesRequests) => {
        this.eventTracer.say(`AddressService: Add State`);
        try {
            let countryCodes = [...new Set(createStatesRequests.map(state => state.countryCode))];
            let existingCountriesWithCode = await this.countryRepository.contains({ code: countryCodes });
            this.eventTracer.say(`country codes : ${countryCodes}`);
            let existingStatesOrQuery = createStatesRequests.map(stateRequest => ({ code: stateRequest.code, countryCode: stateRequest.countryCode }));
            let existingStates = await this.stateRepository.or(existingStatesOrQuery);
            let newStates = [];
            for (let state of createStatesRequests) { // Find a way to improve performance here
                let stateExists = existingStates.find(existingState => state.code === existingState.code && state.countryCode === existingState.countryCode);
                if (!stateExists) {
                    newStates.push(state);
                }
            }
            console.log({ existingStatesOrQuery, existingStates, newStates, existingCountriesWithCode });
            let newStatesWithValidCountryCode = newStates.filter(state => (existingCountriesWithCode.find(existingCountry => existingCountry.code === state.countryCode)));
            const states = newStatesWithValidCountryCode.map(state => new address_1.State({ ...state }));
            let statesSaved = await this.stateRepository.addManyAsync(states);
            this.eventTracer.isSuccessWithResponseAndMessage(statesSaved);
            return statesSaved;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    addCities = async (createCitiesRequests) => {
        this.eventTracer.say(`AddressService: Add City`);
        try {
            let citiesWithValidStaesQuery = createCitiesRequests.map(city => ({ code: city.stateCode, countryCode: city.countryCode }));
            let validStates = await this.stateRepository.or(citiesWithValidStaesQuery);
            let validcities = [];
            for (let cityRequest of createCitiesRequests) {
                let stateForcity = validStates.find(state => state.code === cityRequest.stateCode && state.countryCode === cityRequest.countryCode);
                if (!stateForcity) {
                }
                else {
                    let reconstructedCity = new address_1.City({ name: cityRequest.name, code: cityRequest.code, state: stateForcity._id });
                    validcities.push(reconstructedCity);
                }
            }
            ;
            let existingCitiesORQuery = validcities.map(city => ({ code: city.code, state: city.state }));
            let existingCities = existingCitiesORQuery.length ? await this.cityRepository.or(existingCitiesORQuery) : [];
            let citiesToSave = [];
            for (let city of validcities) {
                let cityExists = existingCities.find(existingcity => existingcity.code === city.code && existingcity.state._id.toString() === city.state.toString());
                if (!cityExists) {
                    citiesToSave.push(city);
                }
            }
            let citiesSaved = citiesToSave.length ? await this.cityRepository.addManyAsync(citiesToSave) : [];
            this.eventTracer.isSuccessWithResponseAndMessage(citiesSaved);
            return citiesSaved;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
};
AddressService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(city_repository_1.IICityRepository)),
    __param(1, (0, tsyringe_1.inject)(country_repository_1.IICountryRepository)),
    __param(2, (0, tsyringe_1.inject)(state_repository_1.IIStateRepository)),
    __param(3, (0, tsyringe_1.inject)(address_repository_1.IIAddressRepository)),
    __param(4, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], AddressService);
exports.default = AddressService;
//# sourceMappingURL=address_service.js.map