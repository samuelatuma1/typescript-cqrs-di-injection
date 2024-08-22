"use strict";
exports.__esModule = true;
exports.brandModel = void 0;
var mongoose_1 = require("mongoose");
var upload_file_config_1 = require("../common/upload_file_config");
var BrandSchema = new mongoose_1.Schema({
    isFeatured: { type: Boolean, "default": false },
    name: { type: String, "default": "" },
    desc: { type: String, "default": "" },
    mainImg: { type: upload_file_config_1.UploadFileSchema },
    products: { type: [mongoose_1.Schema.Types.ObjectId] }
});
exports.brandModel = mongoose_1.model('Brand', BrandSchema);
