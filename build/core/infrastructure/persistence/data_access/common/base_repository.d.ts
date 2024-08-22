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
import { Model } from "mongoose";
import IBaseRepository from "../../../../application/contract/data_access/common/base_repository";
import BaseEntity from "../../../../domain/common/entity/base_entity";
import { PaginationResponse } from "../../../../domain/authentication/dto/results/pagination_result";
import { SortOrder } from "../shop/product_repository";
export declare class BaseRepository<TEntity extends BaseEntity<TId>, TId> implements IBaseRepository<TEntity, TId> {
    protected _model: Model<TEntity>;
    constructor(model: Model<TEntity>);
    addAsync: (entity: TEntity) => Promise<TEntity>;
    addManyAsync: (entities: TEntity[]) => Promise<TEntity[]>;
    getByIdAsync: (id: TId, joins?: Partial<{ [k in keyof TEntity]: boolean; }>) => Promise<TEntity | null>;
    getAsync: (query?: Partial<{ [k in keyof TEntity]: any; }>, joins?: Partial<{ [k_1 in keyof TEntity]: boolean; }>, sort?: {
        [key: string]: SortOrder;
    }) => Promise<TEntity[]>;
    firstOrDefaultAsync: (query?: Partial<{ [k in keyof TEntity]: any; }>, joins?: Partial<{ [k_1 in keyof TEntity]: boolean; }>) => Promise<TEntity | null>;
    updateAsync: (entity: TEntity) => Promise<TEntity>;
    updateByIdAsync: (id: TId, entity: Partial<TEntity>) => Promise<Partial<TEntity>>;
    updateManyAsync: (query: { [key in keyof Partial<TEntity>]: any; }, update: Partial<TEntity>) => Promise<number>;
    deleteAsync: (entity: TEntity, soft?: boolean) => Promise<number>;
    addToFieldsList: (query: Partial<{ [k in keyof TEntity]: any; }>, fields: Partial<{ [key in keyof TEntity]: any[]; }>) => Promise<number>;
    removeFromFieldsList: (query: Partial<{ [k in keyof TEntity]: any; }>, fields: Partial<{ [key in keyof TEntity]: any[]; }>) => Promise<number>;
    deleteManyAsync: (query: { [key in keyof Partial<TEntity>]: any; }, soft?: boolean) => Promise<number>;
    getPagedAsync: (query: Partial<{ [k in keyof TEntity]: any; }>, lastItemId: TId | null, pageSize?: number, sort?: {
        [key: string]: any;
    }) => Promise<TEntity[]>;
    toPagedAsync: (query: Partial<{ [k in keyof TEntity]: any; }>, page?: number, pageSize?: number, sort?: {
        [k: string]: any;
    }) => Promise<PaginationResponse<TEntity>>;
    private convertToEntity;
    firstOrDefault: (query: Partial<{ [k in keyof TEntity]: any; }>) => Promise<TEntity | null>;
    contains: (query: Partial<{ [k in keyof TEntity]: any[]; }>, joins?: Partial<{ [k_1 in keyof TEntity]: boolean; }>) => Promise<TEntity[]>;
    or: (queries: Partial<{ [k in keyof TEntity]: any; }>[], joins?: Partial<{ [k_1 in keyof TEntity]: boolean; }>) => Promise<TEntity[]>;
}
