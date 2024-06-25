import { Types } from "mongoose";
import Category from "../../../../domain/shop/entity/category";
import { CreateCategoryRequest, CreateFilterRequest, UpdateFilterRequest } from "../../../../domain/shop/dto/requests/category_requests";

export default interface ICategoryService {
    createCategory(createCategoryRequest: CreateCategoryRequest): Promise<Category>
    addFiltersToCategory (categoryId: Types.ObjectId, filtersRequest: CreateFilterRequest[]): Promise<Category>
    deleteFilters(categoryId: Types.ObjectId, filterIds: Types.ObjectId[]): Promise<Category>
    updateFilter (categoryId: Types.ObjectId, updateFilter: UpdateFilterRequest) : Promise<Category>
    getCategoriesByIds(categoryIds: string[] | Types.ObjectId[], includeInheritedFilters?: boolean): Promise<Category[]> 
    getCategoryEnriched (categoryId: Types.ObjectId | string, joins: Partial<{[k in keyof Category]: boolean}>): Promise<Category>
}

export const IICategoryService = 'ICategoryService';