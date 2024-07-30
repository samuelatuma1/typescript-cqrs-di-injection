import Address, { City, Country, State } from "../../../../domain/authentication/entity/address";
import { model, Schema } from "mongoose";


let countrySchema = new Schema<Country>( {
    name: String,
    code: {type: String}
})


let stateSchema = new Schema<State>( {
    name: String,
    code: String,
    countryCode: String
})

let citySchema = new Schema<City>( {
    name: String,
    code: String,
    state: Schema.Types.ObjectId
})
let addressSchema = new Schema<Address>({
    streetNo: {type: Number},
    street: {type: String},
    city: {type: Schema.Types.ObjectId, ref: 'City'},
    extraDetails: {type: String},
    phone: {type: String}
})

export const countryModel = model('Country', countrySchema);
export const stateModel = model('State', stateSchema);
export const cityModel = model('City', citySchema);
export const addressModel = model('Address', addressSchema);