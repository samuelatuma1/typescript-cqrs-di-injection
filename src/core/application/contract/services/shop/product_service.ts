import { Types } from "mongoose";
import { CreateProductRequest, UpdateProductRequest } from "../../../../domain/shop/dto/requests/product_requests";
import Product from "../../../../domain/shop/entity/product";
import { ProductResponse } from "../../../../domain/shop/dto/responses/product_response";
import Category from "../../../../domain/shop/entity/category";

export default interface IProductService {
    createProduct (createProductRequest: CreateProductRequest) : Promise<Product>;
    updateProduct(productId: Types.ObjectId | string, updateProductRequest: UpdateProductRequest): Promise<Product>
    getProduct(productId: Types.ObjectId): Promise<ProductResponse>;
    getCategoryEnriched(categoryId: Types.ObjectId | string, filters: {[key: string]: string}): Promise<Category> 
}

export const IIProductService = "IProductService";