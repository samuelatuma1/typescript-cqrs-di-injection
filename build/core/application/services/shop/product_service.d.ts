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
import { ApplyProductToDiscount, BestSellersQuery, CreatePackProduct, CreateProductRequest, UpdatePackProduct, UpdateProductRequest } from "../../../domain/shop/dto/requests/product_requests";
import IProductService from "../../../application/contract/services/shop/product_service";
import IEventTracer from "../../../application/contract/observability/event_tracer";
import ICategoryService from "../../../application/contract/services/shop/category_service";
import { Filter } from "../../../domain/shop/entity/filter";
import Product from "../../../domain/shop/entity/product";
import { Types } from "mongoose";
import IProductRepository from "../../../application/contract/data_access/shop/product_repository";
import IFileService from "../../../application/contract/services/files/file_service";
import { ProductResponse } from "../../../domain/shop/dto/responses/product_response";
import IDiscountService from "../../../application/contract/services/shop/discount_service";
import Discount from "../../../domain/shop/entity/discount";
import { PaginationResponse } from "../../../domain/authentication/dto/results/pagination_result";
import { CartItem } from "../../../domain/shop/entity/cart";
import { CreateCartItemRequest } from "../../../domain/shop/dto/requests/cart_request";
export default class ProductService implements IProductService {
    private readonly eventTracer;
    private readonly categoryService;
    private readonly productRepository;
    private readonly discountService;
    private readonly fileService;
    private readonly ProductMainImageFolder;
    private readonly ProductOtherMediaFolder;
    constructor(eventTracer: IEventTracer, categoryService: ICategoryService, productRepository: IProductRepository, discountService: IDiscountService, fileService: IFileService);
    private getProductByIdOrRaiseException;
    private convertCreateProductRequestToProduct;
    private getAllCategoryFiltersForProduct;
    private validateAndSetFiltersForProduct;
    createProduct: (createProductRequest: CreateProductRequest) => Promise<Product>;
    addPackProduct: (productId: Types.ObjectId | string, createPackProduct: CreatePackProduct) => Promise<ProductResponse>;
    getQuery: (query: Partial<{
        name: any;
        desc: any;
        mainImg: any;
        otherMedia: any;
        inventory: any;
        price: any;
        currency: any;
        filters: any;
        categories: any;
        reviews: any;
        extras: any;
        variants: any;
        discounts: any;
        isPack: any;
        packProducts?: any;
        catalogues: any;
        brandId?: any;
        tags: any;
        _id: any;
        recordStatus: any;
        createdAt: any;
        updatedAt: any;
    }>, options: {
        includeDiscounts?: boolean;
    }) => Promise<Product[]>;
    addPackProducts: (productId: Types.ObjectId | string, createPackProducts: CreatePackProduct[]) => Promise<ProductResponse>;
    updatePackProduct: (productId: Types.ObjectId | string, packProductId: Types.ObjectId | string, packProductUpdate: UpdatePackProduct) => Promise<ProductResponse>;
    deletePackProduct: (productId: Types.ObjectId | string, packProductId: Types.ObjectId | string) => Promise<ProductResponse>;
    private buildUpdateDataForNonListFields;
    buildAddAndRemoveFieldListsForProduct: (updateProductRequest: UpdateProductRequest) => Promise<{
        addToFieldsUpdate: Partial<{
            name: any[];
            desc: any[];
            mainImg: any[];
            otherMedia: any[];
            inventory: any[];
            price: any[];
            currency: any[];
            filters: any[];
            categories: any[];
            reviews: any[];
            extras: any[];
            variants: any[];
            discounts: any[];
            isPack: any[];
            packProducts?: any[];
            catalogues: any[];
            brandId?: any[];
            tags: any[];
            _id: any[];
            recordStatus: any[];
            createdAt: any[];
            updatedAt: any[];
        }>;
        removeFromFieldsUpdate: Partial<{
            name: any[] | {
                [key: string]: any;
            };
            desc: any[] | {
                [key: string]: any;
            };
            mainImg: any[] | {
                [key: string]: any;
            };
            otherMedia: any[] | {
                [key: string]: any;
            };
            inventory: any[] | {
                [key: string]: any;
            };
            price: any[] | {
                [key: string]: any;
            };
            currency: any[] | {
                [key: string]: any;
            };
            filters: any[] | {
                [key: string]: any;
            };
            categories: any[] | {
                [key: string]: any;
            };
            reviews: any[] | {
                [key: string]: any;
            };
            extras: any[] | {
                [key: string]: any;
            };
            variants: any[] | {
                [key: string]: any;
            };
            discounts: any[] | {
                [key: string]: any;
            };
            isPack: any[] | {
                [key: string]: any;
            };
            packProducts?: any[] | {
                [key: string]: any;
            };
            catalogues: any[] | {
                [key: string]: any;
            };
            brandId?: any[] | {
                [key: string]: any;
            };
            tags: any[] | {
                [key: string]: any;
            };
            _id: any[] | {
                [key: string]: any;
            };
            recordStatus: any[] | {
                [key: string]: any;
            };
            createdAt: any[] | {
                [key: string]: any;
            };
            updatedAt: any[] | {
                [key: string]: any;
            };
        }>;
    }>;
    updateProduct: (productId: Types.ObjectId | string, updateProductRequest: UpdateProductRequest) => Promise<Product>;
    private convertProductToProductResponse;
    private convertProductToProductResponseAsync;
    convertProductsToProductResponse: (products: Product[], options?: {
        includeDiscountAndDiscountPrice: boolean;
    }) => Promise<ProductResponse[]>;
    getProducts: (getProductsQuery: {
        brandId: Types.ObjectId;
    }, options?: {
        includeDiscountAndDiscountPrice: boolean;
        includeCategories?: boolean;
    }) => Promise<ProductResponse[]>;
    getProduct: (productId: Types.ObjectId) => Promise<ProductResponse>;
    transformCategoryFiltersToDict: (filters: Filter[]) => {
        [key: string]: Filter;
    };
    private isValidDiscount;
    private getActiveDiscount;
    getDiscountedPriceAndAppliedDiscountsForProduct: (product: ProductResponse) => Promise<ProductResponse>;
    applyDiscount: (productId: Types.ObjectId, discountId: Types.ObjectId) => Promise<Product>;
    createOrUseExistingDiscountForProduct: (productDiscount: ApplyProductToDiscount) => Promise<ApplyProductToDiscount>;
    applyDiscountsToProducts: (productDiscounts: ApplyProductToDiscount[]) => Promise<ApplyProductToDiscount[]>;
    getProductsWithDiscountedPriceByIds: (ids: Types.ObjectId[]) => Promise<ProductResponse[]>;
    getProductsWithSpecialOffer: (specialOfferId: Types.ObjectId | string) => Promise<ProductResponse[]>;
    addProductsWithDiscountToSpecialOffer: (specialOfferId: string | Types.ObjectId, productDiscounts: ApplyProductToDiscount[]) => Promise<Discount[]>;
    bestSellers: (query: BestSellersQuery) => Promise<PaginationResponse<ProductResponse>>;
    setProductsAvailabilityPriceAndCurrencyForCartItems: (items: (CartItem | CreateCartItemRequest)[]) => Promise<CartItem[]>;
}
