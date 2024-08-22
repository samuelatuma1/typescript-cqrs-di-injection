import { CreateBrandRequest } from "../../../../domain/shop/dto/requests/brand_requests";
import { BrandResponse } from "../../../../domain/shop/dto/responses/brand_response";
import { Types } from "mongoose";

export default interface IBrandLogic {
    addProductsToBrand(brandId: string | Types.ObjectId, productsIds: string[] | Types.ObjectId[]): Promise<BrandResponse>;
    getBrand(brandId: Types.ObjectId | string, options?: {includeProducts: boolean, includeCategories: boolean, includeFilters: boolean}): Promise<BrandResponse>;
    createBrand(createBrandRequest: CreateBrandRequest) : Promise<BrandResponse>
}

export const IIBrandLogic = "IBrandLogic";