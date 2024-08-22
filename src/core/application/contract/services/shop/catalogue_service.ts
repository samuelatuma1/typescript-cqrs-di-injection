import { Types } from "mongoose";
import { AddProductsToCatalogueRequest, CreateCatalogueRequest, QueryCatalogue, RemoveProductsToCatalogueRequest, UpdateCatalogueRequest } from "../../../../domain/shop/dto/requests/catalogue_requests";
import CatalogueResponse from "../../../../domain/shop/dto/responses/catalogue_response";


export default interface ICatalogueService {
    createCatalogue(createCatalogueRequest : CreateCatalogueRequest) : Promise<CatalogueResponse>;
    updateCatalogue(catalogueId: Types.ObjectId | string, updateCatalogue: UpdateCatalogueRequest): Promise<CatalogueResponse>
    featureCatalogues(catelogueIds : Types.ObjectId[], feature: boolean) : Promise<CatalogueResponse[]>;
    getCatalogues(query: QueryCatalogue): Promise<CatalogueResponse[]>;
    addProductsToCatalogue(addProductsToCatalogueRequest: AddProductsToCatalogueRequest): Promise<CatalogueResponse>;
    removeProductsFromCatalogue(addProductsToCatalogueRequest: RemoveProductsToCatalogueRequest): Promise<CatalogueResponse>;
    getProductsCatalogues(productIds: Types.ObjectId[]): Promise<CatalogueResponse[]>
}

export const IICatalogueService = "ICatalogueService";