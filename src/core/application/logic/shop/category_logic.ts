import { ApplyProductToDiscount, BestSellersQuery, CreateFilterForProduct, CreatePackProduct, CreateProductRequest, UpdatePackProduct, UpdateProductRequest } from "../../../domain/shop/dto/requests/product_requests";
import IProductService, { IIProductService } from "../../../application/contract/services/shop/product_service";
import { inject, injectable } from "tsyringe";
import IEventTracer, { IIEventTracer } from "../../../application/contract/observability/event_tracer";
import ICategoryService, { IICategoryService } from "../../../application/contract/services/shop/category_service";
import Category from "../../../domain/shop/entity/category";
import ObjectUtility from "../../../application/common/utilities/object_utility";
import { Filter } from "../../../domain/shop/entity/filter";
import Product, { PackProduct, ProductInit } from "../../../domain/shop/entity/product";
import { Types } from "mongoose";
import { ProductResponse } from "../../../domain/shop/dto/responses/product_response";
import PaginationUtility from "../../../application/common/utilities/pagination_utility";
import { ICategoryLogic } from "../../../application/contract/logic/shop/category_logic";



@injectable()
export default class CategoryLogic implements ICategoryLogic{
    public constructor(
        @inject(IIEventTracer) private readonly eventTracer: IEventTracer,
        @inject(IICategoryService) private readonly categoryService: ICategoryService,
        @inject(IIProductService) private readonly productService: IProductService
    ){

    }

    transformCategoryFiltersToDict = (filters: Filter[]) : {[key: string]: Filter}=> {
        let filterDict: {[key: string]: Filter} = {}
        for(let filter of filters){
            filterDict[filter._id.toJSON()] = filter;
        }

        return filterDict;
    }

    getCategoryEnriched = async (categoryId: Types.ObjectId | string, filters: {[key: string]: string}, page: number = 0, pageSize: number = 10): Promise<Category> => {
        try{
          // get category
          this.eventTracer.say("Get Category Product");
          let category = await this.categoryService.getCategoryEnriched(categoryId, {subCategories: true, filters: true});
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
                  validSearchFiltersWithIdAsKey[filterInCategory._id.toString()] = filterInCategory;
                  validSearchFiltersIds.add(filterInCategory._id.toString());
              }
          }
          this.eventTracer.say(`Valid search filter ids gotten : ${validSearchFiltersIds}`)
          // get filter ids
         
          let allProductsWithCategoryId = await this.productService.getQuery({
              categories: category._id
          }, {includeDiscounts: true});
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
          
          const productsResponse = await this.productService.convertProductsToProductResponse(productsMatchingFilters, {includeDiscountAndDiscountPrice: true})
          const paginatedProducts = PaginationUtility.paginateData<ProductResponse>( productsResponse, page, pageSize);
 
          category.pagedProducts = paginatedProducts;
          this.eventTracer.isSuccessWithResponseAndMessage(category)
          return category;
        }
        catch(ex){
             this.eventTracer.isExceptionWithMessage(`${ex}`);
             throw ex;
         }
     }

}