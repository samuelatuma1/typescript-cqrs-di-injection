"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryModel = void 0;
const mongoose_1 = require("mongoose");
const filter_config_1 = require("./filter_config");
const upload_file_config_1 = require("../common/upload_file_config");
const product_config_1 = require("./product_config");
var categorgySchema = new mongoose_1.Schema({
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    recordStatus: { type: String, required: true },
    name: { type: String, required: true },
    urlName: { type: String, required: true },
    desc: { type: String, default: "" },
    img: { type: upload_file_config_1.UploadFileSchema, default: null },
    parentCategory: { type: mongoose_1.Types.ObjectId, ref: 'Category', default: null },
    filters: { type: [filter_config_1.FilterSchema] },
    products: { type: [product_config_1.ProductSchema] },
    subCategories: { type: [] },
    pagedProducts: { type: mongoose_1.Schema.Types.Mixed },
    isFeatured: { type: Boolean, default: false }
});
exports.categoryModel = (0, mongoose_1.model)("Category", categorgySchema);
//# sourceMappingURL=category_config.js.map