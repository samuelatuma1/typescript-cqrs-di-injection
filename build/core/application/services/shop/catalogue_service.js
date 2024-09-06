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
const catalogue_response_1 = __importDefault(require("../../../domain/shop/dto/responses/catalogue_response"));
const mongoose_1 = require("mongoose");
const tsyringe_1 = require("tsyringe");
const event_tracer_1 = require("../../../application/contract/observability/event_tracer");
const catalogue_1 = __importDefault(require("../../..//domain/shop/entity/catalogue"));
const file_service_1 = require("../../../application/contract/services/files/file_service");
const catalogue_repository_1 = require("../../../application/contract/data_access/shop/catalogue_repository");
const object_utility_1 = __importDefault(require("../../../application/common/utilities/object_utility"));
const not_found_exception_1 = __importDefault(require("../../../application/common/exceptions/not_found_exception"));
let CatalogueService = class CatalogueService {
    eventTracer;
    fileService;
    catalogueRepository;
    constructor(eventTracer, fileService, catalogueRepository) {
        this.eventTracer = eventTracer;
        this.fileService = fileService;
        this.catalogueRepository = catalogueRepository;
    }
    convertCatalogueToCatalogueResponse = (catalogue) => {
        return new catalogue_response_1.default(catalogue);
    };
    createCatalogue = async (createCatalogueRequest) => {
        try {
            this.eventTracer.say(`Create Catalogue`);
            this.eventTracer.request = createCatalogueRequest;
            let catalogue = new catalogue_1.default(createCatalogueRequest);
            if (catalogue.mainImg) {
                this.eventTracer.say(`Saving image for catalogue`);
                catalogue.mainImg = await this.fileService.uploadFile(catalogue.mainImg);
            }
            let savedCatalogue = await this.catalogueRepository.addAsync(catalogue);
            let response = this.convertCatalogueToCatalogueResponse(savedCatalogue);
            this.eventTracer.isSuccessWithResponseAndMessage(response);
            return response;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    updateCatalogue = async (catalogueId, updateCatalogue) => {
        try {
            this.eventTracer.say(`Update catalogue: ${catalogueId}`);
            this.eventTracer.request = updateCatalogue;
            catalogueId = new mongoose_1.Types.ObjectId(catalogueId);
            let cleanedUpdateCatalogue = object_utility_1.default.removeNullOrUndefinedValuesFromObject(updateCatalogue);
            let catalogue = await this.catalogueRepository.getByIdAsync(catalogueId);
            if (!catalogue) {
                throw new not_found_exception_1.default(`Catalogue with id ${catalogueId} not found`);
            }
            if (cleanedUpdateCatalogue.mainImg) {
                this.eventTracer.say(`Deleting existing image, uploading image`);
                await this.fileService.deleteFile(catalogue.mainImg?.public_id);
                cleanedUpdateCatalogue.mainImg = await this.fileService.uploadFile(cleanedUpdateCatalogue.mainImg);
            }
            await this.catalogueRepository.updateByIdAsync(catalogueId, cleanedUpdateCatalogue);
            let response = this.convertCatalogueToCatalogueResponse(await this.catalogueRepository.getByIdAsync(catalogueId));
            this.eventTracer.isSuccessWithResponseAndMessage(response);
            return response;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    getCatalogues = async (query) => {
        let cleanedQuery = object_utility_1.default.removeNullOrUndefinedValuesFromObject(query);
        console.log({ cleanedQuery });
        let response = await this.catalogueRepository.getAsync(cleanedQuery);
        return response.map(this.convertCatalogueToCatalogueResponse);
    };
    featureCatalogues = async (catelogueIds, feature) => {
        console.log({ feature });
        await this.catalogueRepository.updateIsFeaturedStatus(catelogueIds, feature);
        let resp = await this.catalogueRepository.contains({ _id: catelogueIds });
        let cataloguesResponse = resp.map(this.convertCatalogueToCatalogueResponse);
        return cataloguesResponse;
    };
    addProductsToCatalogue = async (addProductsToCatalogueRequest) => {
        let catalogue = await this.catalogueRepository.getByIdAsync(addProductsToCatalogueRequest.catalogueId);
        if (!catalogue) {
            throw new not_found_exception_1.default(`Catalogue with id ${addProductsToCatalogueRequest.catalogueId} not found`);
        }
        await this.catalogueRepository.addToFieldsList({ _id: addProductsToCatalogueRequest.catalogueId }, { products: addProductsToCatalogueRequest.productIds.map(pred => new mongoose_1.Types.ObjectId(pred)) });
        return this.convertCatalogueToCatalogueResponse(await this.catalogueRepository.getByIdAsync(addProductsToCatalogueRequest.catalogueId));
    };
    removeProductsFromCatalogue = async (removeProductsFromCatalogueRequest) => {
        let catalogue = await this.catalogueRepository.getByIdAsync(removeProductsFromCatalogueRequest.catalogueId);
        if (!catalogue) {
            throw new not_found_exception_1.default(`Catalogue with id ${removeProductsFromCatalogueRequest.catalogueId} not found`);
        }
        await this.catalogueRepository.removeFromFieldsList({ _id: removeProductsFromCatalogueRequest.catalogueId }, { products: removeProductsFromCatalogueRequest.productIds });
        return this.convertCatalogueToCatalogueResponse(await this.catalogueRepository.getByIdAsync(removeProductsFromCatalogueRequest.catalogueId));
    };
    getProductsCatalogues = async (productIds) => {
        return (await this.catalogueRepository.contains({ products: productIds })).map(this.convertCatalogueToCatalogueResponse);
    };
};
CatalogueService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __param(1, (0, tsyringe_1.inject)(file_service_1.IIFileService)),
    __param(2, (0, tsyringe_1.inject)(catalogue_repository_1.IICatalogueRepository)),
    __metadata("design:paramtypes", [Object, Object, Object])
], CatalogueService);
exports.default = CatalogueService;
//# sourceMappingURL=catalogue_service.js.map