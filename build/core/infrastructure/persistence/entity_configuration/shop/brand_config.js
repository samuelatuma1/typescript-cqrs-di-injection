"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandModel = void 0;
const mongoose_1 = require("mongoose");
const upload_file_config_1 = require("../common/upload_file_config");
const BrandSchema = new mongoose_1.Schema({
    isFeatured: { type: Boolean, default: false },
    name: { type: String, default: "" },
    desc: { type: String, default: "" },
    mainImg: { type: upload_file_config_1.UploadFileSchema },
    products: { type: [mongoose_1.Schema.Types.ObjectId] }
});
exports.brandModel = (0, mongoose_1.model)('Brand', BrandSchema);
//# sourceMappingURL=brand_config.js.map