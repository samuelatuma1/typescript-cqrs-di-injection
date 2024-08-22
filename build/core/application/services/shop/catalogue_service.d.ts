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
import { CreateCatalogueRequest, AddProductsToCatalogueRequest, RemoveProductsToCatalogueRequest, UpdateCatalogueRequest, QueryCatalogue } from "../../../domain/shop/dto/requests/catalogue_requests";
import CatalogueResponse from "../../../domain/shop/dto/responses/catalogue_response";
import { Types } from "mongoose";
import ICatalogueService from "../../../application/contract/services/shop/catalogue_service";
import IEventTracer from "../../../application/contract/observability/event_tracer";
import Catalogue from "../../..//domain/shop/entity/catalogue";
import IFileService from "../../../application/contract/services/files/file_service";
import ICatalogueRepository from "../../../application/contract/data_access/shop/catalogue_repository";
export default class CatalogueService implements ICatalogueService {
    private readonly eventTracer;
    private readonly fileService;
    private readonly catalogueRepository;
    constructor(eventTracer: IEventTracer, fileService: IFileService, catalogueRepository: ICatalogueRepository);
    convertCatalogueToCatalogueResponse: (catalogue: Catalogue) => CatalogueResponse;
    createCatalogue: (createCatalogueRequest: CreateCatalogueRequest) => Promise<CatalogueResponse>;
    updateCatalogue: (catalogueId: Types.ObjectId | string, updateCatalogue: UpdateCatalogueRequest) => Promise<CatalogueResponse>;
    getCatalogues: (query: QueryCatalogue) => Promise<CatalogueResponse[]>;
    featureCatalogues: (catelogueIds: Types.ObjectId[], feature: boolean) => Promise<CatalogueResponse[]>;
    addProductsToCatalogue: (addProductsToCatalogueRequest: AddProductsToCatalogueRequest) => Promise<CatalogueResponse>;
    removeProductsFromCatalogue: (removeProductsFromCatalogueRequest: RemoveProductsToCatalogueRequest) => Promise<CatalogueResponse>;
    getProductsCatalogues: (productIds: Types.ObjectId[]) => Promise<CatalogueResponse[]>;
}
