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
import IProductService from "../../../application/contract/services/shop/product_service";
import IEventTracer from "../../../application/contract/observability/event_tracer";
import ICategoryService from "../../../application/contract/services/shop/category_service";
import Category from "../../../domain/shop/entity/category";
import { Filter } from "../../../domain/shop/entity/filter";
import { Types } from "mongoose";
import { ICategoryLogic } from "../../../application/contract/logic/shop/category_logic";
export default class CategoryLogic implements ICategoryLogic {
    private readonly eventTracer;
    private readonly categoryService;
    private readonly productService;
    constructor(eventTracer: IEventTracer, categoryService: ICategoryService, productService: IProductService);
    transformCategoryFiltersToDict: (filters: Filter[]) => {
        [key: string]: Filter;
    };
    getCategoryEnriched: (categoryId: Types.ObjectId | string, filters: {
        [key: string]: string;
    }, page?: number, pageSize?: number) => Promise<Category>;
}
