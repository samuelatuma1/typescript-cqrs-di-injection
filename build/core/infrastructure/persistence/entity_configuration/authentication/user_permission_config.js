"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPermissionModel = void 0;
const mongoose_1 = require("mongoose");
var permissionSchema = new mongoose_1.Schema({
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    recordStatus: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, default: "" },
});
exports.userPermissionModel = (0, mongoose_1.model)("UserPermission", permissionSchema);
//# sourceMappingURL=user_permission_config.js.map