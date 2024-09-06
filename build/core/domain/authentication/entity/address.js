"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.City = exports.State = exports.Country = void 0;
const base_entity_1 = __importDefault(require("../../../domain/common/entity/base_entity"));
const mongoose_1 = require("mongoose");
class Country extends base_entity_1.default {
    name;
    code;
    constructor(init) {
        super(new mongoose_1.Types.ObjectId());
        this.name = init.name;
        this.code = init.code;
    }
}
exports.Country = Country;
class State extends base_entity_1.default {
    name;
    code;
    countryCode;
    constructor(init) {
        super(new mongoose_1.Types.ObjectId());
        this.name = init.name;
        this.code = init.code;
        this.countryCode = init.countryCode;
    }
}
exports.State = State;
class City extends base_entity_1.default {
    name;
    code;
    state;
    constructor(init) {
        super(new mongoose_1.Types.ObjectId());
        this.name = init.name;
        this.code = init.code;
        this.state = init.state;
    }
}
exports.City = City;
class Address extends base_entity_1.default {
    streetNo;
    street;
    city;
    extraDetails = "";
    phone = "";
}
exports.default = Address;
//# sourceMappingURL=address.js.map