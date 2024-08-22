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
import Catalogue from "../../../../../core/domain/shop/entity/catalogue";
import { Schema } from "mongoose";
export declare const catalogueSchema: Schema<Catalogue, import("mongoose").Model<Catalogue, any, any, any, import("mongoose").Document<unknown, any, Catalogue> & Catalogue & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Catalogue, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Catalogue>> & import("mongoose").FlatRecord<Catalogue> & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>;
export declare const catalogueModel: import("mongoose").Model<Catalogue, {}, {}, {}, import("mongoose").Document<unknown, {}, Catalogue> & Catalogue & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, Schema<Catalogue, import("mongoose").Model<Catalogue, any, any, any, import("mongoose").Document<unknown, any, Catalogue> & Catalogue & Required<{
    _id: import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Catalogue, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Catalogue>> & import("mongoose").FlatRecord<Catalogue> & Required<{
    _id: import("mongoose").Types.ObjectId;
}>>>;
