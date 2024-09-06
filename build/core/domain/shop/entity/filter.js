"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filter = void 0;
const mongoose_1 = require("mongoose");
const base_entity_1 = __importDefault(require("../../common/entity/base_entity"));
const filter_type_1 = require("../enum/filter_type");
class Filter extends base_entity_1.default {
    name;
    categoryId;
    filterType;
    values;
    // Implementation of the constructor
    constructor(nameOrInit = '', categoryId = null, filterType = filter_type_1.FilterType.string, values = []) {
        const id = new mongoose_1.Types.ObjectId();
        super(id);
        if (typeof nameOrInit === 'string') {
            this.name = nameOrInit;
            this.categoryId = categoryId;
            this.filterType = filterType;
            this.values = values;
        }
        else {
            this.name = nameOrInit.name ?? '';
            this.categoryId = nameOrInit.categoryId ?? null;
            this.filterType = nameOrInit.filterType ?? filter_type_1.FilterType.string;
            this.values = nameOrInit.values ?? [];
        }
    }
}
exports.Filter = Filter;
//# sourceMappingURL=filter.js.map