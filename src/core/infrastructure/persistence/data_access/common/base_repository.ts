import { Model } from "mongoose";
import IBaseRepository from "../../../../application/contract/data_access/common/base_repository";
import BaseEntity from "../../../../domain/common/entity/base_entity";
import { RecordStatus } from "../../../../domain/common/enum/record_status";
import DateUtility from "../../../../application/common/utilities/date_utility";
import { PaginationResponse } from "../../../../domain/authentication/dto/results/pagination_result";


export class BaseRepository<TEntity extends BaseEntity<TId>, TId> implements IBaseRepository<TEntity,  TId>{
    protected _model: Model<TEntity>
    public constructor(model: Model<TEntity>){
       this._model = model;
    }
    addAsync =  async (entity: TEntity): Promise<TEntity> => {
        // Handles adding a deleted entity 
        if(entity.recordStatus === RecordStatus.DELETED){
            entity.recordStatus = RecordStatus.ACTIVE;
            await this.updateAsync(entity);
            return entity;
        }
        const entityToSave = this.convertToEntity(entity);

        const savedEntity = await this._model.create(entityToSave);

        return savedEntity;
    }
    addManyAsync = async (entities: TEntity[]): Promise<TEntity[]> => {
        const entitiesToSave = entities.map(this.convertToEntity);
        await this._model.insertMany(entitiesToSave);

        return entitiesToSave;
    }


    getByIdAsync = async (id: TId, joins?: Partial<{[k in keyof TEntity]: boolean}>): Promise<TEntity | null> => {

        let dbQuery = this._model.findById(id);
        if(joins){
            for(let key in joins){
                if(joins[key]){
                    dbQuery.populate(key)
                }
            }
        }
        return await dbQuery;
    }
    getAsync = async (query: Partial<{[k in keyof TEntity]: any}> = {}, joins?: Partial<{[k in keyof TEntity]: boolean}>): Promise<TEntity[]> => {
        if(!query.hasOwnProperty('recordStatus')){
            query.recordStatus = { "$ne": RecordStatus.DELETED };
        }
        let dbQuery = this._model.find(query);
        if(joins){
            for(let key in joins){
                if(joins[key]){
                    dbQuery.populate(key)
                }
            }
        }
        return await dbQuery;
    }
    firstOrDefaultAsync = async (query: Partial<{[k in keyof TEntity]: any}> = {}, joins?: Partial<{[k in keyof TEntity]: boolean}>): Promise<TEntity | null> => {
        if(!query.hasOwnProperty('recordStatus')){
            query.recordStatus = { "$ne": RecordStatus.DELETED };
        }
        let dbQuery = this._model.findOne(query);
        if(joins){
            for(let key in joins){
                if(joins[key]){
                    dbQuery.populate(key)
                }
            }
        }
        const entity = await dbQuery;
        return entity ?? null;
    } 

    updateAsync = async (entity: TEntity): Promise<TEntity> => {
        entity.updatedAt = DateUtility.getUTCNow();
        await this._model.findByIdAndUpdate(entity._id, entity);
        return entity;
    }
    updateByIdAsync = async (id: TId, entity: Partial<TEntity>): Promise<Partial<TEntity>> => {
        entity.updatedAt = DateUtility.getUTCNow();
        await this._model.findByIdAndUpdate(id, entity);
        return entity;
    }
    updateManyAsync = async (query: {[key in keyof Partial<TEntity>]: any}, update: Partial<TEntity>): Promise<number> => {
        update.updatedAt =  DateUtility.getUTCNow();
        const updatedResponse  = await this._model.updateMany(query, update);
        return updatedResponse.modifiedCount;
    }
    deleteAsync = async (entity: TEntity, soft: boolean = true): Promise<number> => {
        const savedEntity = await this.getByIdAsync(entity._id);
        
        if(savedEntity && soft === true){
            savedEntity.recordStatus = RecordStatus.DELETED;
            const updated = await this.updateAsync(savedEntity);
            return 1;
        }
        else if(savedEntity && soft === false){
            await this._model.deleteOne(savedEntity);
            return 1;
        }
        return 0;
    }

    deleteManyAsync = async (query: {[key in keyof Partial<TEntity>]: any}, soft: boolean = true): Promise<number> => {
        let deleteCount = 0;
        if(soft){
            const deleteUpdate : Partial<TEntity> = { recordStatus : RecordStatus.DELETED} as Partial<TEntity>;
            deleteCount = await this.updateManyAsync(query, deleteUpdate);
        } 
        else{
            const deleteResponse = await this._model.deleteMany(query);
            deleteCount =  deleteResponse.deletedCount;
        }

        return deleteCount;
    }

    getPagedAsync = async (query:  Partial<{[k in keyof TEntity]: any}>, lastItemId: TId | null, pageSize: number = 10) : Promise<TEntity[]>=> {
        let queryData:  Record<string, any> = Object.fromEntries(Object.entries(query));
        
        if (lastItemId != null) {
            queryData._id = { $gt: lastItemId };
        }
        const result = await this._model.find(queryData).sort({ _id: 1 }).limit(pageSize);
        return result;
    }

    toPagedAsync = async (query: Partial<{[k in keyof TEntity]: any}>, page: number = 1, pageSize: number = 10, sort: {[k: string]: any} = {_id: -1} ): Promise<PaginationResponse<TEntity>> => {
        const itemsToSkipCount = (page - 1 ) * pageSize
        const result = await this._model.aggregate([
            { $match: query }, // Match your query
            { $sort: sort }, // Sort as needed
            { $facet: { // Use $facet to run multiple pipelines within a single stage
              paginatedItems: [
                { $skip: itemsToSkipCount },
                { $limit: pageSize },
              ],
              totalCount: [
                { $count: 'count' },
              ],
            }},
          ]);
          
        const totalCount = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;
        const paginatedItems: TEntity[] = result[0]?.paginatedItems ?? [];
        const totalPages = Math.floor(totalCount / pageSize) + ((totalCount % pageSize == 0) ? 0 : 1);

        return new PaginationResponse<TEntity>(page, pageSize, totalCount, totalPages, paginatedItems);
    }

    private convertToEntity = (entity: TEntity): TEntity => {
        entity.recordStatus = RecordStatus.ACTIVE;
        entity.createdAt = DateUtility.getUTCNow();
        entity.updatedAt = DateUtility.getUTCNow();
        return entity;
    }

    firstOrDefault = async (query:  Partial<{[k in keyof TEntity]: any}>): Promise<TEntity | null> => {
        return await this._model.findOne(query) ?? null;
    }
    
    contains = async (query: Partial<{[k in keyof TEntity]: any[]}>): Promise<TEntity[]> => {
        let actualQuery: Partial<{[k in keyof TEntity]: {[key: string]: any[]}}> = {};
        for(let key in query){
            actualQuery[key] = {"$in": query[key]}
        }
        return await this.getAsync(actualQuery);
    }
}