import { Types } from "mongoose";
import Category from "../../../../domain/shop/entity/category";
import { CreateCategoryRequest, CreateFilterRequest, UpdateFilterRequest } from "../../../../domain/shop/dto/requests/category_requests";

export default interface ICategoryService {
    createCategory(createCategoryRequest: CreateCategoryRequest): Promise<Category>
    addFiltersToCategory (categoryId: Types.ObjectId, filtersRequest: CreateFilterRequest[]): Promise<Category>
    deleteFilters(categoryId: Types.ObjectId, filterIds: Types.ObjectId[]): Promise<Category>
    updateFilter (categoryId: Types.ObjectId, updateFilter: UpdateFilterRequest) : Promise<Category>
    getCategoriesWithInheritedFilters(categoryIds: string[] | Types.ObjectId[]): Promise<Category[]> 
}

export const IICategoryService = 'ICategoryService';