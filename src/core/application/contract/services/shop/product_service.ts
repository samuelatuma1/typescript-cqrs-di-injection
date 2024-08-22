import { Types } from "mongoose";
import { ApplyProductToDiscount, BestSellersQuery, CreatePackProduct, CreateProductRequest, UpdatePackProduct, UpdateProductRequest } from "../../../../domain/shop/dto/requests/product_requests";
import Product from "../../../../domain/shop/entity/product";
import { ProductResponse } from "../../../../domain/shop/dto/responses/product_response";
import Category from "../../../../domain/shop/entity/category";
import Discount from "../../../../domain/shop/entity/discount";
import { PaginationResponse } from "../../../../domain/authentication/dto/results/pagination_result";
import { CartItem } from "../../../../domain/shop/entity/cart";
import OrderItem from "../../../../domain/shop/entity/order_item";
import { CreateCartItemRequest } from "../../../../domain/shop/dto/requests/cart_request";

export default interface IProductService {
    createProduct (createProductRequest: CreateProductRequest) : Promise<Product>;
    updateProduct(productId: Types.ObjectId | string, updateProductRequest: UpdateProductRequest): Promise<Product>
    getProduct(productId: Types.ObjectId): Promise<ProductResponse>;
    applyDiscount(productId: Types.ObjectId, discountId: Types.ObjectId): Promise<Product>;
    getProductsWithDiscountedPriceByIds(ids: Types.ObjectId[]): Promise<ProductResponse[]> 
    getProductsWithSpecialOffer (specialOfferId: Types.ObjectId | string): Promise<ProductResponse[]>
    addPackProduct(productId: Types.ObjectId | string, createPackProduct: CreatePackProduct): Promise<ProductResponse>
    deletePackProduct(productId: Types.ObjectId | string, packProductId: Types.ObjectId | string): Promise<ProductResponse>
    updatePackProduct(productId: Types.ObjectId | string, packProductId: Types.ObjectId | string, packProductUpdate: UpdatePackProduct): Promise<ProductResponse>
    addPackProducts(productId: Types.ObjectId | string, createPackProducts: CreatePackProduct[]): Promise<ProductResponse> 
    addProductsWithDiscountToSpecialOffer (specialOfferId: string | Types.ObjectId, productDiscounts: ApplyProductToDiscount[]): Promise<Discount[]>;
    bestSellers(query: BestSellersQuery): Promise<PaginationResponse<ProductResponse>>
    getProducts (getProductsQuery: {brandId: Types.ObjectId}, options?: {includeDiscountAndDiscountPrice: boolean, includeCategories?: boolean}): Promise<ProductResponse[]>
    convertProductsToProductResponse(products: Product[], options?: {includeDiscountAndDiscountPrice: boolean}): Promise<ProductResponse[]>
    getQuery(query: Partial<{[key in keyof Product]: any}>, options: {includeDiscounts?: boolean}) : Promise<Product[]>
    setProductsAvailabilityPriceAndCurrencyForCartItems(items: (CartItem | CreateCartItemRequest)[]): Promise<CartItem[]>
}

export const IIProductService = "IProductService";