"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_service_1 = __importDefault(require("../core/application/services/authentication/address_service"));
const program_1 = require("../api/program");
let addressService = program_1.iocContainer.resolve(address_service_1.default);
async function saveCitiesCountriesStates() {
    const savedCountries = await addressService.addCountries([{ name: "Nigeria", code: "NGA" }]);
    const savedStates = await addressService.addStates([{ name: "Lagos", code: "LAG", countryCode: "NGA" }, { name: "Rivers", code: "RIV", countryCode: "NGA" }]);
    const savedCities = await addressService.addCities([{ name: "Lekki", code: "Lekki", stateCode: "LAG", countryCode: "NGA" }]);
    console.log({ savedCities, savedStates, savedCountries });
}
exports.default = saveCitiesCountriesStates;
//# sourceMappingURL=0001_save_cities.js.map