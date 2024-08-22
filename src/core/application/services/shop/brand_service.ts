import { BrandResponse } from "../../../domain/shop/dto/responses/brand_response";
import IBrandRepository, { IIBrandRepository } from "../../../application/contract/data_access/shop/brand_repository";
import IEventTracer, { IIEventTracer } from "../../../application/contract/observability/event_tracer";
import IBrandService from "../../../application/contract/services/shop/brand_service";
import Brand from "../../../domain/shop/entity/brand";
import { Types } from "mongoose";
import { inject, injectable } from "tsyringe";
import { CreateBrandRequest } from "../../../domain/shop/dto/requests/brand_requests";
import IFileService, { IIFileService } from "../../../application/contract/services/files/file_service";


@injectable()
export default class BrandService implements IBrandService {

    
    public constructor(
        @inject(IIEventTracer)private readonly eventTracer: IEventTracer,
        @inject(IIBrandRepository)private readonly brandRepository: IBrandRepository,
        @inject(IIFileService)private readonly fileService: IFileService
    ){

    }

    private convertBrandToBrandResponse = async (brand: Brand, options?: {}): Promise<BrandResponse> => {
        return new BrandResponse(brand)
    }

    public createBrand = async (createBrandRequest: CreateBrandRequest) : Promise<BrandResponse> => {
        let brand = new Brand(createBrandRequest);
        if(brand.mainImg){
            brand.mainImg = await this.fileService.uploadFile(brand.mainImg);
        }
        let savedBrand = await this.brandRepository.addAsync(brand);
        return await this.convertBrandToBrandResponse(savedBrand);

    }   

    public getBrand = async (id: Types.ObjectId ): Promise<BrandResponse> => {
        let brand = await this.brandRepository.getByIdAsync(new Types.ObjectId(id));
        return await this.convertBrandToBrandResponse(brand);
    }
}