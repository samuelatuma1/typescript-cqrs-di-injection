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
const product_service_1 = require("../../../application/contract/services/shop/product_service");
const tsyringe_1 = require("tsyringe");
const event_tracer_1 = require("../../../application/contract/observability/event_tracer");
const category_service_1 = require("../../../application/contract/services/shop/category_service");
const object_utility_1 = __importDefault(require("../../../application/common/utilities/object_utility"));
const pagination_utility_1 = __importDefault(require("../../../application/common/utilities/pagination_utility"));
let CategoryLogic = class CategoryLogic {
    eventTracer;
    categoryService;
    productService;
    constructor(eventTracer, categoryService, productService) {
        this.eventTracer = eventTracer;
        this.categoryService = categoryService;
        this.productService = productService;
    }
    transformCategoryFiltersToDict = (filters) => {
        let filterDict = {};
        for (let filter of filters) {
            filterDict[filter._id.toJSON()] = filter;
        }
        return filterDict;
    };
    getCategoryEnriched = async (categoryId, filters, page = 0, pageSize = 10) => {
        try {
            // get category
            this.eventTracer.say("Get Category Product");
            let category = await this.categoryService.getCategoryEnriched(categoryId, { subCategories: true, filters: true });
            let cleanedFilters = {};
            this.eventTracer.say(`Cleaning filters`);
            for (let [filterName, filterValuesAsString] of Object.entries(filters)) {
                let filterValues = filterValuesAsString.split(",");
                cleanedFilters[filterName] = filterValues;
            }
            let categoryFiltersAsDict = this.transformCategoryFiltersToDict(category.filters);
            let validSearchFiltersWithIdAsKey = {};
            let validSearchFiltersIds = new Set();
            // apply filter logic on product
            // get filters from category based on filter names , convert to filter id for easier search
            this.eventTracer.say(`Getting valid filters ids`);
            for (let filter in filters) {
                this.eventTracer.say(`DEBUG!:exploring ${filter} found`);
                let filterInCategory = category.filters.find(categoryFilter => {
                    console.log({ categoryFilter, categoryFiltersAsDict });
                    return categoryFilter.name.toLowerCase() === filter.toLowerCase() && categoryFiltersAsDict.hasOwnProperty(categoryFilter._id.toJSON());
                });
                if (filterInCategory) {
                    this.eventTracer.say(`DEBUG!: ${filterInCategory.name}`);
                    validSearchFiltersWithIdAsKey[filterInCategory._id.toString()] = filterInCategory;
                    validSearchFiltersIds.add(filterInCategory._id.toString());
                }
            }
            this.eventTracer.say(`Valid search filter ids gotten : ${validSearchFiltersIds}`);
            // get filter ids
            let allProductsWithCategoryId = await this.productService.getQuery({
                categories: category._id
            }, { includeDiscounts: true });
            let productsMatchingFilters = [];
            // apply filters
            if (!object_utility_1.default.objectSize(validSearchFiltersWithIdAsKey)) { // if no valid filter then all products are valid searches
                this.eventTracer.say(`All products are valid searches`);
                productsMatchingFilters = allProductsWithCategoryId;
            }
            else {
                this.eventTracer.say(`narrowing down products based on valid search filters`);
                for (let product of allProductsWithCategoryId) {
                    let productMatchesAllFilters = true;
                    for (let filterId in validSearchFiltersWithIdAsKey) {
                        let productFilterValue = product.filters.get(filterId);
                        if (!productFilterValue) {
                            productMatchesAllFilters = false;
                            this.eventTracer.say(`DEBUG ONLY!!: Product does not have filter with name ${validSearchFiltersWithIdAsKey[filterId].name}`);
                            break; // move on to the next product as it does not have all needed filters
                        }
                        // get category filter value as well as type
                        let filterDetailsFromCategory = categoryFiltersAsDict[filterId];
                        switch (filterDetailsFromCategory.filterType.toLowerCase()) { // get filter type 
                            case "string":
                            default:
                                let filterName = filterDetailsFromCategory.name; // full circle back to name LOL
                                let selectedSearchValuesForFilter = cleanedFilters[filterName];
                                let productValuesForFilter = product.filters.get(filterId)?.values;
                                let doesProductMatchFilter = productValuesForFilter?.some(productValue => selectedSearchValuesForFilter.includes(productValue));
                                if (!doesProductMatchFilter) {
                                    this.eventTracer.say(`DEBUG ONLY!!: Product does not have a valid value for filter with name ${validSearchFiltersWithIdAsKey[filterId].name}, filter values ${selectedSearchValuesForFilter}, product values: ${productValuesForFilter}`);
                                    productMatchesAllFilters = false;
                                    break;
                                }
                        }
                        // if type string or default
                        // 
                    }
                    if (productMatchesAllFilters) {
                        this.eventTracer.say("DEBUG: Product matches filters");
                        productsMatchingFilters.push(product);
                    }
                }
            }
            const productsResponse = await this.productService.convertProductsToProductResponse(productsMatchingFilters, { includeDiscountAndDiscountPrice: true });
            const paginatedProducts = pagination_utility_1.default.paginateData(productsResponse, page, pageSize);
            category.pagedProducts = paginatedProducts;
            this.eventTracer.isSuccessWithResponseAndMessage(category);
            return category;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
};
CategoryLogic = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __param(1, (0, tsyringe_1.inject)(category_service_1.IICategoryService)),
    __param(2, (0, tsyringe_1.inject)(product_service_1.IIProductService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], CategoryLogic);
exports.default = CategoryLogic;
//# sourceMappingURL=category_logic.js.map