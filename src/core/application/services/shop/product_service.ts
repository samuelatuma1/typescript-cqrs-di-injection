import { ApplyProductToDiscount, BestSellersQuery, CreateFilterForProduct, CreatePackProduct, CreateProductRequest, UpdatePackProduct, UpdateProductRequest } from "../../../domain/shop/dto/requests/product_requests";
import IProductService from "../../../application/contract/services/shop/product_service";
import { inject, injectable } from "tsyringe";
import IEventTracer, { IIEventTracer } from "../../../application/contract/observability/event_tracer";
import ICategoryService, { IICategoryService } from "../../../application/contract/services/shop/category_service";
import Category from "../../../domain/shop/entity/category";
import ObjectUtility from "../../../application/common/utilities/object_utility";
import { Filter } from "../../../domain/shop/entity/filter";
import FilterForProduct from "../../../domain/shop/entity/filter_for_product";
import Product, { PackProduct, ProductInit } from "../../../domain/shop/entity/product";
import { Types } from "mongoose";
import { ProductInventory } from "../../../domain/shop/entity/product_inventory";
import IProductRepository, { IIProductRepository } from "../../../application/contract/data_access/shop/product_repository";
import IFileService, { IIFileService } from "../../../application/contract/services/files/file_service";
import NotFoundException from "../../../application/common/exceptions/not_found_exception";
import { ProductResponse } from "../../../domain/shop/dto/responses/product_response";
import IDiscountService, { IIDiscountService } from "../../../application/contract/services/shop/discount_service";
import Discount, { DiscountType } from "../../../domain/shop/entity/discount";
import DateUtility from "../../../application/common/utilities/date_utility";
import { Currency } from "../../../domain/common/enum/currency";
import ValidationException from "../../../application/common/exceptions/validation_exception";
import SerializationUtility from "../../../application/common/utilities/serialization_utility";
import { PaginationResponse } from "../../../domain/authentication/dto/results/pagination_result";
import { CartItem } from "../../../domain/shop/entity/cart";
import { ItemStatus } from "../../../domain/shop/enum/item_status";
import { CreateCartItemRequest } from "../../../domain/shop/dto/requests/cart_request";




@injectable()
export default class ProductService implements IProductService {
    private readonly ProductMainImageFolder = "BEAUTY_PRODUCT_MAIN";
    private readonly ProductOtherMediaFolder = "BEAUTY_PRODUCT_OTHERS";
    public constructor(
        @inject(IIEventTracer) private readonly eventTracer: IEventTracer,
        @inject(IICategoryService) private readonly categoryService: ICategoryService,
        @inject(IIProductRepository) private readonly productRepository: IProductRepository,
        @inject(IIDiscountService) private readonly discountService: IDiscountService,
        @inject(IIFileService) private readonly fileService: IFileService,
    ){

    }

    private getProductByIdOrRaiseException = async (productId: string | Types.ObjectId,  joins?: Partial<{[k in keyof Product]: boolean}>): Promise<Product> => {
        productId = new Types.ObjectId(productId);
        let product = await this.productRepository.getByIdAsync(productId, joins);
        if(!product)
            throw new NotFoundException(`Product with id ${productId} not found`);
        return product;
    }

    private convertCreateProductRequestToProduct = (createProductRequest: CreateProductRequest, filtersForProductMap: Map<string, FilterForProduct>): Product => {
        return new Product({
            name: createProductRequest.name,
            desc: createProductRequest.desc ?? "",
            mainImg: createProductRequest.mainImg ?? null,
            otherMedia: createProductRequest.otherMedia ?? [],
            inventory: createProductRequest.inventory ?? new ProductInventory(),
            price: createProductRequest.price,
            currency: createProductRequest.currency,
            filters: filtersForProductMap,
            categories: createProductRequest.categories?.map(cat => new Types.ObjectId(cat)) ?? [],
            extras: createProductRequest.extras,
            isPack: createProductRequest.isPack
        });
    }

