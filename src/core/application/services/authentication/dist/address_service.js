"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var tsyringe_1 = require("tsyringe");
var city_repository_1 = require("../../../application/contract/data_access/authentication/city_repository");
var country_repository_1 = require("../../../application/contract/data_access/authentication/country_repository");
var state_repository_1 = require("../../../application/contract/data_access/authentication/state_repository");
var address_1 = require("../../../domain/authentication/entity/address");
var address_repository_1 = require("../../../application/contract/data_access/authentication/address_repository");
var event_tracer_1 = require("../../../application/contract/observability/event_tracer");
var mongoose_1 = require("mongoose");
var not_found_exception_1 = require("../../../application/common/exceptions/not_found_exception");
var AddressService = /** @class */ (function () {
    function AddressService(cityRepository, countryRepository, stateRepository, addressRepository, eventTracer) {
        var _this = this;
        this.cityRepository = cityRepository;
        this.countryRepository = countryRepository;
        this.stateRepository = stateRepository;
        this.addressRepository = addressRepository;
        this.eventTracer = eventTracer;
        this.addCountries = function (createCountryRequests) { return __awaiter(_this, void 0, Promise, function () {
            var countryCodes, existingCountriesWithCode_1, filteredCountryList, countries, countriesSaved, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.eventTracer.say("AddressService: Add Country");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        countryCodes = createCountryRequests.map(function (country) { return country.code; });
                        return [4 /*yield*/, this.countryRepository.contains({ code: countryCodes })];
                    case 2:
                        existingCountriesWithCode_1 = _a.sent();
                        filteredCountryList = createCountryRequests.filter(function (country) { return !(existingCountriesWithCode_1.find(function (existingCountry) { return existingCountry.code === country.code; })); });
                        countries = filteredCountryList.map(function (country) { return new address_1.Country(__assign({}, country)); });
                        return [4 /*yield*/, this.countryRepository.addManyAsync(countries)];
                    case 3:
                        countriesSaved = _a.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(countriesSaved);
                        return [2 /*return*/, countriesSaved];
                    case 4:
                        ex_1 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_1);
                        throw ex_1;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.addStates = function (createStatesRequests) { return __awaiter(_this, void 0, Promise, function () {
            var countryCodes, existingCountriesWithCode_2, existingStatesOrQuery, existingStates, newStates, _loop_1, _i, createStatesRequests_1, state, newStatesWithValidCountryCode, states, statesSaved, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.eventTracer.say("AddressService: Add State");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        countryCodes = __spreadArrays(new Set(createStatesRequests.map(function (state) { return state.countryCode; })));
                        return [4 /*yield*/, this.countryRepository.contains({ code: countryCodes })];
                    case 2:
                        existingCountriesWithCode_2 = _a.sent();
                        this.eventTracer.say("country codes : " + countryCodes);
                        existingStatesOrQuery = createStatesRequests.map(function (stateRequest) { return ({ code: stateRequest.code, countryCode: stateRequest.countryCode }); });
                        return [4 /*yield*/, this.stateRepository.or(existingStatesOrQuery)];
                    case 3:
                        existingStates = _a.sent();
                        newStates = [];
                        _loop_1 = function (state) {
                            var stateExists = existingStates.find(function (existingState) { return state.code === existingState.code && state.countryCode === existingState.countryCode; });
                            if (!stateExists) {
                                newStates.push(state);
                            }
                        };
                        for (_i = 0, createStatesRequests_1 = createStatesRequests; _i < createStatesRequests_1.length; _i++) {
                            state = createStatesRequests_1[_i];
                            _loop_1(state);
                        }
                        console.log({ existingStatesOrQuery: existingStatesOrQuery, existingStates: existingStates, newStates: newStates, existingCountriesWithCode: existingCountriesWithCode_2 });
                        newStatesWithValidCountryCode = newStates.filter(function (state) { return (existingCountriesWithCode_2.find(function (existingCountry) { return existingCountry.code === state.countryCode; })); });
                        states = newStatesWithValidCountryCode.map(function (state) { return new address_1.State(__assign({}, state)); });
                        return [4 /*yield*/, this.stateRepository.addManyAsync(states)];
                    case 4:
                        statesSaved = _a.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(statesSaved);
                        return [2 /*return*/, statesSaved];
                    case 5:
                        ex_2 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_2);
                        throw ex_2;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.addCities = function (createCitiesRequests) { return __awaiter(_this, void 0, Promise, function () {
            var citiesWithValidStaesQuery, validStates, validcities, _loop_2, _i, createCitiesRequests_1, cityRequest, existingCitiesORQuery, existingCities, _a, citiesToSave, _loop_3, _b, validcities_1, city, citiesSaved, _c, ex_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.eventTracer.say("AddressService: Add City");
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 9, , 10]);
                        citiesWithValidStaesQuery = createCitiesRequests.map(function (city) { return ({ code: city.stateCode, countryCode: city.countryCode }); });
                        return [4 /*yield*/, this.stateRepository.or(citiesWithValidStaesQuery)];
                    case 2:
                        validStates = _d.sent();
                        validcities = [];
                        _loop_2 = function (cityRequest) {
                            var stateForcity = validStates.find(function (state) { return state.code === cityRequest.stateCode && state.countryCode === cityRequest.countryCode; });
                            if (!stateForcity) {
                            }
                            else {
                                var reconstructedCity = new address_1.City({ name: cityRequest.name, code: cityRequest.code, state: stateForcity._id });
                                validcities.push(reconstructedCity);
                            }
                        };
                        for (_i = 0, createCitiesRequests_1 = createCitiesRequests; _i < createCitiesRequests_1.length; _i++) {
                            cityRequest = createCitiesRequests_1[_i];
                            _loop_2(cityRequest);
                        }
                        ;
                        existingCitiesORQuery = validcities.map(function (city) { return ({ code: city.code, state: city.state }); });
                        if (!existingCitiesORQuery.length) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.cityRepository.or(existingCitiesORQuery)];
                    case 3:
                        _a = _d.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _a = [];
                        _d.label = 5;
                    case 5:
                        existingCities = _a;
                        citiesToSave = [];
                        _loop_3 = function (city) {
                            var cityExists = existingCities.find(function (existingcity) { return existingcity.code === city.code && existingcity.state._id.toString() === city.state.toString(); });
                            if (!cityExists) {
                                citiesToSave.push(city);
                            }
                        };
                        for (_b = 0, validcities_1 = validcities; _b < validcities_1.length; _b++) {
                            city = validcities_1[_b];
                            _loop_3(city);
                        }
                        if (!citiesToSave.length) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.cityRepository.addManyAsync(citiesToSave)];
                    case 6:
                        _c = _d.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        _c = [];
                        _d.label = 8;
                    case 8:
                        citiesSaved = _c;
                        this.eventTracer.isSuccessWithResponseAndMessage(citiesSaved);
                        return [2 /*return*/, citiesSaved];
                    case 9:
                        ex_3 = _d.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_3);
                        throw ex_3;
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.getOrCreateAddress = function (address) { return __awaiter(_this, void 0, Promise, function () {
            var streetNo, street, extraDetails, phone, city, cityQuery, savedCity, state, savedAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(address instanceof mongoose_1.Types.ObjectId || typeof (address) === 'string')) return [3 /*break*/, 2];
                        address = new mongoose_1.Types.ObjectId(address);
                        return [4 /*yield*/, this.addressRepository.getByIdAsync(address)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        streetNo = address.streetNo, street = address.street, extraDetails = address.extraDetails, phone = address.phone, city = address.city;
                        cityQuery = city;
                        if (!(city instanceof mongoose_1.Types.ObjectId)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.cityRepository.getByIdAsync(new mongoose_1.Types.ObjectId(city))];
                    case 3:
                        savedCity = _a.sent();
                        if (!savedCity) {
                            throw new not_found_exception_1["default"]("City not found");
                        }
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, this.stateRepository.firstOrDefaultAsync({ code: cityQuery.state })];
                    case 5:
                        state = _a.sent();
                        return [4 /*yield*/, this.cityRepository.firstOrDefaultAsync({ code: cityQuery.code, state: state === null || state === void 0 ? void 0 : state._id })];
                    case 6:
                        savedCity = _a.sent();
                        if (!savedCity) {
                            throw new not_found_exception_1["default"]("City not found");
                        }
                        _a.label = 7;
                    case 7: return [4 /*yield*/, this.addressRepository.firstOrDefaultAsync({ streetNo: streetNo, street: street, city: savedCity._id, phone: phone, extraDetails: extraDetails })];
                    case 8:
                        savedAddress = _a.sent();
                        if (savedAddress) {
                            return [2 /*return*/, savedAddress];
                        }
                        address.city = savedCity._id;
                        return [4 /*yield*/, this.addressRepository.addAsync(address)];
                    case 9: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
    }
    AddressService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(city_repository_1.IICityRepository)),
        __param(1, tsyringe_1.inject(country_repository_1.IICountryRepository)),
        __param(2, tsyringe_1.inject(state_repository_1.IIStateRepository)),
        __param(3, tsyringe_1.inject(address_repository_1.IIAddressRepository)),
        __param(4, tsyringe_1.inject(event_tracer_1.IIEventTracer))
    ], AddressService);
    return AddressService;
}());
exports["default"] = AddressService;
