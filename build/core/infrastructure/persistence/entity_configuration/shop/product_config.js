"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
const upload_file_config_1 = require("../common/upload_file_config");
const ProductInventorySchema = new mongoose_1.Schema({
    qtyAvailable: { type: Number, default: 0 },
    qtySold: { type: Number, default: 0 }
});
const FilterForProductSchema = new mongoose_1.Schema({
    name: { type: String, default: "" },
    values: { type: [String] },
    categoryId: { type: mongoose_1.Schema.Types.ObjectId },
    filterType: { type: String, default: "" },
    filterId: { type: mongoose_1.Schema.Types.ObjectId }
});
const ExtraSchema = new mongoose_1.Schema({
    title: { type: String },
    body: { type: String }
});
const PackProductSchema = new mongoose_1.Schema({
    name: { type: String },
    desc: { type: String },
    mainImg: { type: upload_file_config_1.UploadFileSchema, default: null },
    otherMedia: { type: [upload_file_config_1.UploadFileSchema], default: [] },
    qty: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false }
});
exports.ProductSchema = new mongoose_1.Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    recordStatus: { type: String },
    name: { type: String, required: true },
    desc: { type: String, default: "" },
    mainImg: { type: upload_file_config_1.UploadFileSchema, default: null },
    otherMedia: { type: [upload_file_config_1.UploadFileSchema], default: [] },
    inventory: { type: ProductInventorySchema },
    price: { type: Number },
    currency: { type: String },
    filters: { type: Map, of: FilterForProductSchema },
    categories: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'Category' },
    extras: { type: [ExtraSchema] },
    discounts: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'Discount' },
    isPack: { type: Boolean, default: false },
    packProducts: { type: [PackProductSchema] },
    brandId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Brand', default: null }
});
exports.productModel = (0, mongoose_1.model)('Product', exports.ProductSchema);
//# sourceMappingURL=product_config.js.map