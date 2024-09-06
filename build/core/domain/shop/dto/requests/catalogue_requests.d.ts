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
import { Types } from "mongoose";
import UploadFile from "../../../../domain/common/model/upload_file";
export declare class CreateCatalogueRequest {
    isFeatured: boolean;
    title: string;
    desc: string;
    mainImg: UploadFile;
}
export declare class UpdateCatalogueRequest {
    isFeatured?: boolean;
    title?: string;
    desc?: string;
    mainImg?: UploadFile;
}
export declare class QueryCatalogue {
    isFeatured?: boolean | string;
    title?: string;
    desc?: string;
    mainImg?: UploadFile;
}
export declare class AddProductsToCatalogueRequest {
    catalogueId: Types.ObjectId;
    productIds: Types.ObjectId[];
}
export declare class RemoveProductsToCatalogueRequest {
    catalogueId: Types.ObjectId;
    productIds: Types.ObjectId[];
}
