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
var product_service_1 = require("../../../application/contract/services/shop/product_service");
var tsyringe_1 = require("tsyringe");
var event_tracer_1 = require("../../../application/contract/observability/event_tracer");
var category_service_1 = require("../../../application/contract/services/shop/category_service");
var object_utility_1 = require("../../../application/common/utilities/object_utility");
var pagination_utility_1 = require("../../../application/common/utilities/pagination_utility");
var CategoryLogic = /** @class */ (function () {
    function CategoryLogic(eventTracer, categoryService, productService) {
        var _this = this;
        this.eventTracer = eventTracer;
        this.categoryService = categoryService;
        this.productService = productService;
        this.transformCategoryFiltersToDict = function (filters) {
            var filterDict = {};
            for (var _i = 0, filters_1 = filters; _i < filters_1.length; _i++) {
                var filter = filters_1[_i];
                filterDict[filter._id.toJSON()] = filter;
            }
            return filterDict;
        };
        this.getCategoryEnriched = function (categoryId, filters, page, pageSize) {
            if (page === void 0) { page = 0; }
            if (pageSize === void 0) { pageSize = 10; }
            return __awaiter(_this, void 0, Promise, function () {
                var category, cleanedFilters, _i, _a, _b, filterName, filterValuesAsString, filterValues, categoryFiltersAsDict_1, validSearchFiltersWithIdAsKey, validSearchFiltersIds, _loop_1, this_1, filter, allProductsWithCategoryId, productsMatchingFilters, _c, allProductsWithCategoryId_1, product, productMatchesAllFilters, _loop_2, this_2, filterId, state_1, productsResponse, paginatedProducts, ex_1;
                var _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _e.trys.push([0, 4, , 5]);
                            // get category
                            this.eventTracer.say("Get Category Product");
                            return [4 /*yield*/, this.categoryService.getCategoryEnriched(categoryId, { subCategories: true, filters: true })];
                        case 1:
                            category = _e.sent();
                            cleanedFilters = {};
                            this.eventTracer.say("Cleaning filters");
                            for (_i = 0, _a = Object.entries(filters); _i < _a.length; _i++) {
                                _b = _a[_i], filterName = _b[0], filterValuesAsString = _b[1];
                                filterValues = filterValuesAsString.split(",");
                                cleanedFilters[filterName] = filterValues;
                            }
                            categoryFiltersAsDict_1 = this.transformCategoryFiltersToDict(category.filters);
                            validSearchFiltersWithIdAsKey = {};
                            validSearchFiltersIds = new Set();
                            // apply filter logic on product
                            // get filters from category based on filter names , convert to filter id for easier search
                            this.eventTracer.say("Getting valid filters ids");
                            _loop_1 = function (filter) {
                                this_1.eventTracer.say("DEBUG!:exploring " + filter + " found");
                                var filterInCategory = category.filters.find(function (categoryFilter) {
                                    console.log({ categoryFilter: categoryFilter, categoryFiltersAsDict: categoryFiltersAsDict_1 });
                                    return categoryFilter.name.toLowerCase() === filter.toLowerCase() && categoryFiltersAsDict_1.hasOwnProperty(categoryFilter._id.toJSON());
                                });
                                if (filterInCategory) {
                                    this_1.eventTracer.say("DEBUG!: " + filterInCategory.name);
                                    validSearchFiltersWithIdAsKey[filterInCategory._id.toString()] = filterInCategory;
                                    validSearchFiltersIds.add(filterInCategory._id.toString());
                                }
                            };
                            this_1 = this;
                            for (filter in filters) {
                                _loop_1(filter);
                            }
                            this.eventTracer.say("Valid search filter ids gotten : " + validSearchFiltersIds);
                            return [4 /*yield*/, this.productService.getQuery({
                                    categories: category._id
                                }, { includeDiscounts: true })];
                        case 2:
                            allProductsWithCategoryId = _e.sent();
                            productsMatchingFilters = [];
                            // apply filters
                            if (!object_utility_1["default"].objectSize(validSearchFiltersWithIdAsKey)) { // if no valid filter then all products are valid searches
                                this.eventTracer.say("All products are valid searches");
                                productsMatchingFilters = allProductsWithCategoryId;
                            }
                            else {
                                this.eventTracer.say("narrowing down products based on valid search filters");
                                for (_c = 0, allProductsWithCategoryId_1 = allProductsWithCategoryId; _c < allProductsWithCategoryId_1.length; _c++) {
                                    product = allProductsWithCategoryId_1[_c];
                                    productMatchesAllFilters = true;
                                    _loop_2 = function (filterId) {
                                        var productFilterValue = product.filters.get(filterId);
                                        if (!productFilterValue) {
                                            productMatchesAllFilters = false;
                                            this_2.eventTracer.say("DEBUG ONLY!!: Product does not have filter with name " + validSearchFiltersWithIdAsKey[filterId].name);
                                            return "break";
                                        }
                                        // get category filter value as well as type
                                        var filterDetailsFromCategory = categoryFiltersAsDict_1[filterId];
                                        switch (filterDetailsFromCategory.filterType.toLowerCase()) { // get filter type 
                                            case "string":
                                            default:
                                                var filterName = filterDetailsFromCategory.name; // full circle back to name LOL
                                                var selectedSearchValuesForFilter_1 = cleanedFilters[filterName];
                                                var productValuesForFilter = (_d = product.filters.get(filterId)) === null || _d === void 0 ? void 0 : _d.values;
                                                var doesProductMatchFilter = productValuesForFilter === null || productValuesForFilter === void 0 ? void 0 : productValuesForFilter.some(function (productValue) { return selectedSearchValuesForFilter_1.includes(productValue); });
                                                if (!doesProductMatchFilter) {
                                                    this_2.eventTracer.say("DEBUG ONLY!!: Product does not have a valid value for filter with name " + validSearchFiltersWithIdAsKey[filterId].name + ", filter values " + selectedSearchValuesForFilter_1 + ", product values: " + productValuesForFilter);
                                                    productMatchesAllFilters = false;
                                                    break;
                                                }
                                        }
                                    };
                                    this_2 = this;
                                    for (filterId in validSearchFiltersWithIdAsKey) {
                                        state_1 = _loop_2(filterId);
                                        if (state_1 === "break")
                                            break;
                                    }
                                    if (productMatchesAllFilters) {
                                        this.eventTracer.say("DEBUG: Product matches filters");
                                        productsMatchingFilters.push(product);
                                    }
                                }
                            }
                            return [4 /*yield*/, this.productService.convertProductsToProductResponse(productsMatchingFilters, { includeDiscountAndDiscountPrice: true })];
                        case 3:
                            productsResponse = _e.sent();
                            paginatedProducts = pagination_utility_1["default"].paginateData(productsResponse, page, pageSize);
                            category.pagedProducts = paginatedProducts;
                            this.eventTracer.isSuccessWithResponseAndMessage(category);
                            return [2 /*return*/, category];
                        case 4:
                            ex_1 = _e.sent();
                            this.eventTracer.isExceptionWithMessage("" + ex_1);
                            throw ex_1;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
    }
    CategoryLogic = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(event_tracer_1.IIEventTracer)),
        __param(1, tsyringe_1.inject(category_service_1.IICategoryService)),
        __param(2, tsyringe_1.inject(product_service_1.IIProductService))
    ], CategoryLogic);
    return CategoryLogic;
}());
exports["default"] = CategoryLogic;
