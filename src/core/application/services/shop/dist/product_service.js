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
var product_requests_1 = require("../../../domain/shop/dto/requests/product_requests");
var tsyringe_1 = require("tsyringe");
var event_tracer_1 = require("../../../application/contract/observability/event_tracer");
var category_service_1 = require("../../../application/contract/services/shop/category_service");
var object_utility_1 = require("../../../application/common/utilities/object_utility");
var filter_for_product_1 = require("../../../domain/shop/entity/filter_for_product");
var product_1 = require("../../../domain/shop/entity/product");
var mongoose_1 = require("mongoose");
var product_inventory_1 = require("../../../domain/shop/entity/product_inventory");
var product_repository_1 = require("../../../application/contract/data_access/shop/product_repository");
var file_service_1 = require("../../../application/contract/services/files/file_service");
var ProductService = /** @class */ (function () {
    function ProductService(eventTracer, categoryService, productRepository, fileService) {
        var _this = this;
        this.eventTracer = eventTracer;
        this.categoryService = categoryService;
        this.productRepository = productRepository;
        this.fileService = fileService;
        this.ProductMainImageFolder = "BEAUTY_PRODUCT_MAIN";
        this.ProductOtherMediaFolder = "BEAUTY_PRODUCT_OTHERS";
        this.convertCreateProductRequestToProduct = function (createProductRequest, filtersForProductMap) {
            var _a, _b, _c, _d, _e, _f;
            return new product_1["default"]({
                name: createProductRequest.name,
                desc: (_a = createProductRequest.desc) !== null && _a !== void 0 ? _a : "",
                mainImg: (_b = createProductRequest.mainImg) !== null && _b !== void 0 ? _b : null,
                otherMedia: (_c = createProductRequest.otherMedia) !== null && _c !== void 0 ? _c : [],
                inventory: (_d = createProductRequest.inventory) !== null && _d !== void 0 ? _d : new product_inventory_1.ProductInventory(),
                price: createProductRequest.price,
                currency: createProductRequest.currency,
                filters: filtersForProductMap,
                categories: (_f = (_e = createProductRequest.categories) === null || _e === void 0 ? void 0 : _e.map(function (cat) { return new mongoose_1.Types.ObjectId(cat); })) !== null && _f !== void 0 ? _f : [],
                extras: createProductRequest.extras
            });
        };
        this.getAllCategoryFiltersForProduct = function (categoriesIds) { return __awaiter(_this, void 0, Promise, function () {
            var allCategories, allCategoriesFiltersDict, _i, allCategories_1, category, filters, _a, filters_1, filter;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        allCategories = [];
                        allCategoriesFiltersDict = {};
                        if (!(categoriesIds === null || categoriesIds === void 0 ? void 0 : categoriesIds.length)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.categoryService.getCategoriesWithInheritedFilters(categoriesIds)];
                    case 1:
                        allCategories = _b.sent();
                        for (_i = 0, allCategories_1 = allCategories; _i < allCategories_1.length; _i++) {
                            category = allCategories_1[_i];
                            filters = category.filters;
                            for (_a = 0, filters_1 = filters; _a < filters_1.length; _a++) {
                                filter = filters_1[_a];
                                allCategoriesFiltersDict[filter._id.toJSON()] = filter;
                            }
                        }
                        _b.label = 2;
                    case 2: return [2 /*return*/, allCategoriesFiltersDict];
                }
            });
        }); };
        this.createProduct = function (createProductRequest) { return __awaiter(_this, void 0, Promise, function () {
            var allCategoriesFiltersDict, filtersForProductMap, _i, _a, _b, key, filterForProduct, filterDetails, productFilter, product, _c, _d, savedProduct, ex_1;
            var _this = this;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 7, , 8]);
                        createProductRequest = new product_requests_1.CreateProductRequest(createProductRequest);
                        this.eventTracer.request = createProductRequest;
                        this.eventTracer.say("Creating new Product");
                        console.log(JSON.stringify(createProductRequest));
                        return [4 /*yield*/, this.getAllCategoryFiltersForProduct(createProductRequest.categories)];
                    case 1:
                        allCategoriesFiltersDict = _f.sent();
                        filtersForProductMap = new Map();
                        this.eventTracer.say("all allCategoriesFiltersDict gotten, creating FilterForProducts");
                        if (object_utility_1["default"].objectSize(createProductRequest.filters)) {
                            for (_i = 0, _a = Object.entries(createProductRequest.filters); _i < _a.length; _i++) {
                                _b = _a[_i], key = _b[0], filterForProduct = _b[1];
                                if (allCategoriesFiltersDict.hasOwnProperty(key)) {
                                    this.eventTracer.say("Creating filter for filterId : " + key);
                                    filterDetails = allCategoriesFiltersDict[key];
                                    productFilter = new filter_for_product_1["default"]({
                                        name: filterDetails.name,
                                        values: filterForProduct.values,
                                        categoryId: filterDetails.categoryId,
                                        filterType: filterDetails.filterType,
                                        filterId: filterDetails._id
                                    });
                                    filtersForProductMap.set(key, productFilter);
                                }
                            }
                        }
                        product = this.convertCreateProductRequestToProduct(createProductRequest, filtersForProductMap);
                        if (!product.mainImg) return [3 /*break*/, 3];
                        product.mainImg.folder = this.ProductMainImageFolder;
                        this.eventTracer.say("Saving main image for product");
                        _c = product;
                        return [4 /*yield*/, this.fileService.uploadFile(product.mainImg)];
                    case 2:
                        _c.mainImg = _f.sent();
                        _f.label = 3;
                    case 3:
                        if (!((_e = product.otherMedia) === null || _e === void 0 ? void 0 : _e.length)) return [3 /*break*/, 5];
                        product.otherMedia = product.otherMedia.map(function (media) {
                            media.folder = _this.ProductOtherMediaFolder;
                            return media;
                        });
                        this.eventTracer.say("Saving other media for product");
                        _d = product;
                        return [4 /*yield*/, this.fileService.uploadMultipleFiles(product.otherMedia)];
                    case 4:
                        _d.otherMedia = _f.sent();
                        _f.label = 5;
                    case 5: return [4 /*yield*/, this.productRepository.addAsync(product)];
                    case 6:
                        savedProduct = _f.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(savedProduct);
                        return [2 /*return*/, savedProduct];
                    case 7:
                        ex_1 = _f.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_1);
                        throw ex_1;
                    case 8: return [2 /*return*/];
                }
            });
        }); };
    }
    ProductService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(event_tracer_1.IIEventTracer)),
        __param(1, tsyringe_1.inject(category_service_1.IICategoryService)),
        __param(2, tsyringe_1.inject(product_repository_1.IIProductRepository)),
        __param(3, tsyringe_1.inject(file_service_1.IIFileService))
    ], ProductService);
    return ProductService;
}());
exports["default"] = ProductService;
