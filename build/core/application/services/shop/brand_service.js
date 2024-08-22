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
const brand_response_1 = require("../../../domain/shop/dto/responses/brand_response");
const brand_repository_1 = require("../../../application/contract/data_access/shop/brand_repository");
const event_tracer_1 = require("../../../application/contract/observability/event_tracer");
const brand_1 = __importDefault(require("../../../domain/shop/entity/brand"));
const mongoose_1 = require("mongoose");
const tsyringe_1 = require("tsyringe");
const file_service_1 = require("../../../application/contract/services/files/file_service");
let BrandService = class BrandService {
    eventTracer;
    brandRepository;
    fileService;
    constructor(eventTracer, brandRepository, fileService) {
        this.eventTracer = eventTracer;
        this.brandRepository = brandRepository;
        this.fileService = fileService;
    }
    convertBrandToBrandResponse = async (brand, options) => {
        return new brand_response_1.BrandResponse(brand);
    };
    createBrand = async (createBrandRequest) => {
        let brand = new brand_1.default(createBrandRequest);
        if (brand.mainImg) {
            brand.mainImg = await this.fileService.uploadFile(brand.mainImg);
        }
        let savedBrand = await this.brandRepository.addAsync(brand);
        return await this.convertBrandToBrandResponse(savedBrand);
    };
    getBrand = async (id) => {
        let brand = await this.brandRepository.getByIdAsync(new mongoose_1.Types.ObjectId(id));
        return await this.convertBrandToBrandResponse(brand);
    };
};
BrandService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __param(1, (0, tsyringe_1.inject)(brand_repository_1.IIBrandRepository)),
    __param(2, (0, tsyringe_1.inject)(file_service_1.IIFileService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], BrandService);
exports.default = BrandService;
//# sourceMappingURL=brand_service.js.map