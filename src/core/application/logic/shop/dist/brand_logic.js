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
var tsyringe_1 = require("tsyringe");
var event_tracer_1 = require("../../../application/contract/observability/event_tracer");
var category_service_1 = require("../../../application/contract/services/shop/category_service");
var product_repository_1 = require("../../../application/contract/data_access/shop/product_repository");
var brand_service_1 = require("../../../application/contract/services/shop/brand_service");
var mongoose_1 = require("mongoose");
var not_found_exception_1 = require("../../../application/common/exceptions/not_found_exception");
var product_service_1 = require("../../../application/contract/services/shop/product_service");
var BrandLogic = /** @class */ (function () {
    function BrandLogic(eventTracer, categoryService, productRepository, productService, brandService) {
        var _this = this;
        this.eventTracer = eventTracer;
        this.categoryService = categoryService;
        this.productRepository = productRepository;
        this.productService = productService;
        this.brandService = brandService;
        this.updateBrandCategoriesWithProductCategories = function (products) { return __awaiter(_this, void 0, Promise, function () {
            var brandCategories, _loop_1, _i, products_1, product;
            var _this = this;
            return __generator(this, function (_a) {
                brandCategories = {};
                _loop_1 = function (product) {
                    product.categories.forEach(function (cat) { return __awaiter(_this, void 0, void 0, function () {
                        var category, possibleCategory, categoryFilters, productCategoryfilters, _i, categoryFilters_1, filter, productHasFilter, categoryIdString, categoryToSave;
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    if (!(cat instanceof mongoose_1.Types.ObjectId)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.categoryService.getCategoriesByIds([cat])];
                                case 1:
                                    possibleCategory = (_a = (_c.sent())[0]) !== null && _a !== void 0 ? _a : null;
                                    if (possibleCategory) {
                                        category = possibleCategory;
                                    }
                                    return [3 /*break*/, 3];
                                case 2:
                                    category = cat;
                                    _c.label = 3;
                                case 3:
                                    categoryFilters = (_b = category === null || category === void 0 ? void 0 : category.filters) !== null && _b !== void 0 ? _b : [];
                                    productCategoryfilters = [];
                                    for (_i = 0, categoryFilters_1 = categoryFilters; _i < categoryFilters_1.length; _i++) {
                                        filter = categoryFilters_1[_i];
                                        productHasFilter = product.filters.get(filter._id.toString());
                                        if (productHasFilter) {
                                            productCategoryfilters.push(filter);
                                        }
                                    }
                                    category.filters = productCategoryfilters;
                                    categoryIdString = category._id.toString();
                                    categoryToSave = brandCategories[categoryIdString];
                                    if (categoryToSave) {
                                        categoryToSave.filters = this.getUniqueFiltersForCategories(category, categoryToSave);
                                    }
                                    else {
                                        categoryToSave = category;
                                    }
                                    brandCategories[categoryIdString] = categoryToSave;
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                };
                for (_i = 0, products_1 = products; _i < products_1.length; _i++) {
                    product = products_1[_i];
                    _loop_1(product);
                }
                return [2 /*return*/, Object.values(brandCategories)];
            });
        }); };
        this.getUniqueFiltersForCategories = function (category, categoryToSave) {
            var filterIdFilterMap = new Map();
            var addToFilterIdMap = function (category) {
                var _a;
                for (var _i = 0, _b = (_a = category === null || category === void 0 ? void 0 : category.filters) !== null && _a !== void 0 ? _a : []; _i < _b.length; _i++) {
                    var filter = _b[_i];
                    var filterIdString = filter._id.toString();
                    filterIdFilterMap.set(filterIdString, filter);
                }
            };
            addToFilterIdMap(category);
            addToFilterIdMap(categoryToSave);
            return Array.from(filterIdFilterMap.values());
        };
        this.addProductsToBrand = function (brandId, productsIds) { return __awaiter(_this, void 0, Promise, function () {
            var brand, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.eventTracer.say("Add Product to Brand");
                        console.log("Iscaba");
                        return [4 /*yield*/, this.brandService.getBrand(new mongoose_1.Types.ObjectId(brandId))];
                    case 1:
                        brand = _a.sent();
                        if (!brand) {
                            throw new not_found_exception_1["default"]("Brand not found");
                        }
                        return [4 /*yield*/, this.productRepository.contains({ _id: productsIds.map(function (pro) { return new mongoose_1.Types.ObjectId(pro); }) })];
                    case 2:
                        products = _a.sent();
                        console.log(products);
                        return [4 /*yield*/, this.productRepository.updateManyAsync({ _id: { $in: products.map(function (prod) { return prod._id; }) } }, { brandId: new mongoose_1.Types.ObjectId(brandId) })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getBrand((new mongoose_1.Types.ObjectId(brandId)))];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.getBrand = function (brandId, options) { return __awaiter(_this, void 0, Promise, function () {
            var brand, products, brandCategories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        brandId = new mongoose_1.Types.ObjectId(brandId);
                        return [4 /*yield*/, this.brandService.getBrand(brandId)];
                    case 1:
                        brand = _a.sent();
                        if (!brand) {
                            throw new not_found_exception_1["default"]("Brand not found");
                        }
                        return [4 /*yield*/, this.productService.getProducts({ brandId: brandId }, { includeDiscountAndDiscountPrice: true, includeCategories: true })];
                    case 2:
                        products = _a.sent();
                        return [4 /*yield*/, this.updateBrandCategoriesWithProductCategories(products)];
                    case 3:
                        brandCategories = _a.sent();
                        brand.categories = brandCategories;
                        brand.products = products;
                        return [2 /*return*/, brand];
                }
            });
        }); };
        this.createBrand = function (createBrandRequest) { return __awaiter(_this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.brandService.createBrand(createBrandRequest)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
    }
    BrandLogic = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(event_tracer_1.IIEventTracer)),
        __param(1, tsyringe_1.inject(category_service_1.IICategoryService)),
        __param(2, tsyringe_1.inject(product_repository_1.IIProductRepository)),
        __param(3, tsyringe_1.inject(product_service_1.IIProductService)),
        __param(4, tsyringe_1.inject(brand_service_1.IIBrandService))
    ], BrandLogic);
    return BrandLogic;
}());
exports["default"] = BrandLogic;