    private getAllCategoryFiltersForProduct = async (categoriesIds: string[] | Types.ObjectId[]) : Promise<{[key: string]: Filter}>=> {
        let allCategories: Category[] = []
        let allCategoriesFiltersDict: {[key: string]: Filter} = {}
        if(categoriesIds?.length){
            allCategories = await this.categoryService.getCategoriesByIds(categoriesIds, true);
            for(let category of allCategories){
                let filters = category.filters;
                for(let filter of filters){
                    allCategoriesFiltersDict[filter._id.toJSON()] = filter
                }
            }
        }

        return allCategoriesFiltersDict
    }

    
    private validateAndSetFiltersForProduct = async (categoriesIds: Types.ObjectId[] | string[], filters: {
        [key: string]: CreateFilterForProduct | FilterForProduct}): Promise<Map<string, FilterForProduct>> => {
        let allCategoriesFiltersDict: {[key: string]: Filter} = await this.getAllCategoryFiltersForProduct(categoriesIds);
            let filtersForProductMap: Map<string, FilterForProduct> = new Map<string, FilterForProduct>();
        if(ObjectUtility.objectSize(filters)){
            for(let [key, filterForProduct] of Object.entries(filters)){
                if(allCategoriesFiltersDict.hasOwnProperty(key)){
                    this.eventTracer.say(`Creating filter for filterId : ${key}`)
                    let filterDetails = allCategoriesFiltersDict[key];
                    let productFilter = new FilterForProduct({
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
    }
    createProduct = async (createProductRequest: CreateProductRequest) : Promise<Product> => {
        
        try{
            this.eventTracer.request = createProductRequest;
            this.eventTracer.say(`Creating new Product`);
            createProductRequest = new CreateProductRequest(createProductRequest);
            let filtersForProductMap: Map<string, FilterForProduct> = await this.validateAndSetFiltersForProduct(createProductRequest.categories, createProductRequest.filters)
            this.eventTracer.say(`created Filters For Products`);
            let product: Product = this.convertCreateProductRequestToProduct(createProductRequest, filtersForProductMap);

            if(product.mainImg){
                product.mainImg.folder = this.ProductMainImageFolder;
                this.eventTracer.say(`Saving main image for product`);
                product.mainImg = await this.fileService.uploadFile(product.mainImg);
            }
            if(product.otherMedia?.length){
                product.otherMedia = product.otherMedia.map(media => {
                    media.folder = this.ProductOtherMediaFolder;
                    return media;
                })
                this.eventTracer.say(`Saving other media for product`);
                product.otherMedia = await this.fileService.uploadMultipleFiles(product.otherMedia);
            }
            let savedProduct = await this.productRepository.addAsync(product);

            this.eventTracer.isSuccessWithResponseAndMessage(savedProduct)

            return savedProduct;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }
    addPackProduct = async (productId: Types.ObjectId | string, createPackProduct: CreatePackProduct): Promise<ProductResponse> => {
        // get product and ensure it is a pack.
        productId = new Types.ObjectId(productId);
        const product = await this.productRepository.getByIdAsync(productId);
        if(!product?.isPack){
            throw new ValidationException("Product not a Pack");
        }
        // add product to pack
        console.log("-----------------------------------------------------")
        console.log({PRODUCTIMG: createPackProduct.mainImg, });
        console.log("-----------------------------------------------------")

        if(createPackProduct.mainImg){
            let uploadedImage = await this.fileService.uploadFile(createPackProduct.mainImg);
            console.log({uploadedImage})
            createPackProduct.mainImg = uploadedImage;
        }
        let packProduct =  {...createPackProduct} as PackProduct;
        product.packProducts.push(packProduct);
        await this.productRepository.updateByIdAsync(productId, {packProducts: product.packProducts})
        return this.convertProductToProductResponse(await this.productRepository.getByIdAsync(productId));
        // save
    }

    getQuery = async (query: Partial<{[key in keyof Product]: any}>, options: {includeDiscounts?: boolean}) : Promise<Product[]> => {
        return await this.productRepository.getAsync(query, {discounts: options.includeDiscounts ?? false});
    }

    addPackProducts = async (productId: Types.ObjectId | string, createPackProducts: CreatePackProduct[]): Promise<ProductResponse> => {
        try{
            // get product and ensure it is a pack.
            productId = new Types.ObjectId(productId);
            console.log({createPackProducts: createPackProducts.map(pred => pred.mainImg)})
            this.eventTracer.say(`Adding multiple products of size ${createPackProducts.length}`);
            this.eventTracer.request = createPackProducts;
            let addedProducts: ProductResponse[] = []
            for(let packProduct of createPackProducts){
                let addedProduct = await this.addPackProduct(productId, packProduct);
                addedProducts.push(addedProduct)
            }

            this.eventTracer.isSuccessWithResponseAndMessage(addedProducts)
            return this.convertProductToProductResponse(await this.productRepository.getByIdAsync(productId));
        }

        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
        // save
    }
    
    updatePackProduct = async (productId: Types.ObjectId | string, packProductId: Types.ObjectId | string, packProductUpdate: UpdatePackProduct): Promise<ProductResponse> => {
        try{
            this.eventTracer.say(`Update Pack Product: Product Id${productId}, PackProductId: ${packProductId}`);
            this.eventTracer.request = packProductUpdate;

            const cleanedUpdate = ObjectUtility.removeNullOrUndefinedValuesFromObject(packProductUpdate);
            productId = new Types.ObjectId(productId);
            packProductId = new Types.ObjectId(packProductId);
            let product = await this.productRepository.getByIdAsync(productId);
            if(!product){
                throw new NotFoundException(`Product with id ${productId}`);
            }
            let packProducts = product.packProducts ?? []

            for(let i = 0; i < packProducts.length; i++){
                let packProduct = packProducts[i]
                if(packProduct._id.toString() === packProductId.toString()){
                    this.eventTracer.say(`Pack product to update found`)
                    let updateForProduct = cleanedUpdate;
                    if(cleanedUpdate.mainImg){
                        await this.fileService.deleteFile(packProduct.mainImg?.public_id);
                        let updatedMainImg = await this.fileService.uploadFile(cleanedUpdate.mainImg);
                        updateForProduct.mainImg = updatedMainImg;
                    }
                    if(cleanedUpdate.otherMedia){
                        let newMedia = await this.fileService.uploadMultipleFiles(cleanedUpdate.otherMedia);
                        updateForProduct.otherMedia = [...packProduct.otherMedia, ...newMedia.filter(d => d)]
                    }
                    let updatedPackProduct = ObjectUtility.updateAwithB(packProduct, cleanedUpdate);
                    this.eventTracer.say(`updatedPackProduct Update :\n    ${SerializationUtility.serializeJson(updatedPackProduct)}`);
                    packProducts[i] = updatedPackProduct;

                }
            }
            if(packProducts.length){
                
                await this.productRepository.updateByIdAsync(productId, { packProducts})
            }
            let response = this.convertProductToProductResponse(await this.productRepository.getByIdAsync(productId));
            this.eventTracer.isSuccessWithResponseAndMessage(response);
            return response;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }
    deletePackProduct = async (productId: Types.ObjectId | string, packProductId: Types.ObjectId | string): Promise<ProductResponse> => {
        // get product and ensure it is a pack.
        productId = new Types.ObjectId(productId);
        packProductId = new Types.ObjectId(packProductId)
;        const product = await this.productRepository.getByIdAsync(productId);

        if(!product?.isPack){
            throw new ValidationException("Product not a Pack");
        }
        // add product to pack
        let packProducts = product.packProducts ?? [];
        for(let packProduct of packProducts){
            if(packProduct._id.toString() === packProductId.toString()){
                packProduct.isDeleted = true;
            }
        }
        await this.productRepository.updateByIdAsync(productId, {packProducts: packProducts})
        return this.convertProductToProductResponse(await this.productRepository.getByIdAsync(productId));
        // save
    }
    private buildUpdateData = (product: Product, updateProductRequest: UpdateProductRequest): Partial<Product> => {
        const updateData: Partial<Product> = {};
    
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
    }

    updateProduct = async (productId: Types.ObjectId | string, updateProductRequest: UpdateProductRequest): Promise<Product> => {
        this.eventTracer.say("Updating Product");
        this.eventTracer.request = updateProductRequest
        try{
            // get orignial product
            
            let product = await this.getProductByIdOrRaiseException(productId);
            this.eventTracer.say(`Product gotten for product with id ${productId}`);
            // check and update fields that changed
            let updateData = this.buildUpdateData(product, updateProductRequest);

            if(updateProductRequest.categories && updateProductRequest.categories.length){
                let categoriesIds = updateProductRequest.categories.map(categoryId => new Types.ObjectId(categoryId));
                let updatedCategories = await this.categoryService.getCategoriesByIds(categoriesIds, false);
                updateData.categories = updatedCategories.map(category => category._id);
            }
            
            if(updateProductRequest.filters &&  ObjectUtility.objectSize(updateProductRequest.filters)){
                let categoryIds = updateProductRequest.categories?.length ? updateProductRequest.categories : product.categories as Types.ObjectId[];
                updateData.filters = await this.validateAndSetFiltersForProduct(categoryIds, updateProductRequest.filters)
            }
            
            this.eventTracer.say(`Fields to update ${JSON.stringify(updateData)}`)
            await this.productRepository.updateByIdAsync(product._id, updateData);
            let updatedProduct = await this.productRepository.getByIdAsync(product._id);
            this.eventTracer.isSuccessWithResponseAndMessage(updateProductRequest);

            return updatedProduct;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }

    private convertProductToProductResponse = (product: Product): ProductResponse => {

        let productResponse = new ProductResponse(product as ProductInit);
        productResponse._id = product._id;
        productResponse.packProducts = productResponse.packProducts?.filter(prod => !prod.isDeleted);
        return productResponse
    }

    private convertProductToProductResponseAsync = async (product: Product, options: {includeDiscountAndDiscountPrice?: boolean}): Promise<ProductResponse> => {

        let productResponse = new ProductResponse(product as ProductInit);
        productResponse._id = product._id;
        productResponse.packProducts = productResponse.packProducts?.filter(prod => !prod.isDeleted);
        if(options.includeDiscountAndDiscountPrice ?? false) {
            productResponse = await this.getDiscountedPriceAndAppliedDiscountsForProduct(productResponse);
        }
        return productResponse
    }

    public convertProductsToProductResponse = async (products: Product[], options?: {includeDiscountAndDiscountPrice: boolean}): Promise<ProductResponse[]> => {
        const productsResponses: ProductResponse[] = []
        let productsResponsePromises = await Promise.allSettled(products.map(product => this.convertProductToProductResponseAsync(product, {includeDiscountAndDiscountPrice: options.includeDiscountAndDiscountPrice})));
        for(let productPromise of productsResponsePromises){
            if(productPromise.status === "fulfilled" && productPromise.value){
                productsResponses.push(productPromise.value)
            }
        }
        return productsResponses
    }

    getProducts = async (getProductsQuery: {brandId: Types.ObjectId}, options?: {includeDiscountAndDiscountPrice: boolean, includeCategories?: boolean}): Promise<ProductResponse[]> => {
        let products = await this.productRepository.getAsync(getProductsQuery, {categories: options.includeCategories});
        let allProducts = await Promise.allSettled(products.map(async product => await this.convertProductToProductResponseAsync(product, {includeDiscountAndDiscountPrice: options.includeDiscountAndDiscountPrice ?? true})));
        return allProducts.map(
            item => {
                if(item.status === "fulfilled" && item.value){
                    return item.value;
                }
            }
        )
        .filter(item => item);
    }
    getProduct = async (productId: Types.ObjectId): Promise<ProductResponse> => {
        try{

            this.eventTracer.say("Getting product with id: " + productId);
            let productFromDb = await this.getProductByIdOrRaiseException(productId, {discounts: true});
            let product = (await this.convertProductsToProductResponse([productFromDb], {includeDiscountAndDiscountPrice: true}))[0];
            let allCategoriesFiltersDict: {[key: string]: Filter} = await this.getAllCategoryFiltersForProduct(product.categories as Types.ObjectId[]);

            this.eventTracer.say(`Added all filters to product`);
            product.allFiltersForProduct = allCategoriesFiltersDict;
            this.eventTracer.isSuccessWithResponseAndMessage(product);
            console.log({pF: product.allFiltersForProduct, product, isProductResponse: product instanceof ProductResponse})
            return product;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }
    transformCategoryFiltersToDict = (filters: Filter[]) : {[key: string]: Filter}=> {
        let filterDict: {[key: string]: Filter} = {}
        for(let filter of filters){
            filterDict[filter._id.toJSON()] = filter;
        }

        return filterDict;
    }

    private isValidDiscount = (discount: Discount, productCurrency?: Currency | string): boolean => {
        let isValidDiscount = false;
        let timeNow =  DateUtility.getUTCNow();
        const pastValidity =  discount.validityStartDate > timeNow || discount.validityEndDate < timeNow;
        const useageLimitExceeded = discount.usedCount > discount.useageLimit;
        switch (discount.discountType){
            case DiscountType.bogo:
                
                break;
            case DiscountType.fixed:
                const currencyMisMatch = productCurrency !== discount.currency;
                console.log({pastValidity, useageLimitExceeded, currencyMisMatch, productCurrency, discountCurrency:discount.currency })
                return !(currencyMisMatch || pastValidity || useageLimitExceeded);

            case DiscountType.percentage:
                return !(pastValidity || useageLimitExceeded);
            default:
                break;
        }

        return isValidDiscount;
    }
    private getActiveDiscount = async (product: ProductResponse): Promise<Discount | null> => {
        // RULES: Only One discount is applied per product. The discount applied is the most recent discount
        const discounts = product.discounts;
        // sort discounts by date in descending order
        let cleanedDiscount: Discount[] = [];
        for(let discount of discounts) {
            let productDiscount: Discount;
            if(!(discount instanceof Discount)){
                productDiscount = await this.discountService.getDiscountById(discount);
            }else{
                productDiscount = discount;
            }
            cleanedDiscount.push(productDiscount);
        }
        cleanedDiscount.sort((a: Discount, b: Discount) => {
            let millisecondsForA = a.createdAt?.getTime() ?? 0
            let millisecondsForB = b.createdAt?.getTime() ?? 0
            return millisecondsForB - millisecondsForA; // sort date in descending order
        })
        if(!cleanedDiscount.length){
            return null;
        }
        let discountToApply = cleanedDiscount[0];
        if(this.isValidDiscount(discountToApply, product.currency)){
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
    }
    getDiscountedPriceAndAppliedDiscountsForProduct = async (product: ProductResponse) : Promise<ProductResponse> => {
        try{
            console.log("We reach here")
            this.eventTracer.say(`Get Discounted Price And Applied DiscountsForProduct`)
            if(!product.discounts.length){
                return product;
            }
            let discountedPrice = product.price;
            let priceDiscount: number;
            product.discountedPrice = product.price;
            let activeDiscount = await this.getActiveDiscount(product);
            if(!activeDiscount){
                return product;
            }
            switch(activeDiscount.discountType){
                case DiscountType.fixed:
                    priceDiscount = discountedPrice - activeDiscount.value;
                    console.log({discountedPrice, priceDiscount, activeDiscountVal:  activeDiscount.value})
                    if(priceDiscount <= 0){
                        priceDiscount = discountedPrice;
                    }
                    discountedPrice = priceDiscount;
                    product.discountedPrice = discountedPrice;
                    product.applieddiscounts.push(activeDiscount);
                    break;
                case DiscountType.percentage:
                    priceDiscount = discountedPrice *  (1 - activeDiscount.value);
                    if(priceDiscount <= 0){
                        priceDiscount = discountedPrice;
                    }
                    discountedPrice = priceDiscount;
                    product.discountedPrice = discountedPrice;
                    product.applieddiscounts.push(activeDiscount);
                    break;
                case DiscountType.bogo:
                    break;
                default :
                break;
            }
            this.eventTracer.isSuccessWithResponseAndMessage(product);
            return product;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }
    ///
    /// <summary>Applies Discount to Product</summary>
    applyDiscount = async (productId: Types.ObjectId, discountId: Types.ObjectId): Promise<Product> => {
        try{
            this.eventTracer.say(`Apply Discount`);
            const discount = await this.discountService.getDiscountById(discountId);
            if(!discount) throw new NotFoundException(`Discount with id ${discountId} not found`);

            const product = await this.productRepository.getByIdAsync(new Types.ObjectId(productId));
            if(!product) throw new NotFoundException(`Product with id ${productId} not found`);
            
            const productDiscountSet = new Set((product.discounts).map(discount => discount.toString()));
            productDiscountSet.add(discountId.toString())
            const updatedDiscountIds = [...productDiscountSet].map(productIdString => new Types.ObjectId(productIdString));
            product.discounts = updatedDiscountIds;
            await this.productRepository.updateByIdAsync(productId, {discounts: product.discounts})

            this.eventTracer.isSuccessWithResponseAndMessage(product);
            return await this.productRepository.getByIdAsync(new Types.ObjectId(productId));;
        }
        catch(ex){
             this.eventTracer.isExceptionWithMessage(`${ex}`);
             throw ex;
         }
    }

    createOrUseExistingDiscountForProduct = async (productDiscount: ApplyProductToDiscount) => {
        if(productDiscount.discountId){
            return productDiscount
        }
        let discount = await this.discountService.createDiscount(productDiscount.discount);
        await this.applyDiscount(new Types.ObjectId(productDiscount.productId), discount._id);
        productDiscount.discountId = discount._id;

        return productDiscount;
    }
    applyDiscountsToProducts = async (productDiscounts: ApplyProductToDiscount[]): Promise<ApplyProductToDiscount[]> => {
        try{
            // create product's discount for products with discount 
            let discountsForProducts: ApplyProductToDiscount[] = []
            let settleProductsWithNewDiscounts = productDiscounts.map(productAndDiscount => this.createOrUseExistingDiscountForProduct(productAndDiscount))
            let productsAndDiscountsPromise = await Promise.allSettled(settleProductsWithNewDiscounts)
            for(let result of productsAndDiscountsPromise){
                if(result.status === "fulfilled" && result.value){
                    discountsForProducts.push(result.value);
                }
            }

            return discountsForProducts;            
        }
        catch(ex){
             this.eventTracer.isExceptionWithMessage(`${ex}`);
             throw ex;
         }
    }

    getProductsWithDiscountedPriceByIds = async (ids: Types.ObjectId[]): Promise<ProductResponse[]> => {
        console.log({ids})
        let productsWithDiscount = await this.productRepository.contains({_id: ids}, {discounts: true});
        

        let response = await this.convertProductsToProductResponse(productsWithDiscount, {includeDiscountAndDiscountPrice: true});
        
        return response
    }

    

    getProductsWithSpecialOffer = async (specialOfferId: Types.ObjectId | string): Promise<ProductResponse[]> => {
        try{
            this.eventTracer.say(`Getting products with special offer for ${specialOfferId}`);
            specialOfferId = new Types.ObjectId(specialOfferId);
            const discounts = await this.discountService.getDiscountsInSpecialOffer(specialOfferId);
            let discountIds: Types.ObjectId[] = discounts.map(discount => discount._id);
            this.eventTracer.say(`Discounts found count : ${discounts.length}`)
            let productsWithDiscounts: ProductResponse[] = [] 
            for(let discountId of discountIds){
                const specialOrderProducts = await this.productRepository.getAsync({discounts: discountId});
                var specialOrderProductsResponse = await this.convertProductsToProductResponse(specialOrderProducts, {includeDiscountAndDiscountPrice: true});
                productsWithDiscounts = [...productsWithDiscounts, ...specialOrderProductsResponse];
            }

            this.eventTracer.isSuccessWithResponseAndMessage(productsWithDiscounts);
            return productsWithDiscounts;
        }

        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }

    addProductsWithDiscountToSpecialOffer = async (specialOfferId: string | Types.ObjectId, productDiscounts: ApplyProductToDiscount[]) : Promise<Discount[]>=> {
        try{
            this.eventTracer.say(`AddProductsWithDiscountToSpecialOffer: Getting special offer ${specialOfferId}`);
            this.eventTracer.request = productDiscounts;
            let specialOffer = await this.discountService.getSpecialOffer(specialOfferId);
            
            if(!specialOffer){
                throw new NotFoundException(`Special offer with id ${specialOfferId} not found`);
            }

            let appliedDiscountsAndProducts = await this.applyDiscountsToProducts(productDiscounts);
            this.eventTracer.say(`Applied Discounts length: ${appliedDiscountsAndProducts?.length ?? 0}`)
            let addedDiscountsToSpecialOffers =  await this.discountService.addDiscountsToSpecialOffer(specialOfferId, appliedDiscountsAndProducts.map(discountAndProduct => new Types.ObjectId(discountAndProduct.discountId)));
            this.eventTracer.isSuccessWithResponseAndMessage(addedDiscountsToSpecialOffers);

            return addedDiscountsToSpecialOffers;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }

    bestSellers = async (query: BestSellersQuery): Promise<PaginationResponse<ProductResponse>> => {
        let useQuery : {[key in keyof Partial<Product>]: any}= {}
        if(query.categoryId){
            useQuery.categories = new Types.ObjectId(query.categoryId)
        }
        let response = await this.productRepository.toPagedAsync(useQuery, query.page, query.pageSize, {"inventory.qtySold": -1})
        let items = (await Promise.allSettled(response.items.map(async item =>  await this.convertProductToProductResponseAsync(item, {includeDiscountAndDiscountPrice: true}))))
            .map(
                item => {
                    if(item.status === "fulfilled" && item.value){
                        return item.value;
                    }
                }
            )
            .filter(item => item);
        return new PaginationResponse<ProductResponse>({...response, items});
    }

    
    public setProductsAvailabilityPriceAndCurrencyForCartItems = async (items: (CartItem | CreateCartItemRequest)[]): Promise<CartItem[]> => {
        let allProducts: Product[] = [];
        let allProductsWithOnlyIds: Types.ObjectId[] = []
        for(let item of items){
            let product = item.product;
            if(product instanceof Types.ObjectId || typeof(product) === "string"){
                product = new Types.ObjectId(product);
                allProductsWithOnlyIds.push(product)
            }
            else{
                allProducts.push(product)
            }
        }
        let productsResponse: ProductResponse[] = await this.getProductsWithDiscountedPriceByIds([...allProductsWithOnlyIds, ...allProducts.map(prod => prod._id)]);

        let productResponseDict : {[key : string]: ProductResponse} = {}
        productsResponse.forEach(productResponse => {
            productResponseDict[productResponse._id.toString()] = productResponse
        })
        let returnResponse : CartItem[] = []
        for(let item of items){
            let product = item.product;
            let productId = product instanceof Types.ObjectId || typeof(product) === "string" ? product.toString() : product._id?.toString() ?? '';
            let productResponse : ProductResponse = productResponseDict[productId];
            if(item instanceof CreateCartItemRequest){
                item = new CartItem({...item, product: new Types.ObjectId(item.product), status: ItemStatus.UNAVAILABLE, priceAtOrder: 0, currency: ""});
            }
            if(!productResponse){
                item.status = ItemStatus.UNAVAILABLE;
                continue;
            }
            item.priceAtOrder = productResponse.discountedPrice;
            item.currency = productResponse.currency;
            if(item.qty > productResponse.inventory.qtyAvailable){
                item.status = ItemStatus.QTY_NOT_AVAILABLE;
            }
            else{
                item.status = ItemStatus.AVAILABLE
            }
            returnResponse.push(item as CartItem);

        }

        return returnResponse;
    }
    


}


