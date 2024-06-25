import { CreateFilterForProduct, CreateProductRequest, UpdateProductRequest } from "../../../domain/shop/dto/requests/product_requests";
import IProductService from "../../../application/contract/services/shop/product_service";
import { inject, injectable } from "tsyringe";
import IEventTracer, { IIEventTracer } from "../../../application/contract/observability/event_tracer";
import ICategoryService, { IICategoryService } from "../../../application/contract/services/shop/category_service";
import Category from "../../../domain/shop/entity/category";
import ObjectUtility from "../../../application/common/utilities/object_utility";
import { Filter } from "../../../domain/shop/entity/filter";
import FilterForProduct from "../../../domain/shop/entity/filter_for_product";
import Product, { ProductInit } from "../../../domain/shop/entity/product";
import { Types } from "mongoose";
import { ProductInventory } from "../../../domain/shop/entity/product_inventory";
import IProductRepository, { IIProductRepository } from "../../../application/contract/data_access/shop/product_repository";
import IFileService, { IIFileService } from "../../../application/contract/services/files/file_service";
import NotFoundException from "../../../application/common/exceptions/not_found_exception";
import { ProductResponse } from "../../..//domain/shop/dto/responses/product_response";




@injectable()
export default class ProductService implements IProductService {
    private readonly ProductMainImageFolder = "BEAUTY_PRODUCT_MAIN";
    private readonly ProductOtherMediaFolder = "BEAUTY_PRODUCT_OTHERS";
    public constructor(
        @inject(IIEventTracer) private readonly eventTracer: IEventTracer,
        @inject(IICategoryService) private readonly categoryService: ICategoryService,
        @inject(IIProductRepository) private readonly productRepository: IProductRepository,
        @inject(IIFileService) private readonly fileService: IFileService
    ){

    }

    private getProductByIdOrRaiseException = async (productId: string | Types.ObjectId): Promise<Product> => {
        productId = new Types.ObjectId(productId);
        let product = await this.productRepository.getByIdAsync(productId);
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
            extras: createProductRequest.extras
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
        return new ProductResponse(product as ProductInit);
    }

    getProduct = async (productId: Types.ObjectId): Promise<ProductResponse> => {
        try{

            this.eventTracer.say("Getting product with id: " + productId);
            let product = await this.getProductByIdOrRaiseException(productId) as ProductResponse;
            product = this.convertProductToProductResponse(product);
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
    getCategoryEnriched = async (categoryId: Types.ObjectId | string, filters: {[key: string]: string}): Promise<Category> => {
       try{
        console.log({filters})
         // get category
         this.eventTracer.say("Get Category Product");
         let category = await this.categoryService.getCategoryEnriched(categoryId, {subCategories: true, filters: true});
         console.log({category})
         let cleanedFilters: {[key: string]: string[] | number[]} = {};
         this.eventTracer.say(`Cleaning filters`)
         for(let [filterName, filterValuesAsString] of Object.entries(filters)){
             let filterValues = filterValuesAsString.split(",");
             cleanedFilters[filterName] = filterValues;
         }
         
         let categoryFiltersAsDict : {[key: string]: Filter} = this.transformCategoryFiltersToDict(category.filters);
         let validSearchFiltersWithIdAsKey: {[key: string]: Filter} = {}
         let validSearchFiltersIds : Set<string> = new Set();
         // apply filter logic on product
         // get filters from category based on filter names , convert to filter id for easier search
         this.eventTracer.say(`Getting valid filters ids`);
         for(let filter in filters){
            this.eventTracer.say(`DEBUG!:exploring ${filter} found`);

             let filterInCategory = category.filters.find(categoryFilter => {
                console.log({categoryFilter, categoryFiltersAsDict})
                return categoryFilter.name.toLowerCase() === filter.toLowerCase() && categoryFiltersAsDict.hasOwnProperty(categoryFilter._id.toJSON())});
             
             if(filterInCategory){
                 this.eventTracer.say(`DEBUG!: ${filterInCategory.name}`);
                 validSearchFiltersWithIdAsKey[filterInCategory._id.toJSON()] = filterInCategory;
                 validSearchFiltersIds.add(filterInCategory._id.toJSON());
             }
         }
         this.eventTracer.say(`Valid search filter ids gotten : ${validSearchFiltersIds}`)
         // get filter ids
         let allProductsWithCategoryId = await this.productRepository.getAsync({
             categories: category._id
         });
         let productsMatchingFilters: Product[] = [];
         // apply filters
         if(!ObjectUtility.objectSize(validSearchFiltersWithIdAsKey)){ // if no valid filter then all products are valid searches
             this.eventTracer.say(`All products are valid searches`);
             productsMatchingFilters = allProductsWithCategoryId;
         }  
         else{
             this.eventTracer.say(`narrowing down products based on valid search filters`)
             for(let product of allProductsWithCategoryId){
 
                 let productMatchesAllFilters = true;
                 
                 for(let filterId in validSearchFiltersWithIdAsKey){
                     let productFilterValue = product.filters.get(filterId)
                     if(!productFilterValue){
                         productMatchesAllFilters = false;
                         this.eventTracer.say(`DEBUG ONLY!!: Product does not have filter with name ${validSearchFiltersWithIdAsKey[filterId].name}`)
                         break; // move on to the next product as it does not have all needed filters
                     }
                     // get category filter value as well as type
                     let filterDetailsFromCategory = categoryFiltersAsDict[filterId];
                     switch(filterDetailsFromCategory.filterType.toLowerCase()){ // get filter type 
                         case "string":
                         default:
                             let filterName = filterDetailsFromCategory.name// full circle back to name LOL
                             let selectedSearchValuesForFilter = cleanedFilters[filterName] as string[]
                             let productValuesForFilter = product.filters.get(filterId)?.values;
                             let doesProductMatchFilter = productValuesForFilter?.some(productValue => selectedSearchValuesForFilter.includes(productValue))
                             if(!doesProductMatchFilter){
                                 this.eventTracer.say(`DEBUG ONLY!!: Product does not have a valid value for filter with name ${validSearchFiltersWithIdAsKey[filterId].name}, filter values ${selectedSearchValuesForFilter}, product values: ${productValuesForFilter}`)
 
                                 productMatchesAllFilters = false;
                                 break;
                             }
                     }
                     // if type string or default
                     // 
                 }
                 if(productMatchesAllFilters){
                    this.eventTracer.say("DEBUG: Product matches filters")
                     productsMatchingFilters.push(product);
                 }
             }
         } 
 
         category.products = productsMatchingFilters;
        //  this.eventTracer.isSuccessWithResponseAndMessage(category);
         this.eventTracer.isSuccessWithResponseAndMessage(categoryFiltersAsDict)
         return category;
       }

       catch(ex){
        this.eventTracer.isExceptionWithMessage(`${ex}`);
        throw ex;
    }
    }
}
