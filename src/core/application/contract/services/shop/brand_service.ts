import { CreateBrandRequest } from "../../../../domain/shop/dto/requests/brand_requests";
import { BrandResponse } from "../../../../domain/shop/dto/responses/brand_response";
import { Types } from "mongoose";

export default interface IBrandService{
    createBrand(createBrandRequest: CreateBrandRequest) : Promise<BrandResponse>;
    getBrand (id: Types.ObjectId ): Promise<BrandResponse>;
    
}

export const IIBrandService = 'IBrandService'