/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Types } from "mongoose";
import { ApplyProductToDiscount, BestSellersQuery, CreatePackProduct, CreateProductRequest, UpdatePackProduct, UpdateProductRequest } from "../../../../domain/shop/dto/requests/product_requests";
import Product from "../../../../domain/shop/entity/product";
import { ProductResponse } from "../../../../domain/shop/dto/responses/product_response";
import Discount from "../../../../domain/shop/entity/discount";
import { PaginationResponse } from "../../../../domain/authentication/dto/results/pagination_result";
import { CartItem } from "../../../../domain/shop/entity/cart";
import { CreateCartItemRequest } from "../../../../domain/shop/dto/requests/cart_request";
export default interface IProductService {
    createProduct(createProductRequest: CreateProductRequest): Promise<Product>;
    updateProduct(productId: Types.ObjectId | string, updateProductRequest: UpdateProductRequest): Promise<Product>;
    getProduct(productId: Types.ObjectId): Promise<ProductResponse>;
    applyDiscount(productId: Types.ObjectId, discountId: Types.ObjectId): Promise<Product>;
    getProductsWithDiscountedPriceByIds(ids: Types.ObjectId[]): Promise<ProductResponse[]>;
    getProductsWithSpecialOffer(specialOfferId: Types.ObjectId | string): Promise<ProductResponse[]>;
    addPackProduct(productId: Types.ObjectId | string, createPackProduct: CreatePackProduct): Promise<ProductResponse>;
    deletePackProduct(productId: Types.ObjectId | string, packProductId: Types.ObjectId | string): Promise<ProductResponse>;
    updatePackProduct(productId: Types.ObjectId | string, packProductId: Types.ObjectId | string, packProductUpdate: UpdatePackProduct): Promise<ProductResponse>;
    addPackProducts(productId: Types.ObjectId | string, createPackProducts: CreatePackProduct[]): Promise<ProductResponse>;
    addProductsWithDiscountToSpecialOffer(specialOfferId: string | Types.ObjectId, productDiscounts: ApplyProductToDiscount[]): Promise<Discount[]>;
    bestSellers(query: BestSellersQuery): Promise<PaginationResponse<ProductResponse>>;
    getProducts(getProductsQuery: {
        brandId: Types.ObjectId;
    }, options?: {
        includeDiscountAndDiscountPrice: boolean;
        includeCategories?: boolean;
    }): Promise<ProductResponse[]>;
    convertProductsToProductResponse(products: Product[], options?: {
        includeDiscountAndDiscountPrice: boolean;
    }): Promise<ProductResponse[]>;
    getQuery(query: Partial<{
        [key in keyof Product]: any;
    }>, options: {
        includeDiscounts?: boolean;
    }): Promise<Product[]>;
    setProductsAvailabilityPriceAndCurrencyForCartItems(items: (CartItem | CreateCartItemRequest)[]): Promise<CartItem[]>;
}
export declare const IIProductService = "IProductService";
