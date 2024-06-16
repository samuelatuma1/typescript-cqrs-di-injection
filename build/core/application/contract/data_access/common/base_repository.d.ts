import { PaginationResponse } from "../../../../domain/common/dto/results/pagination_result";
import BaseEntity from "../../../../domain/common/entity/base_entity";
export default interface IBaseRepository<TEntity extends BaseEntity<TId>, TId> {
    addAsync(entity: TEntity): Promise<TEntity>;
    getByIdAsync(id: TId): Promise<TEntity | null>;
    getAsync(query?: Partial<{
        [k in keyof TEntity]: any;
    }>): Promise<TEntity[]>;
    getPagedAsync(query: Partial<{
        [k in keyof TEntity]: any;
    }>, lastItemId: TId | null, pageSize?: number): Promise<TEntity[]>;
    toPagedAsync(query: Partial<{
        [k in keyof TEntity]: any;
    }>, page: number, pageSize: number, sort?: {
        [k: string]: any;
    } | string): Promise<PaginationResponse<TEntity>>;
    firstOrDefaultAsync(query: Partial<{
        [k in keyof TEntity]: any;
    }>): Promise<TEntity | null>;
    updateByIdAsync(id: TId, entity: Partial<TEntity>): Promise<Partial<TEntity>>;
    updateAsync(entity: TEntity): Promise<TEntity>;
    updateManyAsync(query: {
        [key in keyof Partial<TEntity>]: any;
    }, update: Partial<TEntity>): Promise<number>;
    deleteAsync(entity: TEntity, soft: boolean): Promise<number>;
    deleteManyAsync(query: {
        [key in keyof Partial<TEntity>]: any;
    }, soft?: boolean): Promise<number>;
}
