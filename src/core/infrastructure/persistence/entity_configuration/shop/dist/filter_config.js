"use strict";
exports.__esModule = true;
exports.FilterSchema = void 0;
var mongoose_1 = require("mongoose");
// name: string;
// categoryId: Types.ObjectId | null = null;
// filterType: string;
// values: string[] | number[];
exports.FilterSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    categoryId: { type: mongoose_1.Schema.Types.ObjectId },
    filterType: { type: String, "default": 'string' },
    values: { type: [String] }
});
