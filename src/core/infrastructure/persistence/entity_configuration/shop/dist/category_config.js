"use strict";
exports.__esModule = true;
exports.categoryModel = void 0;
var mongoose_1 = require("mongoose");
var filter_config_1 = require("./filter_config");
var upload_file_config_1 = require("../common/upload_file_config");
var product_config_1 = require("./product_config");
var categorgySchema = new mongoose_1.Schema({
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    recordStatus: { type: String, required: true },
    name: { type: String, required: true },
    urlName: { type: String, required: true },
    desc: { type: String, "default": "" },
    img: { type: upload_file_config_1.UploadFileSchema, "default": null },
    parentCategory: { type: mongoose_1.Types.ObjectId, ref: 'Category', "default": null },
    filters: { type: [filter_config_1.FilterSchema] },
    products: { type: [product_config_1.ProductSchema] },
    subCategories: { type: [] }
});
exports.categoryModel = mongoose_1.model("Category", categorgySchema);
