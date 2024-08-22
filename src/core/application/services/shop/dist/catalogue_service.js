"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var catalogue_response_1 = require("../../../domain/shop/dto/responses/catalogue_response");
var mongoose_1 = require("mongoose");
var tsyringe_1 = require("tsyringe");
var event_tracer_1 = require("../../../application/contract/observability/event_tracer");
var catalogue_1 = require("../../..//domain/shop/entity/catalogue");
var file_service_1 = require("../../../application/contract/services/files/file_service");
var catalogue_repository_1 = require("../../../application/contract/data_access/shop/catalogue_repository");
var object_utility_1 = require("../../../application/common/utilities/object_utility");
var not_found_exception_1 = require("../../../application/common/exceptions/not_found_exception");
var CatalogueService = /** @class */ (function () {
    function CatalogueService(eventTracer, fileService, catalogueRepository) {
        var _this = this;
        this.eventTracer = eventTracer;
        this.fileService = fileService;
        this.catalogueRepository = catalogueRepository;
        this.convertCatalogueToCatalogueResponse = function (catalogue) {
            return new catalogue_response_1["default"](catalogue);
        };
        this.createCatalogue = function (createCatalogueRequest) { return __awaiter(_this, void 0, Promise, function () {
            var catalogue, _a, savedCatalogue, response, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        this.eventTracer.say("Create Catalogue");
                        this.eventTracer.request = createCatalogueRequest;
                        catalogue = new catalogue_1["default"](createCatalogueRequest);
                        if (!catalogue.mainImg) return [3 /*break*/, 2];
                        this.eventTracer.say("Saving image for catalogue");
                        _a = catalogue;
                        return [4 /*yield*/, this.fileService.uploadFile(catalogue.mainImg)];
                    case 1:
                        _a.mainImg = _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this.catalogueRepository.addAsync(catalogue)];
                    case 3:
                        savedCatalogue = _b.sent();
                        response = this.convertCatalogueToCatalogueResponse(savedCatalogue);
                        this.eventTracer.isSuccessWithResponseAndMessage(response);
                        return [2 /*return*/, response];
                    case 4:
                        ex_1 = _b.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_1);
                        throw ex_1;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.updateCatalogue = function (catalogueId, updateCatalogue) { return __awaiter(_this, void 0, Promise, function () {
            var cleanedUpdateCatalogue, catalogue, _a, response, _b, ex_2;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 7, , 8]);
                        this.eventTracer.say("Update catalogue: " + catalogueId);
                        this.eventTracer.request = updateCatalogue;
                        catalogueId = new mongoose_1.Types.ObjectId(catalogueId);
                        cleanedUpdateCatalogue = object_utility_1["default"].removeNullOrUndefinedValuesFromObject(updateCatalogue);
                        return [4 /*yield*/, this.catalogueRepository.getByIdAsync(catalogueId)];
                    case 1:
                        catalogue = _d.sent();
                        if (!catalogue) {
                            throw new not_found_exception_1["default"]("Catalogue with id " + catalogueId + " not found");
                        }
                        if (!cleanedUpdateCatalogue.mainImg) return [3 /*break*/, 4];
                        this.eventTracer.say("Deleting existing image, uploading image");
                        return [4 /*yield*/, this.fileService.deleteFile((_c = catalogue.mainImg) === null || _c === void 0 ? void 0 : _c.public_id)];
                    case 2:
                        _d.sent();
                        _a = cleanedUpdateCatalogue;
                        return [4 /*yield*/, this.fileService.uploadFile(cleanedUpdateCatalogue.mainImg)];
                    case 3:
                        _a.mainImg = _d.sent();
                        _d.label = 4;
                    case 4: return [4 /*yield*/, this.catalogueRepository.updateByIdAsync(catalogueId, cleanedUpdateCatalogue)];
                    case 5:
                        _d.sent();
                        _b = this.convertCatalogueToCatalogueResponse;
                        return [4 /*yield*/, this.catalogueRepository.getByIdAsync(catalogueId)];
                    case 6:
                        response = _b.apply(this, [_d.sent()]);
                        this.eventTracer.isSuccessWithResponseAndMessage(response);
                        return [2 /*return*/, response];
                    case 7:
                        ex_2 = _d.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_2);
                        throw ex_2;
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.getCatalogues = function (query) { return __awaiter(_this, void 0, Promise, function () {
            var cleanedQuery, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cleanedQuery = object_utility_1["default"].removeNullOrUndefinedValuesFromObject(query);
                        console.log({ cleanedQuery: cleanedQuery });
                        return [4 /*yield*/, this.catalogueRepository.getAsync(cleanedQuery)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.map(this.convertCatalogueToCatalogueResponse)];
                }
            });
        }); };
        this.featureCatalogues = function (catelogueIds, feature) { return __awaiter(_this, void 0, Promise, function () {
            var resp, cataloguesResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log({ feature: feature });
                        return [4 /*yield*/, this.catalogueRepository.updateIsFeaturedStatus(catelogueIds, feature)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.catalogueRepository.contains({ _id: catelogueIds })];
                    case 2:
                        resp = _a.sent();
                        cataloguesResponse = resp.map(this.convertCatalogueToCatalogueResponse);
                        return [2 /*return*/, cataloguesResponse];
                }
            });
        }); };
        this.addProductsToCatalogue = function (addProductsToCatalogueRequest) { return __awaiter(_this, void 0, Promise, function () {
            var catalogue, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.catalogueRepository.getByIdAsync(addProductsToCatalogueRequest.catalogueId)];
                    case 1:
                        catalogue = _b.sent();
                        if (!catalogue) {
                            throw new not_found_exception_1["default"]("Catalogue with id " + addProductsToCatalogueRequest.catalogueId + " not found");
                        }
                        return [4 /*yield*/, this.catalogueRepository.addToFieldsList({ _id: addProductsToCatalogueRequest.catalogueId }, { products: addProductsToCatalogueRequest.productIds.map(function (pred) { return new mongoose_1.Types.ObjectId(pred); }) })];
                    case 2:
                        _b.sent();
                        _a = this.convertCatalogueToCatalogueResponse;
                        return [4 /*yield*/, this.catalogueRepository.getByIdAsync(addProductsToCatalogueRequest.catalogueId)];
                    case 3: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        }); };
        this.removeProductsFromCatalogue = function (removeProductsFromCatalogueRequest) { return __awaiter(_this, void 0, Promise, function () {
            var catalogue, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.catalogueRepository.getByIdAsync(removeProductsFromCatalogueRequest.catalogueId)];
                    case 1:
                        catalogue = _b.sent();
                        if (!catalogue) {
                            throw new not_found_exception_1["default"]("Catalogue with id " + removeProductsFromCatalogueRequest.catalogueId + " not found");
                        }
                        return [4 /*yield*/, this.catalogueRepository.removeFromFieldsList({ _id: removeProductsFromCatalogueRequest.catalogueId }, { products: removeProductsFromCatalogueRequest.productIds })];
                    case 2:
                        _b.sent();
                        _a = this.convertCatalogueToCatalogueResponse;
                        return [4 /*yield*/, this.catalogueRepository.getByIdAsync(removeProductsFromCatalogueRequest.catalogueId)];
                    case 3: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        }); };
        this.getProductsCatalogues = function (productIds) { return __awaiter(_this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.catalogueRepository.contains({ products: productIds })];
                    case 1: return [2 /*return*/, (_a.sent()).map(this.convertCatalogueToCatalogueResponse)];
                }
            });
        }); };
    }
    CatalogueService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(event_tracer_1.IIEventTracer)),
        __param(1, tsyringe_1.inject(file_service_1.IIFileService)),
        __param(2, tsyringe_1.inject(catalogue_repository_1.IICatalogueRepository))
    ], CatalogueService);
    return CatalogueService;
}());
exports["default"] = CatalogueService;
