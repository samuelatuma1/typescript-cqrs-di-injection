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
const tsyringe_1 = require("tsyringe");
const event_tracer_1 = require("../../../application/contract/observability/event_tracer");
const category_service_1 = require("../../../application/contract/services/shop/category_service");
const product_repository_1 = require("../../../application/contract/data_access/shop/product_repository");
const brand_service_1 = require("../../../application/contract/services/shop/brand_service");
const mongoose_1 = require("mongoose");
const not_found_exception_1 = __importDefault(require("../../../application/common/exceptions/not_found_exception"));
const product_service_1 = require("../../../application/contract/services/shop/product_service");
let BrandLogic = class BrandLogic {
    eventTracer;
    categoryService;
    productRepository;
    productService;
    brandService;
    constructor(eventTracer, categoryService, productRepository, productService, brandService) {
        this.eventTracer = eventTracer;
        this.categoryService = categoryService;
        this.productRepository = productRepository;
        this.productService = productService;
        this.brandService = brandService;
    }
    updateBrandCategoriesWithProductCategories = async (products) => {
        let brandCategories = {};
        for (let product of products) {
            product.categories.forEach(async (cat) => {
                let category;
                if (cat instanceof mongoose_1.Types.ObjectId) {
                    let possibleCategory = (await this.categoryService.getCategoriesByIds([cat]))[0] ?? null;
                    if (possibleCategory) {
                        category = possibleCategory;
                    }
                }
                else {
                    category = cat;
                }
                let categoryFilters = category?.filters ?? [];
                let productCategoryfilters = [];
                for (let filter of categoryFilters) {
                    let productHasFilter = product.filters.get(filter._id.toString());
                    if (productHasFilter) {
                        productCategoryfilters.push(filter);
                    }
                }
                category.filters = productCategoryfilters;
                let categoryIdString = category._id.toString();
                let categoryToSave = brandCategories[categoryIdString];
                if (categoryToSave) {
                    categoryToSave.filters = this.getUniqueFiltersForCategories(category, categoryToSave);
                }
                else {
                    categoryToSave = category;
                }
                brandCategories[categoryIdString] = categoryToSave;
            });
        }
        return Object.values(brandCategories);
    };
    getUniqueFiltersForCategories = (category, categoryToSave) => {
        let filterIdFilterMap = new Map();
        const addToFilterIdMap = (category) => {
            for (let filter of category?.filters ?? []) {
                let filterIdString = filter._id.toString();
                filterIdFilterMap.set(filterIdString, filter);
            }
        };
        addToFilterIdMap(category);
        addToFilterIdMap(categoryToSave);
        return Array.from(filterIdFilterMap.values());
    };
    addProductsToBrand = async (brandId, productsIds) => {
        this.eventTracer.say("Add Product to Brand");
        console.log("Iscaba");
        let brand = await this.brandService.getBrand(new mongoose_1.Types.ObjectId(brandId));
        if (!brand) {
            throw new not_found_exception_1.default(`Brand not found`);
        }
        const products = await this.productRepository.contains({ _id: productsIds.map(pro => new mongoose_1.Types.ObjectId(pro)) });
        console.log(products);
        await this.productRepository.updateManyAsync({ _id: { $in: products.map(prod => prod._id) } }, { brandId: new mongoose_1.Types.ObjectId(brandId) });
        return await this.getBrand((new mongoose_1.Types.ObjectId(brandId)));
    };
    getBrand = async (brandId, options) => {
        brandId = new mongoose_1.Types.ObjectId(brandId);
        let brand = await this.brandService.getBrand(brandId);
        if (!brand) {
            throw new not_found_exception_1.default(`Brand not found`);
        }
        let products = await this.productService.getProducts({ brandId }, { includeDiscountAndDiscountPrice: true, includeCategories: true });
        let brandCategories = await this.updateBrandCategoriesWithProductCategories(products);
        brand.categories = brandCategories;
        brand.products = products;
        return brand;
    };
    createBrand = async (createBrandRequest) => {
        return await this.brandService.createBrand(createBrandRequest);
    };
};
BrandLogic = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __param(1, (0, tsyringe_1.inject)(category_service_1.IICategoryService)),
    __param(2, (0, tsyringe_1.inject)(product_repository_1.IIProductRepository)),
    __param(3, (0, tsyringe_1.inject)(product_service_1.IIProductService)),
    __param(4, (0, tsyringe_1.inject)(brand_service_1.IIBrandService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], BrandLogic);
exports.default = BrandLogic;
//# sourceMappingURL=brand_logic.js.map