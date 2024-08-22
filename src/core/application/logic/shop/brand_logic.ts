import { inject, injectable } from "tsyringe";
import IEventTracer, { IIEventTracer } from "../../../application/contract/observability/event_tracer";
import ICategoryService, { IICategoryService } from "../../../application/contract/services/shop/category_service";
import IProductRepository, { IIProductRepository } from "../../../application/contract/data_access/shop/product_repository";
import IBrandService, { IIBrandService } from "../../../application/contract/services/shop/brand_service";
import { Types } from "mongoose";
import NotFoundException from "../../../application/common/exceptions/not_found_exception";
import IProductService, { IIProductService } from "../../../application/contract/services/shop/product_service";
import Category from "../../../domain/shop/entity/category";
import { Filter } from "../../../domain/shop/entity/filter";
import { ProductResponse } from "../../../domain/shop/dto/responses/product_response";
import IBrandLogic from "../../../application/contract/logic/shop/brand_logic";
import { CreateBrandRequest } from "../../../domain/shop/dto/requests/brand_requests";
import { BrandResponse } from "../../../domain/shop/dto/responses/brand_response";

@injectable()
export default class BrandLogic implements IBrandLogic{
    public constructor(
        @inject(IIEventTracer) private readonly eventTracer: IEventTracer,
        @inject(IICategoryService) private readonly categoryService: ICategoryService,
        @inject(IIProductRepository) private readonly productRepository: IProductRepository,
        @inject(IIProductService) private readonly productService: IProductService,
        @inject(IIBrandService) private readonly brandService: IBrandService
    ){
    }

    private updateBrandCategoriesWithProductCategories = async (products: ProductResponse[]): Promise<Category[]> => {
        let brandCategories: {[key: string]: Category} = {}
        for(let product of products){
            product.categories.forEach(async cat => {
                let category: Category
                
                if (cat instanceof Types.ObjectId){
                    let possibleCategory = (await this.categoryService.getCategoriesByIds([cat]))[0] ?? null;
                    if(possibleCategory){
                        category = possibleCategory;
                    }
                }
                else{
                    category = cat
                }

                let categoryFilters: Filter[] = category?.filters ?? [];
                let productCategoryfilters: Filter[] = []
                for(let filter of categoryFilters){
                    let productHasFilter = product.filters.get(filter._id.toString());
                    if(productHasFilter){
                        productCategoryfilters.push(filter)
                    }
                }
                category.filters = productCategoryfilters;
                let categoryIdString = category._id.toString();
                let categoryToSave: Category = brandCategories[categoryIdString]
                if(categoryToSave){
                    
                    categoryToSave.filters = this.getUniqueFiltersForCategories(category, categoryToSave);
                }
                else{
                    categoryToSave = category
                }
                
                brandCategories[categoryIdString] = categoryToSave;

            })
        }

        return Object.values(brandCategories);
    }

    private getUniqueFiltersForCategories = (category: Category, categoryToSave?: Category): Filter[]  => {
        let filterIdFilterMap: Map<string, Filter> = new Map();
        const addToFilterIdMap = (category?: Category) => {
            for(let filter of category?.filters ?? []){
                let filterIdString = filter._id.toString();
                filterIdFilterMap.set(filterIdString, filter); 
            }
        }

        addToFilterIdMap(category);
        addToFilterIdMap(categoryToSave);

        return Array.from(filterIdFilterMap.values());
    }

    addProductsToBrand = async (brandId: string | Types.ObjectId, productsIds: string[] | Types.ObjectId[]): Promise<BrandResponse> => {
        this.eventTracer.say("Add Product to Brand")
        console.log("Iscaba")
        let brand = await this.brandService.getBrand(new Types.ObjectId(brandId));
        if(!brand){
            throw new NotFoundException(`Brand not found`)
        }
        const products = await this.productRepository.contains({_id: productsIds.map(pro => new Types.ObjectId(pro))});
        console.log(products)
        await this.productRepository.updateManyAsync({_id: {$in: products.map(prod => prod._id)}}, {brandId: new Types.ObjectId(brandId)})
        return await this.getBrand((new Types.ObjectId(brandId)))
    }

    getBrand = async (brandId: Types.ObjectId | string, options?: {includeProducts: boolean, includeCategories: boolean, includeFilters: boolean}): Promise<BrandResponse> => {
        brandId = new Types.ObjectId(brandId)
        let brand = await this.brandService.getBrand(brandId);
        if(!brand){
            throw new NotFoundException(`Brand not found`)
        }
        let products = await this.productService.getProducts({brandId}, {includeDiscountAndDiscountPrice: true, includeCategories: true});
        let brandCategories: Category[] = await this.updateBrandCategoriesWithProductCategories(products);
        brand.categories = brandCategories;
        brand.products = products;
        return brand;
    }

    createBrand = async (createBrandRequest: CreateBrandRequest) : Promise<BrandResponse> => {
        return await this.brandService.createBrand(createBrandRequest);
    }

    

}