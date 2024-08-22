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
import { BrandResponse } from "../../../domain/shop/dto/responses/brand_response";
import IBrandRepository from "../../../application/contract/data_access/shop/brand_repository";
import IEventTracer from "../../../application/contract/observability/event_tracer";
import IBrandService from "../../../application/contract/services/shop/brand_service";
import { Types } from "mongoose";
import { CreateBrandRequest } from "../../../domain/shop/dto/requests/brand_requests";
import IFileService from "../../../application/contract/services/files/file_service";
export default class BrandService implements IBrandService {
    private readonly eventTracer;
    private readonly brandRepository;
    private readonly fileService;
    constructor(eventTracer: IEventTracer, brandRepository: IBrandRepository, fileService: IFileService);
    private convertBrandToBrandResponse;
    createBrand: (createBrandRequest: CreateBrandRequest) => Promise<BrandResponse>;
    getBrand: (id: Types.ObjectId) => Promise<BrandResponse>;
}
