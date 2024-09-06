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
import Discount from "../../../../domain/shop/entity/discount";
import { Schema } from "mongoose";
export declare const DiscountSchema: Schema<Discount, import("mongoose").Model<Discount, any, any, any, import("mongoose").Document<unknown, any, Discount> & Discount & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Discount, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Discount>> & import("mongoose").FlatRecord<Discount> & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>;
export declare const Discountmodel: import("mongoose").Model<Discount, {}, {}, {}, import("mongoose").Document<unknown, {}, Discount> & Discount & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, Schema<Discount, import("mongoose").Model<Discount, any, any, any, import("mongoose").Document<unknown, any, Discount> & Discount & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Discount, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Discount>> & import("mongoose").FlatRecord<Discount> & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>>;
