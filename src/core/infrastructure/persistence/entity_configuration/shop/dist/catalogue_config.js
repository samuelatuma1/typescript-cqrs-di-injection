"use strict";
exports.__esModule = true;
exports.catalogueModel = exports.catalogueSchema = void 0;
var mongoose_1 = require("mongoose");
var upload_file_config_1 = require("../common/upload_file_config");
exports.catalogueSchema = new mongoose_1.Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    recordStatus: { type: String },
    isFeatured: { type: Boolean },
    title: { type: String },
    desc: { type: String },
    mainImg: { type: upload_file_config_1.UploadFileSchema },
    products: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'Product' }
});
exports.catalogueModel = mongoose_1.model('Catalogue', exports.catalogueSchema);
