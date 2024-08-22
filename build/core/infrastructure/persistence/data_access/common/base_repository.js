"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const record_status_1 = require("../../../../domain/common/enum/record_status");
const date_utility_1 = __importDefault(require("../../../../application/common/utilities/date_utility"));
const pagination_result_1 = require("../../../../domain/authentication/dto/results/pagination_result");
class BaseRepository {
    _model;
    constructor(model) {
        this._model = model;
    }
    addAsync = async (entity) => {
        // Handles adding a deleted entity 
        if (entity.recordStatus === record_status_1.RecordStatus.DELETED) {
            entity.recordStatus = record_status_1.RecordStatus.ACTIVE;
            await this.updateAsync(entity);
            return entity;
        }
        const entityToSave = this.convertToEntity(entity);
        const savedEntity = await this._model.create(entityToSave);
        return savedEntity;
    };
    addManyAsync = async (entities) => {
        const entitiesToSave = entities.map(this.convertToEntity);
        if (!entitiesToSave.length) {
            return [];
        }
        await this._model.insertMany(entitiesToSave);
        return entitiesToSave;
    };
    getByIdAsync = async (id, joins) => {
        let dbQuery = this._model.findById(id);
        if (joins) {
            for (let key in joins) {
                if (joins[key]) {
                    dbQuery.populate(key);
                }
            }
        }
        return await dbQuery;
    };
    getAsync = async (query = {}, joins, sort) => {
        if (!query.hasOwnProperty('recordStatus')) {
            query.recordStatus = { "$ne": record_status_1.RecordStatus.DELETED };
        }
        let dbQuery = this._model.find(query);
        if (joins) {
            for (let key in joins) {
                if (joins[key]) {
                    dbQuery.populate(key);
                }
            }
        }
        if (sort) {
            dbQuery.sort(sort);
        }
        return await dbQuery;
    };
    firstOrDefaultAsync = async (query = {}, joins) => {
        if (!query.hasOwnProperty('recordStatus')) {
            query.recordStatus = { "$ne": record_status_1.RecordStatus.DELETED };
        }
        let dbQuery = this._model.findOne(query);
        if (joins) {
            for (let key in joins) {
                if (joins[key]) {
                    dbQuery.populate(key);
                }
            }
        }
        const entity = await dbQuery;
        return entity ?? null;
    };
    updateAsync = async (entity) => {
        entity.updatedAt = date_utility_1.default.getUTCNow();
        await this._model.findByIdAndUpdate(entity._id, entity);
        return entity;
    };
    updateByIdAsync = async (id, entity) => {
        entity.updatedAt = date_utility_1.default.getUTCNow();
        await this._model.findByIdAndUpdate(id, entity);
        return entity;
    };
    updateManyAsync = async (query, update) => {
        update.updatedAt = date_utility_1.default.getUTCNow();
        const updatedResponse = await this._model.updateMany(query, update);
        return updatedResponse.modifiedCount;
    };
    deleteAsync = async (entity, soft = true) => {
        const savedEntity = await this.getByIdAsync(entity._id);
        if (savedEntity && soft === true) {
            savedEntity.recordStatus = record_status_1.RecordStatus.DELETED;
            const updated = await this.updateAsync(savedEntity);
            return 1;
        }
        else if (savedEntity && soft === false) {
            await this._model.deleteOne(savedEntity);
            return 1;
        }
        return 0;
    };
    addToFieldsList = async (query, fields) => {
        let addToSetQuery = {};
        for (let [key, values] of Object.entries(fields)) {
            addToSetQuery[key] = { $each: values };
            console.log({ $each: values });
        }
        console.log({ query, $addToSet: addToSetQuery });
        let updatedResponse = await this._model.updateMany(query, { $addToSet: addToSetQuery });
        console.log({ updatedResponse });
        return updatedResponse.modifiedCount;
    };
    removeFromFieldsList = async (query, fields) => {
        let deleteFromFieldListQuery = {};
        for (let [key, values] of Object.entries(fields)) {
            deleteFromFieldListQuery[key] = { $in: values };
        }
        console.log({ $pull: deleteFromFieldListQuery });
        let updatedResponse = await this._model.updateMany(query, { $pull: deleteFromFieldListQuery });
        console.log(updatedResponse);
        return updatedResponse.modifiedCount;
    };
    deleteManyAsync = async (query, soft = true) => {
        let deleteCount = 0;
        if (soft) {
            const deleteUpdate = { recordStatus: record_status_1.RecordStatus.DELETED };
            deleteCount = await this.updateManyAsync(query, deleteUpdate);
        }
        else {
            const deleteResponse = await this._model.deleteMany(query);
            deleteCount = deleteResponse.deletedCount;
        }
        return deleteCount;
    };
    getPagedAsync = async (query, lastItemId, pageSize = 10, sort) => {
        let queryData = Object.fromEntries(Object.entries(query));
        if (lastItemId != null) {
            queryData._id = { $gt: lastItemId };
        }
        sort = { ...sort, _id: 1 };
        const result = await this._model.find(queryData).sort(sort).limit(pageSize);
        return result;
    };
    toPagedAsync = async (query, page = 1, pageSize = 10, sort = { _id: -1 }) => {
        const itemsToSkipCount = (page === 0 ? 0 : (page - 1)) * pageSize;
        let paginatedItemsAggregate = page === 0 ? [] : [
            { $skip: itemsToSkipCount },
            { $limit: pageSize },
        ];
        const result = await this._model.aggregate([
            { $match: query }, // Match your query
            { $sort: sort }, // Sort as needed
            { $facet: {
                    paginatedItems: paginatedItemsAggregate,
                    totalCount: [
                        { $count: 'count' },
                    ],
                } },
        ]);
        const totalCount = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;
        const paginatedItems = result[0]?.paginatedItems ?? [];
        const totalPages = page === 0 ? 1 : Math.floor(totalCount / pageSize) + ((totalCount % pageSize == 0) ? 0 : 1);
        return new pagination_result_1.PaginationResponse(page, page === 0 ? totalCount : pageSize, totalCount, totalPages, paginatedItems);
    };
    convertToEntity = (entity) => {
        entity.recordStatus = record_status_1.RecordStatus.ACTIVE;
        entity.createdAt = date_utility_1.default.getUTCNow();
        entity.updatedAt = date_utility_1.default.getUTCNow();
        return entity;
    };
    firstOrDefault = async (query) => {
        return await this._model.findOne(query) ?? null;
    };
    contains = async (query, joins) => {
        let actualQuery = {};
        for (let key in query) {
            actualQuery[key] = { "$in": query[key] };
        }
        return await this.getAsync(actualQuery, joins);
    };
    or = async (queries, joins) => {
        let dbQuery = this._model.find({ $or: queries });
        if (joins) {
            for (let key in joins) {
                if (joins[key]) {
                    dbQuery.populate(key);
                }
            }
        }
        return await dbQuery;
    };
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base_repository.js.map