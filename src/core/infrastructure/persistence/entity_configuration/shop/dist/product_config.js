"use strict";
exports.__esModule = true;
exports.productModel = exports.ProductSchema = void 0;
var mongoose_1 = require("mongoose");
var upload_file_config_1 = require("../common/upload_file_config");
var ProductInventorySchema = new mongoose_1.Schema({
    qtyAvailable: { type: Number, "default": 0 },
    qtySold: { type: Number, "default": 0 }
});
var FilterForProductSchema = new mongoose_1.Schema({
    name: { type: String, "default": "" },
    values: { type: [String] },
    categoryId: { type: mongoose_1.Schema.Types.ObjectId },
    filterType: { type: String, "default": "" },
    filterId: { type: mongoose_1.Schema.Types.ObjectId }
});
var ExtraSchema = new mongoose_1.Schema({
    title: { type: String },
    body: { type: String }
});
exports.ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    desc: { type: String, "default": "" },
    mainImg: { type: upload_file_config_1.UploadFileSchema, "default": null },
    otherMedia: { type: [upload_file_config_1.UploadFileSchema], "default": [] },
    inventory: { type: ProductInventorySchema },
    price: { type: Number },
    currency: { type: String },
    filters: { type: Map, of: FilterForProductSchema },
    categories: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'Category' },
    extras: { type: [ExtraSchema] }
});
exports.productModel = mongoose_1.model('Product', exports.ProductSchema);
