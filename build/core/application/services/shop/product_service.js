"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const product_requests_1 = require("../../../domain/shop/dto/requests/product_requests");
const tsyringe_1 = require("tsyringe");
const event_tracer_1 = require("../../../application/contract/observability/event_tracer");
const category_service_1 = require("../../../application/contract/services/shop/category_service");
const object_utility_1 = __importDefault(require("../../../application/common/utilities/object_utility"));
const filter_for_product_1 = __importDefault(require("../../../domain/shop/entity/filter_for_product"));
const product_1 = __importDefault(require("../../../domain/shop/entity/product"));
const mongoose_1 = require("mongoose");
const product_inventory_1 = require("../../../domain/shop/entity/product_inventory");
const product_repository_1 = require("../../../application/contract/data_access/shop/product_repository");
const file_service_1 = require("../../../application/contract/services/files/file_service");
const not_found_exception_1 = __importDefault(require("../../../application/common/exceptions/not_found_exception"));
const product_response_1 = require("../../../domain/shop/dto/responses/product_response");
const discount_service_1 = require("../../../application/contract/services/shop/discount_service");
const discount_1 = __importStar(require("../../../domain/shop/entity/discount"));
const date_utility_1 = __importDefault(require("../../../application/common/utilities/date_utility"));
const validation_exception_1 = __importDefault(require("../../../application/common/exceptions/validation_exception"));
const serialization_utility_1 = __importDefault(require("../../../application/common/utilities/serialization_utility"));
const pagination_result_1 = require("../../../domain/authentication/dto/results/pagination_result");
const cart_1 = require("../../../domain/shop/entity/cart");
const item_status_1 = require("../../../domain/shop/enum/item_status");
const cart_request_1 = require("../../../domain/shop/dto/requests/cart_request");
let ProductService = class ProductService {
    eventTracer;
    categoryService;
    productRepository;
    discountService;
    fileService;
    ProductMainImageFolder = "BEAUTY_PRODUCT_MAIN";
    ProductOtherMediaFolder = "BEAUTY_PRODUCT_OTHERS";
    constructor(eventTracer, categoryService, productRepository, discountService, fileService) {
        this.eventTracer = eventTracer;
        this.categoryService = categoryService;
        this.productRepository = productRepository;
        this.discountService = discountService;
        this.fileService = fileService;
    }
    getProductByIdOrRaiseException = async (productId, joins) => {
        productId = new mongoose_1.Types.ObjectId(productId);
        let product = await this.productRepository.getByIdAsync(productId, joins);
        if (!product)
            throw new not_found_exception_1.default(`Product with id ${productId} not found`);
        return product;
    };
    convertCreateProductRequestToProduct = (createProductRequest, filtersForProductMap) => {
        return new product_1.default({
            name: createProductRequest.name,
            desc: createProductRequest.desc ?? "",
            mainImg: createProductRequest.mainImg ?? null,
            otherMedia: createProductRequest.otherMedia ?? [],
            inventory: createProductRequest.inventory ?? new product_inventory_1.ProductInventory(),
            price: createProductRequest.price,
            currency: createProductRequest.currency,
            filters: filtersForProductMap,
            categories: createProductRequest.categories?.map(cat => new mongoose_1.Types.ObjectId(cat)) ?? [],
            extras: createProductRequest.extras,
            isPack: createProductRequest.isPack
        });
    };
    getAllCategoryFiltersForProduct = async (categoriesIds) => {
        let allCategories = [];
        let allCategoriesFiltersDict = {};
        if (categoriesIds?.length) {
            allCategories = await this.categoryService.getCategoriesByIds(categoriesIds, true);
            for (let category of allCategories) {
                let filters = category.filters;
                for (let filter of filters) {
                    allCategoriesFiltersDict[filter._id.toJSON()] = filter;
                }
            }
        }
        return allCategoriesFiltersDict;
    };
    validateAndSetFiltersForProduct = async (categoriesIds, filters) => {
        let allCategoriesFiltersDict = await this.getAllCategoryFiltersForProduct(categoriesIds);
        let filtersForProductMap = new Map();
        if (object_utility_1.default.objectSize(filters)) {
            for (let [key, filterForProduct] of Object.entries(filters)) {
                if (allCategoriesFiltersDict.hasOwnProperty(key)) {
                    this.eventTracer.say(`Creating filter for filterId : ${key}`);
                    let filterDetails = allCategoriesFiltersDict[key];
                    let productFilter = new filter_for_product_1.default({
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
        return filtersForProductMap;
    };
    createProduct = async (createProductRequest) => {
        try {
            this.eventTracer.request = createProductRequest;
            this.eventTracer.say(`Creating new Product`);
            createProductRequest = new product_requests_1.CreateProductRequest(createProductRequest);
            let filtersForProductMap = await this.validateAndSetFiltersForProduct(createProductRequest.categories, createProductRequest.filters);
            this.eventTracer.say(`created Filters For Products`);
            let product = this.convertCreateProductRequestToProduct(createProductRequest, filtersForProductMap);
            if (product.mainImg) {
                product.mainImg.folder = this.ProductMainImageFolder;
                this.eventTracer.say(`Saving main image for product`);
                product.mainImg = await this.fileService.uploadFile(product.mainImg);
            }
            if (product.otherMedia?.length) {
                product.otherMedia = product.otherMedia.map(media => {
                    media.folder = this.ProductOtherMediaFolder;
                    return media;
                });
                this.eventTracer.say(`Saving other media for product`);
                product.otherMedia = await this.fileService.uploadMultipleFiles(product.otherMedia);
            }
            let savedProduct = await this.productRepository.addAsync(product);
            this.eventTracer.isSuccessWithResponseAndMessage(savedProduct);
            return savedProduct;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    addPackProduct = async (productId, createPackProduct) => {
        // get product and ensure it is a pack.
        productId = new mongoose_1.Types.ObjectId(productId);
        const product = await this.productRepository.getByIdAsync(productId);
        if (!product?.isPack) {
            throw new validation_exception_1.default("Product not a Pack");
        }
        // add product to pack
        console.log("-----------------------------------------------------");
        console.log({ PRODUCTIMG: createPackProduct.mainImg, });
        console.log("-----------------------------------------------------");
        if (createPackProduct.mainImg) {
            let uploadedImage = await this.fileService.uploadFile(createPackProduct.mainImg);
            console.log({ uploadedImage });
            createPackProduct.mainImg = uploadedImage;
        }
        let packProduct = { ...createPackProduct };
        product.packProducts.push(packProduct);
        await this.productRepository.updateByIdAsync(productId, { packProducts: product.packProducts });
        return this.convertProductToProductResponse(await this.productRepository.getByIdAsync(productId));
        // save
    };
    getQuery = async (query, options) => {
        return await this.productRepository.getAsync(query, { discounts: options.includeDiscounts ?? false });
    };
    addPackProducts = async (productId, createPackProducts) => {
        try {
            // get product and ensure it is a pack.
            productId = new mongoose_1.Types.ObjectId(productId);
            console.log({ createPackProducts: createPackProducts.map(pred => pred.mainImg) });
            this.eventTracer.say(`Adding multiple products of size ${createPackProducts.length}`);
            this.eventTracer.request = createPackProducts;
            let addedProducts = [];
            for (let packProduct of createPackProducts) {
                let addedProduct = await this.addPackProduct(productId, packProduct);
                addedProducts.push(addedProduct);
            }
            this.eventTracer.isSuccessWithResponseAndMessage(addedProducts);
            return this.convertProductToProductResponse(await this.productRepository.getByIdAsync(productId));
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
        // save
    };
    updatePackProduct = async (productId, packProductId, packProductUpdate) => {
        try {
            this.eventTracer.say(`Update Pack Product: Product Id${productId}, PackProductId: ${packProductId}`);
            this.eventTracer.request = packProductUpdate;
            const cleanedUpdate = object_utility_1.default.removeNullOrUndefinedValuesFromObject(packProductUpdate);
            productId = new mongoose_1.Types.ObjectId(productId);
            packProductId = new mongoose_1.Types.ObjectId(packProductId);
            let product = await this.productRepository.getByIdAsync(productId);
            if (!product) {
                throw new not_found_exception_1.default(`Product with id ${productId}`);
            }
            let packProducts = product.packProducts ?? [];
            for (let i = 0; i < packProducts.length; i++) {
                let packProduct = packProducts[i];
                if (packProduct._id.toString() === packProductId.toString()) {
                    this.eventTracer.say(`Pack product to update found`);
                    let updateForProduct = cleanedUpdate;
                    if (cleanedUpdate.mainImg) {
                        await this.fileService.deleteFile(packProduct.mainImg?.public_id);
                        let updatedMainImg = await this.fileService.uploadFile(cleanedUpdate.mainImg);
                        updateForProduct.mainImg = updatedMainImg;
                    }
                    if (cleanedUpdate.otherMedia) {
                        let newMedia = await this.fileService.uploadMultipleFiles(cleanedUpdate.otherMedia);
                        updateForProduct.otherMedia = [...packProduct.otherMedia, ...newMedia.filter(d => d)];
                    }
                    let updatedPackProduct = object_utility_1.default.updateAwithB(packProduct, cleanedUpdate);
                    this.eventTracer.say(`updatedPackProduct Update :\n    ${serialization_utility_1.default.serializeJson(updatedPackProduct)}`);
                    packProducts[i] = updatedPackProduct;
                }
            }
            if (packProducts.length) {
                await this.productRepository.updateByIdAsync(productId, { packProducts });
            }
            let response = this.convertProductToProductResponse(await this.productRepository.getByIdAsync(productId));
            this.eventTracer.isSuccessWithResponseAndMessage(response);
            return response;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    deletePackProduct = async (productId, packProductId) => {
        // get product and ensure it is a pack.
        productId = new mongoose_1.Types.ObjectId(productId);
        packProductId = new mongoose_1.Types.ObjectId(packProductId);
        const product = await this.productRepository.getByIdAsync(productId);
        if (!product?.isPack) {
            throw new validation_exception_1.default("Product not a Pack");
        }
        // add product to pack
        let packProducts = product.packProducts ?? [];
        for (let packProduct of packProducts) {
            if (packProduct._id.toString() === packProductId.toString()) {
                packProduct.isDeleted = true;
            }
        }
        await this.productRepository.updateByIdAsync(productId, { packProducts: packProducts });
        return this.convertProductToProductResponse(await this.productRepository.getByIdAsync(productId));
        // save
    };
    buildUpdateData = (product, updateProductRequest) => {
        const updateData = {};
        if (updateProductRequest.name && product.name !== updateProductRequest.name) {
            updateData.name = updateProductRequest.name;
        }
        if (updateProductRequest.desc && product.desc !== updateProductRequest.desc) {
            updateData.desc = updateProductRequest.desc;
        }
        if (updateProductRequest.price && product.price !== updateProductRequest.price) {
            updateData.price = updateProductRequest.price;
        }
        if (updateProductRequest.currency && product.currency !== updateProductRequest.currency) {
            updateData.currency = updateProductRequest.currency;
        }
        if (updateProductRequest.extras && updateProductRequest.extras.length) {
            updateData.extras = updateProductRequest.extras;
        }
        return updateData;
    };
    updateProduct = async (productId, updateProductRequest) => {
        this.eventTracer.say("Updating Product");
        this.eventTracer.request = updateProductRequest;
        try {
            // get orignial product
            let product = await this.getProductByIdOrRaiseException(productId);
            this.eventTracer.say(`Product gotten for product with id ${productId}`);
            // check and update fields that changed
            let updateData = this.buildUpdateData(product, updateProductRequest);
            if (updateProductRequest.categories && updateProductRequest.categories.length) {
                let categoriesIds = updateProductRequest.categories.map(categoryId => new mongoose_1.Types.ObjectId(categoryId));
                let updatedCategories = await this.categoryService.getCategoriesByIds(categoriesIds, false);
                updateData.categories = updatedCategories.map(category => category._id);
            }
            if (updateProductRequest.filters && object_utility_1.default.objectSize(updateProductRequest.filters)) {
                let categoryIds = updateProductRequest.categories?.length ? updateProductRequest.categories : product.categories;
                updateData.filters = await this.validateAndSetFiltersForProduct(categoryIds, updateProductRequest.filters);
            }
            this.eventTracer.say(`Fields to update ${JSON.stringify(updateData)}`);
            await this.productRepository.updateByIdAsync(product._id, updateData);
            let updatedProduct = await this.productRepository.getByIdAsync(product._id);
            this.eventTracer.isSuccessWithResponseAndMessage(updateProductRequest);
            return updatedProduct;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    convertProductToProductResponse = (product) => {
        let productResponse = new product_response_1.ProductResponse(product);
        productResponse._id = product._id;
        productResponse.packProducts = productResponse.packProducts?.filter(prod => !prod.isDeleted);
        return productResponse;
    };
    convertProductToProductResponseAsync = async (product, options) => {
        let productResponse = new product_response_1.ProductResponse(product);
        productResponse._id = product._id;
        productResponse.packProducts = productResponse.packProducts?.filter(prod => !prod.isDeleted);
        if (options.includeDiscountAndDiscountPrice ?? false) {
            productResponse = await this.getDiscountedPriceAndAppliedDiscountsForProduct(productResponse);
        }
        return productResponse;
    };
    convertProductsToProductResponse = async (products, options) => {
        const productsResponses = [];
        let productsResponsePromises = await Promise.allSettled(products.map(product => this.convertProductToProductResponseAsync(product, { includeDiscountAndDiscountPrice: options.includeDiscountAndDiscountPrice })));
        for (let productPromise of productsResponsePromises) {
            if (productPromise.status === "fulfilled" && productPromise.value) {
                productsResponses.push(productPromise.value);
            }
        }
        return productsResponses;
    };
    getProducts = async (getProductsQuery, options) => {
        let products = await this.productRepository.getAsync(getProductsQuery, { categories: options.includeCategories });
        let allProducts = await Promise.allSettled(products.map(async (product) => await this.convertProductToProductResponseAsync(product, { includeDiscountAndDiscountPrice: options.includeDiscountAndDiscountPrice ?? true })));
        return allProducts.map(item => {
            if (item.status === "fulfilled" && item.value) {
                return item.value;
            }
        })
            .filter(item => item);
    };
    getProduct = async (productId) => {
        try {
            this.eventTracer.say("Getting product with id: " + productId);
            let productFromDb = await this.getProductByIdOrRaiseException(productId, { discounts: true });
            let product = (await this.convertProductsToProductResponse([productFromDb], { includeDiscountAndDiscountPrice: true }))[0];
            let allCategoriesFiltersDict = await this.getAllCategoryFiltersForProduct(product.categories);
            this.eventTracer.say(`Added all filters to product`);
            product.allFiltersForProduct = allCategoriesFiltersDict;
            this.eventTracer.isSuccessWithResponseAndMessage(product);
            console.log({ pF: product.allFiltersForProduct, product, isProductResponse: product instanceof product_response_1.ProductResponse });
            return product;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    transformCategoryFiltersToDict = (filters) => {
        let filterDict = {};
        for (let filter of filters) {
            filterDict[filter._id.toJSON()] = filter;
        }
        return filterDict;
    };
    isValidDiscount = (discount, productCurrency) => {
        let isValidDiscount = false;
        let timeNow = date_utility_1.default.getUTCNow();
        const pastValidity = discount.validityStartDate > timeNow || discount.validityEndDate < timeNow;
        const useageLimitExceeded = discount.usedCount > discount.useageLimit;
        switch (discount.discountType) {
            case discount_1.DiscountType.bogo:
                break;
            case discount_1.DiscountType.fixed:
                const currencyMisMatch = productCurrency !== discount.currency;
                console.log({ pastValidity, useageLimitExceeded, currencyMisMatch, productCurrency, discountCurrency: discount.currency });
                return !(currencyMisMatch || pastValidity || useageLimitExceeded);
            case discount_1.DiscountType.percentage:
                return !(pastValidity || useageLimitExceeded);
            default:
                break;
        }
        return isValidDiscount;
    };
    getActiveDiscount = async (product) => {
        // RULES: Only One discount is applied per product. The discount applied is the most recent discount
        const discounts = product.discounts;
        // sort discounts by date in descending order
        let cleanedDiscount = [];
        for (let discount of discounts) {
            let productDiscount;
            if (!(discount instanceof discount_1.default)) {
                productDiscount = await this.discountService.getDiscountById(discount);
            }
            else {
                productDiscount = discount;
            }
            cleanedDiscount.push(productDiscount);
        }
        cleanedDiscount.sort((a, b) => {
            let millisecondsForA = a.createdAt?.getTime() ?? 0;
            let millisecondsForB = b.createdAt?.getTime() ?? 0;
            return millisecondsForB - millisecondsForA; // sort date in descending order
        });
        if (!cleanedDiscount.length) {
            return null;
        }
        let discountToApply = cleanedDiscount[0];
        if (this.isValidDiscount(discountToApply, product.currency)) {
            return discountToApply;
        }
        // NOTE:  Use only if we want to apply the most recent *VALID* Discount to this product
        // for(let discount of cleanedDiscount){ 
        //     console.log({"Working": "WORKING", discount})
        //     if(this.isValidDiscount(discount, product.currency)){
        //         return discount;
        //     }
        // }
        return null;
    };
    getDiscountedPriceAndAppliedDiscountsForProduct = async (product) => {
        try {
            console.log("We reach here");
            this.eventTracer.say(`Get Discounted Price And Applied DiscountsForProduct`);
            if (!product.discounts.length) {
                return product;
            }
            let discountedPrice = product.price;
            let priceDiscount;
            product.discountedPrice = product.price;
            let activeDiscount = await this.getActiveDiscount(product);
            if (!activeDiscount) {
                return product;
            }
            switch (activeDiscount.discountType) {
                case discount_1.DiscountType.fixed:
                    priceDiscount = discountedPrice - activeDiscount.value;
                    console.log({ discountedPrice, priceDiscount, activeDiscountVal: activeDiscount.value });
                    if (priceDiscount <= 0) {
                        priceDiscount = discountedPrice;
                    }
                    discountedPrice = priceDiscount;
                    product.discountedPrice = discountedPrice;
                    product.applieddiscounts.push(activeDiscount);
                    break;
                case discount_1.DiscountType.percentage:
                    priceDiscount = discountedPrice * (1 - activeDiscount.value);
                    if (priceDiscount <= 0) {
                        priceDiscount = discountedPrice;
                    }
                    discountedPrice = priceDiscount;
                    product.discountedPrice = discountedPrice;
                    product.applieddiscounts.push(activeDiscount);
                    break;
                case discount_1.DiscountType.bogo:
                    break;
                default:
                    break;
            }
            this.eventTracer.isSuccessWithResponseAndMessage(product);
            return product;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    ///
    /// <summary>Applies Discount to Product</summary>
    applyDiscount = async (productId, discountId) => {
        try {
            this.eventTracer.say(`Apply Discount`);
            const discount = await this.discountService.getDiscountById(discountId);
            if (!discount)
                throw new not_found_exception_1.default(`Discount with id ${discountId} not found`);
            const product = await this.productRepository.getByIdAsync(new mongoose_1.Types.ObjectId(productId));
            if (!product)
                throw new not_found_exception_1.default(`Product with id ${productId} not found`);
            const productDiscountSet = new Set((product.discounts).map(discount => discount.toString()));
            productDiscountSet.add(discountId.toString());
            const updatedDiscountIds = [...productDiscountSet].map(productIdString => new mongoose_1.Types.ObjectId(productIdString));
            product.discounts = updatedDiscountIds;
            await this.productRepository.updateByIdAsync(productId, { discounts: product.discounts });
            this.eventTracer.isSuccessWithResponseAndMessage(product);
            return await this.productRepository.getByIdAsync(new mongoose_1.Types.ObjectId(productId));
            ;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    createOrUseExistingDiscountForProduct = async (productDiscount) => {
        if (productDiscount.discountId) {
            return productDiscount;
        }
        let discount = await this.discountService.createDiscount(productDiscount.discount);
        await this.applyDiscount(new mongoose_1.Types.ObjectId(productDiscount.productId), discount._id);
        productDiscount.discountId = discount._id;
        return productDiscount;
    };
    applyDiscountsToProducts = async (productDiscounts) => {
        try {
            // create product's discount for products with discount 
            let discountsForProducts = [];
            let settleProductsWithNewDiscounts = productDiscounts.map(productAndDiscount => this.createOrUseExistingDiscountForProduct(productAndDiscount));
            let productsAndDiscountsPromise = await Promise.allSettled(settleProductsWithNewDiscounts);
            for (let result of productsAndDiscountsPromise) {
                if (result.status === "fulfilled" && result.value) {
                    discountsForProducts.push(result.value);
                }
            }
            return discountsForProducts;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    getProductsWithDiscountedPriceByIds = async (ids) => {
        console.log({ ids });
        let productsWithDiscount = await this.productRepository.contains({ _id: ids }, { discounts: true });
        let response = await this.convertProductsToProductResponse(productsWithDiscount, { includeDiscountAndDiscountPrice: true });
        return response;
    };
    getProductsWithSpecialOffer = async (specialOfferId) => {
        try {
            this.eventTracer.say(`Getting products with special offer for ${specialOfferId}`);
            specialOfferId = new mongoose_1.Types.ObjectId(specialOfferId);
            const discounts = await this.discountService.getDiscountsInSpecialOffer(specialOfferId);
            let discountIds = discounts.map(discount => discount._id);
            this.eventTracer.say(`Discounts found count : ${discounts.length}`);
            let productsWithDiscounts = [];
            for (let discountId of discountIds) {
                const specialOrderProducts = await this.productRepository.getAsync({ discounts: discountId });
                var specialOrderProductsResponse = await this.convertProductsToProductResponse(specialOrderProducts, { includeDiscountAndDiscountPrice: true });
                productsWithDiscounts = [...productsWithDiscounts, ...specialOrderProductsResponse];
            }
            this.eventTracer.isSuccessWithResponseAndMessage(productsWithDiscounts);
            return productsWithDiscounts;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    addProductsWithDiscountToSpecialOffer = async (specialOfferId, productDiscounts) => {
        try {
            this.eventTracer.say(`AddProductsWithDiscountToSpecialOffer: Getting special offer ${specialOfferId}`);
            this.eventTracer.request = productDiscounts;
            let specialOffer = await this.discountService.getSpecialOffer(specialOfferId);
            if (!specialOffer) {
                throw new not_found_exception_1.default(`Special offer with id ${specialOfferId} not found`);
            }
            let appliedDiscountsAndProducts = await this.applyDiscountsToProducts(productDiscounts);
            this.eventTracer.say(`Applied Discounts length: ${appliedDiscountsAndProducts?.length ?? 0}`);
            let addedDiscountsToSpecialOffers = await this.discountService.addDiscountsToSpecialOffer(specialOfferId, appliedDiscountsAndProducts.map(discountAndProduct => new mongoose_1.Types.ObjectId(discountAndProduct.discountId)));
            this.eventTracer.isSuccessWithResponseAndMessage(addedDiscountsToSpecialOffers);
            return addedDiscountsToSpecialOffers;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    bestSellers = async (query) => {
        let useQuery = {};
        if (query.categoryId) {
            useQuery.categories = new mongoose_1.Types.ObjectId(query.categoryId);
        }
        let response = await this.productRepository.toPagedAsync(useQuery, query.page, query.pageSize, { "inventory.qtySold": -1 });
        let items = (await Promise.allSettled(response.items.map(async (item) => await this.convertProductToProductResponseAsync(item, { includeDiscountAndDiscountPrice: true }))))
            .map(item => {
            if (item.status === "fulfilled" && item.value) {
                return item.value;
            }
        })
            .filter(item => item);
        return new pagination_result_1.PaginationResponse({ ...response, items });
    };
    setProductsAvailabilityPriceAndCurrencyForCartItems = async (items) => {
        let allProducts = [];
        let allProductsWithOnlyIds = [];
        for (let item of items) {
            let product = item.product;
            if (product instanceof mongoose_1.Types.ObjectId || typeof (product) === "string") {
                product = new mongoose_1.Types.ObjectId(product);
                allProductsWithOnlyIds.push(product);
            }
            else {
                allProducts.push(product);
            }
        }
        let productsResponse = await this.getProductsWithDiscountedPriceByIds([...allProductsWithOnlyIds, ...allProducts.map(prod => prod._id)]);
        let productResponseDict = {};
        productsResponse.forEach(productResponse => {
            productResponseDict[productResponse._id.toString()] = productResponse;
        });
        let returnResponse = [];
        for (let item of items) {
            let product = item.product;
            let productId = product instanceof mongoose_1.Types.ObjectId || typeof (product) === "string" ? product.toString() : product._id?.toString() ?? '';
            let productResponse = productResponseDict[productId];
            if (item instanceof cart_request_1.CreateCartItemRequest) {
                item = new cart_1.CartItem({ ...item, product: new mongoose_1.Types.ObjectId(item.product), status: item_status_1.ItemStatus.UNAVAILABLE, priceAtOrder: 0, currency: "" });
            }
            if (!productResponse) {
                item.status = item_status_1.ItemStatus.UNAVAILABLE;
                continue;
            }
            item.priceAtOrder = productResponse.discountedPrice;
            item.currency = productResponse.currency;
            if (item.qty > productResponse.inventory.qtyAvailable) {
                item.status = item_status_1.ItemStatus.QTY_NOT_AVAILABLE;
            }
            else {
                item.status = item_status_1.ItemStatus.AVAILABLE;
            }
            returnResponse.push(item);
        }
        return returnResponse;
    };
};
ProductService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __param(1, (0, tsyringe_1.inject)(category_service_1.IICategoryService)),
    __param(2, (0, tsyringe_1.inject)(product_repository_1.IIProductRepository)),
    __param(3, (0, tsyringe_1.inject)(discount_service_1.IIDiscountService)),
    __param(4, (0, tsyringe_1.inject)(file_service_1.IIFileService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], ProductService);
exports.default = ProductService;
//# sourceMappingURL=product_service.js.map