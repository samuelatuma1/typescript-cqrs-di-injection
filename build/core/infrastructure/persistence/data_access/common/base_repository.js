"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const record_status_1 = require("../../../../domain/common/enum/record_status");
const date_utility_1 = __importDefault(require("../../../../application/common/utilities/date_utility"));
const pagination_result_1 = require("../../../../domain/common/dto/results/pagination_result");
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
        await this._model.insertMany(entitiesToSave);
        return entitiesToSave;
    };
    getByIdAsync = async (id) => {
        return await this._model.findById(id);
    };
    getAsync = async (query = {}) => {
        if (!query.hasOwnProperty('recordStatus')) {
            query.recordStatus = { "$ne": record_status_1.RecordStatus.DELETED };
        }
        return await this._model.find(query);
    };
    firstOrDefaultAsync = async (query = {}) => {
        if (!query.hasOwnProperty('recordStatus')) {
            query.recordStatus = { "$ne": record_status_1.RecordStatus.DELETED };
        }
        const entity = await this._model.findOne(query);
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
    getPagedAsync = async (query, lastItemId, pageSize = 10) => {
        let queryData = Object.fromEntries(Object.entries(query));
        if (lastItemId != null) {
            queryData._id = { $gt: lastItemId };
        }
        const result = await this._model.find(queryData).sort({ _id: 1 }).limit(pageSize);
        return result;
    };
    toPagedAsync = async (query, page = 1, pageSize = 10, sort = { _id: -1 }) => {
        const itemsToSkipCount = (page - 1) * pageSize;
        const result = await this._model.aggregate([
            { $match: query }, // Match your query
            { $sort: sort }, // Sort as needed
            { $facet: {
                    paginatedItems: [
                        { $skip: itemsToSkipCount },
                        { $limit: pageSize },
                    ],
                    totalCount: [
                        { $count: 'count' },
                    ],
                } },
        ]);
        const totalCount = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;
        const paginatedItems = result[0]?.paginatedItems ?? [];
        const totalPages = Math.floor(totalCount / pageSize) + ((totalCount % pageSize == 0) ? 0 : 1);
        return new pagination_result_1.PaginationResponse(page, pageSize, totalCount, totalPages, paginatedItems);
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
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base_repository.js.map