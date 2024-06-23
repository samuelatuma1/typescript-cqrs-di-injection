"use strict";
exports.__esModule = true;
exports.UploadFileSchema = void 0;
var mongoose_1 = require("mongoose");
exports.UploadFileSchema = new mongoose_1.Schema({
    resource_type: { type: String, "default": '' },
    secure_url: { type: String, "default": '' },
    public_id: { type: String, "default": '' },
    folder: { type: String, "default": '' }
}, { _id: false });
