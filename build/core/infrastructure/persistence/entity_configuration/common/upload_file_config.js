"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFileSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UploadFileSchema = new mongoose_1.Schema({
    resource_type: { type: String, default: '' },
    secure_url: { type: String, default: '' },
    public_id: { type: String, default: '' },
    folder: { type: String, default: '' },
}, { _id: false });
//# sourceMappingURL=upload_file_config.js.map