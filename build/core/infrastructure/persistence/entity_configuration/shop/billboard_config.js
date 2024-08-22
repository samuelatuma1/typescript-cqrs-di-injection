"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billboardModel = exports.BillboardSchema = void 0;
const mongoose_1 = require("mongoose");
const upload_file_config_1 = require("../common/upload_file_config");
exports.BillboardSchema = new mongoose_1.Schema({
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    recordStatus: { type: String, required: true },
    img: { type: upload_file_config_1.UploadFileSchema },
    title: { type: String },
    desc: { type: String },
    isActive: { type: Boolean, default: false },
    billboardType: { type: String },
    billboardRef: { type: String },
    filters: { type: Map, of: String }
});
exports.billboardModel = (0, mongoose_1.model)('Billboard', exports.BillboardSchema);
//# sourceMappingURL=billboard_config.js.map