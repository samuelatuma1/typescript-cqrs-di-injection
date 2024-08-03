import { Types } from "mongoose";
import { CreatePackProduct, CreateProductRequest, UpdatePackProduct, UpdateProductRequest } from "../../../../domain/shop/dto/requests/product_requests";
import Product from "../../../../domain/shop/entity/product";
import { ProductResponse } from "../../../../domain/shop/dto/responses/product_response";
import Category from "../../../../domain/shop/entity/category";

export default interface IProductService {
    createProduct (createProductRequest: CreateProductRequest) : Promise<Product>;
    updateProduct(productId: Types.ObjectId | string, updateProductRequest: UpdateProductRequest): Promise<Product>
    getProduct(productId: Types.ObjectId): Promise<ProductResponse>;
    getCategoryEnriched(categoryId: Types.ObjectId | string, filters: {[key: string]: string}): Promise<Category>;
    applyDiscount(productId: Types.ObjectId, discountId: Types.ObjectId): Promise<Product>;
    getProductsWithDiscountedPriceByIds(ids: Types.ObjectId[]): Promise<ProductResponse[]> 
    getProductsWithSpecialOffer (specialOfferId: Types.ObjectId | string): Promise<ProductResponse[]>
    addPackProduct(productId: Types.ObjectId | string, createPackProduct: CreatePackProduct): Promise<ProductResponse>
    deletePackProduct(productId: Types.ObjectId | string, packProductId: Types.ObjectId | string): Promise<ProductResponse>
    updatePackProduct(productId: Types.ObjectId | string, packProductId: Types.ObjectId | string, packProductUpdate: UpdatePackProduct): Promise<ProductResponse>
}

export const IIProductService = "IProductService";