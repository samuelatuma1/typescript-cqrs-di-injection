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
import { NextFunction, Request, Response } from "express";
import IProductService from "../../core/application/contract/services/shop/product_service";
import { BestSellersQuery, UpdateProductRequest } from "../../core/domain/shop/dto/requests/product_requests";
import BaseController from "./base_controller";
import { Types } from "mongoose";
export default class ProductController extends BaseController {
    private readonly productService;
    constructor(productService: IProductService);
    createProduct: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    updateProduct: (req: Request<{
        productId: Types.ObjectId | string;
    }, {}, UpdateProductRequest>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getProduct: (req: Request<{
        productId: Types.ObjectId | string;
    }>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    specialOffers: (req: Request<{
        offerId: Types.ObjectId;
    }>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    addPackProduct: (req: Request<{
        productId: Types.ObjectId;
    }>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    addPackProducts: (req: Request<{
        productId: Types.ObjectId;
    }>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    deletePackProduct: (req: Request<{
        productId: Types.ObjectId;
    }, {}, {}, {
        packProductId: Types.ObjectId | string;
    }>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    updatePackProduct: (req: Request<{
        productId: Types.ObjectId;
    }, {}, {
        data: string;
    }, {
        packProductId: Types.ObjectId | string;
    }>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    bestSellers: (req: Request<{}, {}, {}, BestSellersQuery>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
}
