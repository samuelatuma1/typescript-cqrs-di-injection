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
import UploadFile from "../../../common/model/upload_file";
import { FilterType } from "../../enum/filter_type";
export declare class CreateFilterRequest {
    name: string;
    filterType: FilterType;
    values: string[] | number[];
    categoryId: Types.ObjectId | null;
}
export declare class UpdateFilterRequest {
    _id: Types.ObjectId | string;
    name?: string;
    filterType?: FilterType;
    values?: string[] | number[];
}
export declare class CreateCategoryRequest {
    name: string;
    desc: string;
    urlName: string;
    img: UploadFile | null;
    parentCategory: Types.ObjectId | null;
    filters: CreateFilterRequest[];
}
