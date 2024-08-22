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
import { CreateBrandRequest } from "../../../../domain/shop/dto/requests/brand_requests";
import { BrandResponse } from "../../../../domain/shop/dto/responses/brand_response";
import { Types } from "mongoose";
export default interface IBrandLogic {
    addProductsToBrand(brandId: string | Types.ObjectId, productsIds: string[] | Types.ObjectId[]): Promise<BrandResponse>;
    getBrand(brandId: Types.ObjectId | string, options?: {
        includeProducts: boolean;
        includeCategories: boolean;
        includeFilters: boolean;
    }): Promise<BrandResponse>;
    createBrand(createBrandRequest: CreateBrandRequest): Promise<BrandResponse>;
}
export declare const IIBrandLogic = "IBrandLogic";
