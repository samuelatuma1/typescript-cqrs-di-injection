"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    recordStatus: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isactive: { type: Boolean, default: true },
    isadmin: { type: Boolean, default: false },
    permissions: [{ type: mongoose_1.Types.ObjectId, ref: 'UserPermission' }],
    roles: [{ type: mongoose_1.Types.ObjectId, ref: 'UserRole' }]
});
exports.userModel = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=user_config.js.map