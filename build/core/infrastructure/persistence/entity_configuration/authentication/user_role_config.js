"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoleModel = void 0;
const mongoose_1 = require("mongoose");
var roleSchema = new mongoose_1.Schema({
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    recordStatus: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, default: "" },
    permissions: [{ type: mongoose_1.Types.ObjectId, ref: 'UserPermission' }]
});
exports.userRoleModel = (0, mongoose_1.model)("UserRole", roleSchema);
//# sourceMappingURL=user_role_config.js.map