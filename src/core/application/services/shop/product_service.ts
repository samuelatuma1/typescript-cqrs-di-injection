import { CreateProductRequest } from "../../../domain/shop/dto/requests/product_requests";
import IProductService from "../../../application/contract/services/shop/product_service";
import { inject, injectable } from "tsyringe";
import IEventTracer, { IIEventTracer } from "../../../application/contract/observability/event_tracer";
import ICategoryService, { IICategoryService } from "../../../application/contract/services/shop/category_service";
import Category from "../../../domain/shop/entity/category";
import ObjectUtility from "../../../application/common/utilities/object_utility";
import { Filter } from "../../../domain/shop/entity/filter";
import FilterForProduct from "../../../domain/shop/entity/filter_for_product";
import Product from "../../../domain/shop/entity/product";
import { Types } from "mongoose";
import { ProductInventory } from "../../../domain/shop/entity/product_inventory";
import IProductRepository, { IIProductRepository } from "../../../application/contract/data_access/shop/product_repository";
import IFileService, { IIFileService } from "../../../application/contract/services/files/file_service";



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
            allCategories = await this.categoryService.getCategoriesWithInheritedFilters(categoriesIds);
            for(let category of allCategories){
                let filters = category.filters;
                for(let filter of filters){
                    allCategoriesFiltersDict[filter._id.toJSON()] = filter
                }
            }
        }

        return allCategoriesFiltersDict
    }
    createProduct = async (createProductRequest: CreateProductRequest) : Promise<Product> => {
        
        try{
            createProductRequest = new CreateProductRequest(createProductRequest);
            this.eventTracer.request = createProductRequest;
            this.eventTracer.say(`Creating new Product`);
            console.log(JSON.stringify(createProductRequest));
            let allCategoriesFiltersDict: {[key: string]: Filter} = await this.getAllCategoryFiltersForProduct(createProductRequest.categories);
            let filtersForProductMap: Map<string, FilterForProduct> = new Map<string, FilterForProduct>();
            
            this.eventTracer.say(`all allCategoriesFiltersDict gotten, creating FilterForProducts`);
            if(ObjectUtility.objectSize(createProductRequest.filters)){
                for(let [key, filterForProduct] of Object.entries(createProductRequest.filters)){
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
}