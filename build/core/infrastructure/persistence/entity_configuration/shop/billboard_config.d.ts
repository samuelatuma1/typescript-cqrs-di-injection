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
import Billboard from "core/domain/shop/entity/bill_board";
import { Schema } from "mongoose";
export declare const BillboardSchema: Schema<Billboard, import("mongoose").Model<Billboard, any, any, any, import("mongoose").Document<unknown, any, Billboard> & Billboard & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Billboard, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Billboard>> & import("mongoose").FlatRecord<Billboard> & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>;
export declare const billboardModel: import("mongoose").Model<Billboard, {}, {}, {}, import("mongoose").Document<unknown, {}, Billboard> & Billboard & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, Schema<Billboard, import("mongoose").Model<Billboard, any, any, any, import("mongoose").Document<unknown, any, Billboard> & Billboard & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Billboard, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Billboard>> & import("mongoose").FlatRecord<Billboard> & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>>;
