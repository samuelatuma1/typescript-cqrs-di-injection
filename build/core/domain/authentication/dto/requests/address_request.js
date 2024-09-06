"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryCity = exports.CreateCityRequest = exports.CreateStateRequest = exports.CreateCountryRequest = void 0;
class CreateCountryRequest {
    name;
    code;
}
exports.CreateCountryRequest = CreateCountryRequest;
class CreateStateRequest {
    name;
    code;
    countryCode;
}
exports.CreateStateRequest = CreateStateRequest;
class CreateCityRequest {
    name;
    code;
    stateCode;
    countryCode;
}
exports.CreateCityRequest = CreateCityRequest;
class QueryCity {
    name;
    code;
    stateCode;
    countryCode;
    _id;
}
exports.QueryCity = QueryCity;
//# sourceMappingURL=address_request.js.map