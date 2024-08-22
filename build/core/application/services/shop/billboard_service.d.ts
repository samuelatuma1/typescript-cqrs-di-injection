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
import IEventTracer from "../../../application/contract/observability/event_tracer";
import { IBillboardService } from "../../../application/contract/services/shop/billboard_service";
import IBillboardRepository from "../../../application/contract/data_access/shop/billboard_repository";
import Billboard from "../../../domain/shop/entity/bill_board";
import { Types } from "mongoose";
import IFileService from "../../../application/contract/services/files/file_service";
import { CreateBillboardRequest, SearchBillboardRequest, UpdateBillboardRequest } from "../../../domain/shop/dto/requests/billboard_requests";
export default class BillboardService implements IBillboardService {
    private readonly eventTracer;
    private readonly billboardRepository;
    private readonly fileService;
    private maxActiveBillBoard;
    constructor(eventTracer: IEventTracer, billboardRepository: IBillboardRepository, fileService: IFileService);
    createBillBoard: (createBillboardRequest: CreateBillboardRequest) => Promise<Billboard>;
    updateBillBoard: (id: string | Types.ObjectId, update: UpdateBillboardRequest) => Promise<Billboard>;
    deleteBillboard: (id: string | Types.ObjectId) => Promise<Billboard>;
    getActiveBillboards: () => Promise<Billboard[]>;
    getBillboard: (id: Types.ObjectId | string) => Promise<Billboard | null>;
    search: (searchBillboardRequest: SearchBillboardRequest) => Promise<Billboard[]>;
}
