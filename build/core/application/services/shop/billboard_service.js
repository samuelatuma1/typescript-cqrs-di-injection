"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_tracer_1 = require("../../../application/contract/observability/event_tracer");
const tsyringe_1 = require("tsyringe");
const billboard_repository_1 = require("../../../application/contract/data_access/shop/billboard_repository");
const bill_board_1 = __importDefault(require("../../../domain/shop/entity/bill_board"));
const mongoose_1 = require("mongoose");
const object_utility_1 = __importDefault(require("../../../application/common/utilities/object_utility"));
const file_service_1 = require("../../../application/contract/services/files/file_service");
const not_found_exception_1 = __importDefault(require("../../../application/common/exceptions/not_found_exception"));
const out_of_range_exception_1 = __importDefault(require("../../../application/common/exceptions/out_of_range_exception"));
const billboard_validation_1 = require("./validations/billboard_validation");
const validation_exception_1 = __importDefault(require("../../../application/common/exceptions/validation_exception"));
let BillboardService = class BillboardService {
    eventTracer;
    billboardRepository;
    fileService;
    maxActiveBillBoard = 3;
    constructor(eventTracer, billboardRepository, fileService) {
        this.eventTracer = eventTracer;
        this.billboardRepository = billboardRepository;
        this.fileService = fileService;
    }
    createBillBoard = async (createBillboardRequest) => {
        try {
            // if billboard isActive
            const validationErrors = (new billboard_validation_1.CreateBillboardValidator()).validate(createBillboardRequest);
            if (object_utility_1.default.objectSize(validationErrors)) {
                throw new validation_exception_1.default(`Invalid create billboard request`, validationErrors);
            }
            this.eventTracer.request = createBillboardRequest;
            this.eventTracer.say("Billboard: Create Billboard");
            if (createBillboardRequest.img) {
                createBillboardRequest.img = await this.fileService.uploadFile(createBillboardRequest.img);
            }
            let billBoard = new bill_board_1.default({ ...createBillboardRequest, isActive: false });
            let response = await this.billboardRepository.addAsync(billBoard);
            this.eventTracer.isSuccessWithResponseAndMessage(response);
            return response;
            // save billboard 
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    updateBillBoard = async (id, update) => {
        try {
            this.eventTracer.say(`UpdateBillboard with id: ${id}`);
            let billBoardId = new mongoose_1.Types.ObjectId(id);
            let billBoard = await this.billboardRepository.getByIdAsync(billBoardId);
            if (!billBoard) {
                throw new not_found_exception_1.default(`Billboard with id ${id} not found`);
                // delete ex
            }
            let cleanedUpdate = object_utility_1.default.removeNullOrUndefinedValuesFromObject(update);
            this.eventTracer.request = cleanedUpdate;
            if (!billBoard.isActive && cleanedUpdate.isActive) { // we are trying to activate billboard, but we need only maxActiveBillBoard active at a time
                let activeBillBoardsCount = (await this.billboardRepository.getAsync({ isActive: true })).length;
                if (activeBillBoardsCount >= this.maxActiveBillBoard) {
                    throw new out_of_range_exception_1.default(`Maximum number of active billboards reached`);
                }
            }
            if (cleanedUpdate.img) { // we want to delete existing billboard image 
                await this.fileService.deleteFile(billBoard.img.public_id);
                cleanedUpdate.img = await this.fileService.uploadFile(cleanedUpdate.img);
            }
            await this.billboardRepository.updateByIdAsync(billBoardId, cleanedUpdate);
            let response = await this.billboardRepository.getByIdAsync(billBoardId);
            this.eventTracer.isSuccessWithResponseAndMessage(response);
            return response;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    deleteBillboard = async (id) => {
        let billboard = await this.billboardRepository.getByIdAsync(new mongoose_1.Types.ObjectId(id));
        if (billboard) { // we want to delete existing billboard image 
            await this.fileService.deleteFile(billboard?.img?.public_id);
            await this.billboardRepository.deleteAsync(billboard, true);
        }
        return billboard;
    };
    getActiveBillboards = async () => {
        return await this.billboardRepository.getAsync({ isActive: true });
    };
    getBillboard = async (id) => {
        id = new mongoose_1.Types.ObjectId(id);
        return await this.billboardRepository.getByIdAsync(id);
    };
    search = async (searchBillboardRequest) => {
        const cleanedSearch = object_utility_1.default.removeNullOrUndefinedValuesFromObject(searchBillboardRequest);
        const nestedSearch = {};
        if (cleanedSearch.desc) { // case insensitive desc search
            nestedSearch.desc = { $regex: cleanedSearch.desc, $options: "i" };
        }
        if (Object.hasOwn(cleanedSearch, 'isActive')) {
            if (typeof (cleanedSearch.isActive) === "boolean") {
            }
            else {
                switch (cleanedSearch.isActive.toLowerCase()) {
                    case 'true':
                        cleanedSearch.isActive = true;
                        break;
                    default:
                        cleanedSearch.isActive = false;
                        break;
                }
            }
        }
        let query = { ...cleanedSearch, ...nestedSearch };
        console.log({ query });
        return await this.billboardRepository.getAsync(query);
    };
};
BillboardService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __param(1, (0, tsyringe_1.inject)(billboard_repository_1.IIBillboardRepository)),
    __param(2, (0, tsyringe_1.inject)(file_service_1.IIFileService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], BillboardService);
exports.default = BillboardService;
//# sourceMappingURL=billboard_service.js.map