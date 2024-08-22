import Category from "../../../../domain/shop/entity/category"
import { Types } from "mongoose"

export interface ICategoryLogic {
    getCategoryEnriched(categoryId: Types.ObjectId | string, filters: {[key: string]: string}, page: number, pageSize: number): Promise<Category>
}

export const IICategoryLogic = "ICategoryLogic"