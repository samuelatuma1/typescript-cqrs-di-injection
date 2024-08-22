"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterSchema = void 0;
const mongoose_1 = require("mongoose");
// name: string;
// categoryId: Types.ObjectId | null = null;
// filterType: string;
// values: string[] | number[];
exports.FilterSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    categoryId: { type: mongoose_1.Schema.Types.ObjectId },
    filterType: { type: String, default: 'string' },
    values: { type: [String] }
});
//# sourceMappingURL=filter_config.js.map