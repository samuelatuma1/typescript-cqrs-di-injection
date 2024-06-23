"use strict";
exports.__esModule = true;
exports.userPermissionModel = void 0;
var mongoose_1 = require("mongoose");
var permissionSchema = new mongoose_1.Schema({
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    recordStatus: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, "default": "" }
});
exports.userPermissionModel = mongoose_1.model("UserPermission", permissionSchema);
