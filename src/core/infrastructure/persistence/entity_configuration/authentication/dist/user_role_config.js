"use strict";
exports.__esModule = true;
exports.userRoleModel = void 0;
var mongoose_1 = require("mongoose");
var roleSchema = new mongoose_1.Schema({
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    recordStatus: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, "default": "" },
    permissions: [{ type: mongoose_1.Types.ObjectId, ref: 'UserPermission' }]
});
exports.userRoleModel = mongoose_1.model("UserRole", roleSchema);
