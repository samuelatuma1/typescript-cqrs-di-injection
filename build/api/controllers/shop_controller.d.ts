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
import BaseController from "./base_controller";
import { Request, Response, NextFunction } from "express";
import { CreateFilterRequest, UpdateFilterRequest } from "../../core/domain/shop/dto/requests/category_requests";
import ICategoryService from "../../core/application/contract/services/shop/category_service";
import { Types } from "mongoose";
import IProductService from "../../core/application/contract/services/shop/product_service";
import IDiscountService from "../../core/application/contract/services/shop/discount_service";
import { CreateDiscountRequest, SpecialOfferRequest } from "../../core/domain/shop/dto/requests/discount_request";
import IOrderService from "../../core/application/contract/services/shop/order_service";
import { CreateCartRequest } from "../../core/domain/shop/dto/requests/cart_request";
import { IBillboardService } from "../../core/application/contract/services/shop/billboard_service";
import { SearchBillboardRequest, UpdateBillboardRequest } from "../../core/domain/shop/dto/requests/billboard_requests";
import { ApplyProductToDiscount } from "../../core/domain/shop/dto/requests/product_requests";
import ICatalogueService from "../../core/application/contract/services/shop/catalogue_service";
import { AddProductsToCatalogueRequest, QueryCatalogue, RemoveProductsToCatalogueRequest } from "../../core/domain/shop/dto/requests/catalogue_requests";
import IBrandLogic from "../../core/application/contract/logic/shop/brand_logic";
import { ICategoryLogic } from "../../core/application/contract/logic/shop/category_logic";
export default class ShopController extends BaseController {
    private categoryService;
    private readonly productService;
    private readonly discountService;
    private readonly orderService;
    private readonly billboardService;
    private readonly catalogueService;
    private readonly brandLogic;
    private readonly cateoryLogic;
    constructor(categoryService: ICategoryService, productService: IProductService, discountService: IDiscountService, orderService: IOrderService, billboardService: IBillboardService, catalogueService: ICatalogueService, brandLogic: IBrandLogic, cateoryLogic: ICategoryLogic);
    createCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    addFiltersToCategory: (req: Request<{
        categoryId: string;
    }, {}, CreateFilterRequest[]>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deleteFilters: (req: Request<{
        categoryId: string;
    }, {}, Types.ObjectId[]>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    updateFilter: (req: Request<{
        categoryId: string;
    }, {}, UpdateFilterRequest>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getCategory: (req: Request<{
        categoryId: string;
    }>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    createDiscount: (req: Request<{}, {}, CreateDiscountRequest>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    addDiscount: (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    createSpecialOffer: (req: Request<{}, {}, SpecialOfferRequest>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    addDiscountsToSpecialOffer: (req: Request<{
        specialOfferId: Types.ObjectId;
    }, {}, Types.ObjectId[]>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    addProductsWithDiscountToSpecialOffer: (req: Request<{
        specialOfferId: Types.ObjectId;
    }, {}, ApplyProductToDiscount[]>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getActiveSpecialOffers: (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    createCart: (req: Request<{}, {}, CreateCartRequest>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    createBillboard: (req: Request<{}, {}>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    updateBillboard: (req: Request<{
        billboardId: Types.ObjectId;
    }, {}, UpdateBillboardRequest>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deleteBillboard: (req: Request<{
        billboardId: Types.ObjectId;
    }, {}, UpdateBillboardRequest>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getActiveBillboards: (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getBillboard: (req: Request<{
        billboardId: Types.ObjectId;
    }, {}, {}>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    searchBillboards: (req: Request<{}, {}, {}, SearchBillboardRequest>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    createCatalogue: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    updateCatalogue: (req: Request<{
        catalogueId: Types.ObjectId | string;
    }>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    featureCatalogues: (req: Request<{}, {}, {
        catalogueIds: Types.ObjectId[];
        feature: boolean;
    }>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getCatalogue: (req: Request<{}, {}, {}, QueryCatalogue>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    addProductsToCatalogue: (req: Request<{}, {}, AddProductsToCatalogueRequest>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    removeProductsFromCatalogue: (req: Request<{}, {}, RemoveProductsToCatalogueRequest>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    createBrand: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    addProductsToBrand: (req: Request<{
        brandId: Types.ObjectId;
    }, {}, Types.ObjectId[]>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
}
