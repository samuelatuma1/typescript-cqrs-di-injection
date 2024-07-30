import AddressService from "../core/application/services/authentication/address_service";
import { iocContainer } from "../api/program";

let addressService = iocContainer.resolve(AddressService);

export default async function saveCitiesCountriesStates(){
    const savedCountries = await addressService.addCountries([{name: "Nigeria", code: "NGA"}])
    const savedStates = await addressService.addStates([{name: "Lagos", code: "LAG", countryCode: "NGA"}, {name: "Rivers", code: "RIV", countryCode: "NGA"}])
    const savedCities = await addressService.addCities([{name: "Lekki", code: "Lekki", stateCode: "LAG", countryCode: "NGA"}])
    console.log({savedCities, savedStates, savedCountries})
}
