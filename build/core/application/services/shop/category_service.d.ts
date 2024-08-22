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
import ICategoryService from "../../contract/services/shop/category_service";
import ICategoryRepository from "../../contract/data_access/shop/category_repository";
import IEventTracer from "../../contract/observability/event_tracer";
import { Types } from "mongoose";
import Category from "../../../domain/shop/entity/category";
import { Filter } from "../../../domain/shop/entity/filter";
import IFileService from "../../../application/contract/services/files/file_service";
import { CreateCategoryRequest, CreateFilterRequest, UpdateFilterRequest } from "../../../domain/shop/dto/requests/category_requests";
export default class CategoryService implements ICategoryService {
    private readonly eventTracer;
    private readonly categoryRepository;
    private readonly fileService;
    categoryImgUploadFolder: string;
    constructor(eventTracer: IEventTracer, categoryRepository: ICategoryRepository, fileService: IFileService);
    convertCreateCategoryRequestToCategory: (request: CreateCategoryRequest) => Category;
    validateNoCategoryCircularDependency: (categoryId: Category | Types.ObjectId) => Promise<boolean>;
    getCategoryParent: (category: Category) => Promise<Category | null>;
    getAllParentFiltersForCategory: (category: Category) => Promise<{
        [key: string]: Filter;
    }>;
    getAllFiltersForCategoryIncludingParents: (category: Category) => Promise<{
        [key: string]: Filter;
    }>;
    private keepOnlyCategoryFilters;
    private getAllFiltersForCategoryIncludingParentsAsList;
    private getCategoryByIdOrThrowException;
    createCategory: (createCategoryRequest: CreateCategoryRequest) => Promise<Category>;
    addFiltersToCategory: (categoryId: Types.ObjectId, filtersRequest: CreateFilterRequest[]) => Promise<Category>;
    deleteFilters: (categoryId: Types.ObjectId, filterIds: Types.ObjectId[]) => Promise<Category>;
    updateFilter: (categoryId: Types.ObjectId, updateFilter: UpdateFilterRequest) => Promise<Category>;
    getCategoriesByIds: (categoryIds: string[] | Types.ObjectId[], includeInheritedFilters?: boolean) => Promise<Category[]>;
    getCategoryEnriched: (categoryId: Types.ObjectId | string, joins: Partial<{
        name: boolean;
        urlName: boolean;
        desc: boolean;
        img: boolean;
        parentCategory: boolean;
        subCategories: boolean;
        filters: boolean;
        products: boolean;
        pagedProducts: boolean;
        isFeatured: boolean;
        _id: boolean;
        recordStatus: boolean;
        createdAt: boolean;
        updatedAt: boolean;
    }>) => Promise<Category>;
}
