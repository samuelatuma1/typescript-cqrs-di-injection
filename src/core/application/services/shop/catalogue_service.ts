import { CreateCatalogueRequest, AddProductsToCatalogueRequest, RemoveProductsToCatalogueRequest, UpdateCatalogueRequest, QueryCatalogue } from "../../../domain/shop/dto/requests/catalogue_requests";
import CatalogueResponse from "../../../domain/shop/dto/responses/catalogue_response";
import { Types } from "mongoose";
import ICatalogueService from "../../../application/contract/services/shop/catalogue_service";
import { inject, injectable } from "tsyringe";
import IEventTracer, { IIEventTracer } from "../../../application/contract/observability/event_tracer";
import Catalogue from "../../..//domain/shop/entity/catalogue";
import IFileService, { IIFileService } from "../../../application/contract/services/files/file_service";
import ICatalogueRepository, { IICatalogueRepository } from "../../../application/contract/data_access/shop/catalogue_repository";
import ObjectUtility from "../../../application/common/utilities/object_utility";
import NotFoundException from "../../../application/common/exceptions/not_found_exception";

@injectable()
export default class CatalogueService implements ICatalogueService{
    public constructor(
        @inject(IIEventTracer) private readonly eventTracer: IEventTracer,
        @inject(IIFileService) private readonly fileService: IFileService,
        @inject(IICatalogueRepository) private readonly catalogueRepository: ICatalogueRepository
    ){

    }
    convertCatalogueToCatalogueResponse =  (catalogue: Catalogue): CatalogueResponse => {
        return new CatalogueResponse(catalogue);
    }
    createCatalogue = async (createCatalogueRequest: CreateCatalogueRequest): Promise<CatalogueResponse> => {

        try{
            this.eventTracer.say(`Create Catalogue`);
            this.eventTracer.request = createCatalogueRequest;
            let catalogue = new Catalogue(createCatalogueRequest);
            if(catalogue.mainImg){
                this.eventTracer.say(`Saving image for catalogue`);
                catalogue.mainImg = await this.fileService.uploadFile(catalogue.mainImg);
            }
            let savedCatalogue = await this.catalogueRepository.addAsync(catalogue);
            let response =  this.convertCatalogueToCatalogueResponse(savedCatalogue);

            this.eventTracer.isSuccessWithResponseAndMessage(response);
            return response;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }

    updateCatalogue = async (catalogueId: Types.ObjectId | string, updateCatalogue: UpdateCatalogueRequest): Promise<CatalogueResponse> => {
        try{
            this.eventTracer.say(`Update catalogue: ${catalogueId}`)
            this.eventTracer.request = updateCatalogue;
            catalogueId = new Types.ObjectId(catalogueId);
            let cleanedUpdateCatalogue = ObjectUtility.removeNullOrUndefinedValuesFromObject(updateCatalogue);
            let catalogue = await this.catalogueRepository.getByIdAsync(catalogueId);
            if(!catalogue){
                throw new NotFoundException(`Catalogue with id ${catalogueId} not found`);
            }

            if(cleanedUpdateCatalogue.mainImg){
                this.eventTracer.say(`Deleting existing image, uploading image`)
                await this.fileService.deleteFile(catalogue.mainImg?.public_id);
                cleanedUpdateCatalogue.mainImg = await this.fileService.uploadFile(cleanedUpdateCatalogue.mainImg);
            }
            await this.catalogueRepository.updateByIdAsync(catalogueId, cleanedUpdateCatalogue);
            let response =  this.convertCatalogueToCatalogueResponse(await this.catalogueRepository.getByIdAsync(catalogueId));
            this.eventTracer.isSuccessWithResponseAndMessage(response);
            return response;
        } catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }

    getCatalogues = async (query: QueryCatalogue): Promise<CatalogueResponse[]> => {
        let cleanedQuery = ObjectUtility.removeNullOrUndefinedValuesFromObject(query);
        console.log({cleanedQuery})
        let response = await this.catalogueRepository.getAsync(cleanedQuery);
        return response.map(this.convertCatalogueToCatalogueResponse);
    }
    featureCatalogues = async (catelogueIds: Types.ObjectId[], feature: boolean): Promise<CatalogueResponse[]> => {
        console.log({feature})
        await this.catalogueRepository.updateIsFeaturedStatus(catelogueIds, feature);
        let resp = await this.catalogueRepository.contains({_id: catelogueIds});
        let cataloguesResponse = resp.map(this.convertCatalogueToCatalogueResponse);
        return cataloguesResponse;
    }
    addProductsToCatalogue = async (addProductsToCatalogueRequest: AddProductsToCatalogueRequest): Promise<CatalogueResponse> => {
        let catalogue = await this.catalogueRepository.getByIdAsync(addProductsToCatalogueRequest.catalogueId);
        if(!catalogue){
            throw new NotFoundException(`Catalogue with id ${addProductsToCatalogueRequest.catalogueId} not found`);
        }
        await this.catalogueRepository.addToFieldsList({_id: addProductsToCatalogueRequest.catalogueId}, {products: addProductsToCatalogueRequest.productIds.map(pred => new Types.ObjectId(pred)) })
        return this.convertCatalogueToCatalogueResponse(await this.catalogueRepository.getByIdAsync(addProductsToCatalogueRequest.catalogueId));
    }
    removeProductsFromCatalogue = async (removeProductsFromCatalogueRequest: RemoveProductsToCatalogueRequest): Promise<CatalogueResponse> => {
        let catalogue = await this.catalogueRepository.getByIdAsync(removeProductsFromCatalogueRequest.catalogueId);
        if(!catalogue){
            throw new NotFoundException(`Catalogue with id ${removeProductsFromCatalogueRequest.catalogueId} not found`);
        }
        await this.catalogueRepository.removeFromFieldsList({_id: removeProductsFromCatalogueRequest.catalogueId}, {products: removeProductsFromCatalogueRequest.productIds })
        return this.convertCatalogueToCatalogueResponse(await this.catalogueRepository.getByIdAsync(removeProductsFromCatalogueRequest.catalogueId));
    }

    getProductsCatalogues = async (productIds: Types.ObjectId[]): Promise<CatalogueResponse[]> => {
        return (await this.catalogueRepository.contains({products: productIds})).map(this.convertCatalogueToCatalogueResponse)
    }

}
