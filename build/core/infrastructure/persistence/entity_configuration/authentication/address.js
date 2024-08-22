"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressModel = exports.cityModel = exports.stateModel = exports.countryModel = void 0;
const mongoose_1 = require("mongoose");
let countrySchema = new mongoose_1.Schema({
    name: String,
    code: { type: String }
});
let stateSchema = new mongoose_1.Schema({
    name: String,
    code: String,
    countryCode: String
});
let citySchema = new mongoose_1.Schema({
    name: String,
    code: String,
    state: mongoose_1.Schema.Types.ObjectId
});
let addressSchema = new mongoose_1.Schema({
    streetNo: { type: Number },
    street: { type: String },
    city: { type: mongoose_1.Schema.Types.ObjectId, ref: 'City' },
    extraDetails: { type: String },
    phone: { type: String }
});
exports.countryModel = (0, mongoose_1.model)('Country', countrySchema);
exports.stateModel = (0, mongoose_1.model)('State', stateSchema);
exports.cityModel = (0, mongoose_1.model)('City', citySchema);
exports.addressModel = (0, mongoose_1.model)('Address', addressSchema);
//# sourceMappingURL=address.js.map