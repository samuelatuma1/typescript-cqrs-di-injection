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
import BaseEntity from "../../common/entity/base_entity";
import { FilterType } from "../enum/filter_type";
type FilterInit = {
    name?: string;
    categoryId?: Types.ObjectId | null;
    filterType?: FilterType;
    values?: string[] | number[];
};
export declare class Filter extends BaseEntity<Types.ObjectId> {
    name: string;
    categoryId: Types.ObjectId;
    filterType: FilterType | string;
    values: string[] | number[];
    constructor(name: string, categoryId?: Types.ObjectId | null, filterType?: FilterType, values?: string[] | number[]);
    constructor(init: FilterInit);
}
export {};
