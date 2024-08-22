/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import BaseEntity from "../../../domain/common/entity/base_entity";
import { Types } from "mongoose";
interface CountryInit {
    name: string;
    code: string;
}
interface StateInit {
    name: string;
    code: string;
    countryCode: string;
}
interface CityInit {
    name: string;
    code: string;
    state: Types.ObjectId;
}
export declare class Country extends BaseEntity<Types.ObjectId> {
    name: string;
    code: string;
    constructor(init: CountryInit);
}
export declare class State extends BaseEntity<Types.ObjectId> {
    name: string;
    code: string;
    countryCode: string | Country;
    constructor(init: StateInit);
}
export declare class City extends BaseEntity<Types.ObjectId> {
    name: string;
    code: string;
    state: Types.ObjectId | State;
    constructor(init: CityInit);
}
export default class Address extends BaseEntity<Types.ObjectId> {
    streetNo: number;
    street: string;
    city: Types.ObjectId | City;
    extraDetails: string;
    phone: string;
}
export {};
