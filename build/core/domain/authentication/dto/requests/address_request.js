"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCityRequest = exports.CreateStateRequest = exports.CreateCountryRequest = void 0;
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
//# sourceMappingURL=address_request.js.map