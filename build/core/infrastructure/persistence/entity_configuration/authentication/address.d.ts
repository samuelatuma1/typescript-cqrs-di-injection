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
import Address, { City, Country, State } from "../../../../domain/authentication/entity/address";
import { Schema } from "mongoose";
export declare const countryModel: import("mongoose").Model<Country, {}, {}, {}, import("mongoose").Document<unknown, {}, Country> & Country & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, Schema<Country, import("mongoose").Model<Country, any, any, any, import("mongoose").Document<unknown, any, Country> & Country & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Country, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Country>> & import("mongoose").FlatRecord<Country> & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>>;
export declare const stateModel: import("mongoose").Model<State, {}, {}, {}, import("mongoose").Document<unknown, {}, State> & State & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, Schema<State, import("mongoose").Model<State, any, any, any, import("mongoose").Document<unknown, any, State> & State & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, State, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<State>> & import("mongoose").FlatRecord<State> & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>>;
export declare const cityModel: import("mongoose").Model<City, {}, {}, {}, import("mongoose").Document<unknown, {}, City> & City & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, Schema<City, import("mongoose").Model<City, any, any, any, import("mongoose").Document<unknown, any, City> & City & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, City, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<City>> & import("mongoose").FlatRecord<City> & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>>;
export declare const addressModel: import("mongoose").Model<Address, {}, {}, {}, import("mongoose").Document<unknown, {}, Address> & Address & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, Schema<Address, import("mongoose").Model<Address, any, any, any, import("mongoose").Document<unknown, any, Address> & Address & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Address, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Address>> & import("mongoose").FlatRecord<Address> & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>>;
