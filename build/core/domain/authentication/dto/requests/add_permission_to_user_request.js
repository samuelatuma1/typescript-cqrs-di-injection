"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class AddPermissionToUserRequest {
    userId;
    permissions = [];
    constructor(userId, permissions) {
        this.userId = new mongoose_1.Types.ObjectId(userId);
        this.permissions = permissions;
    }
}
exports.default = AddPermissionToUserRequest;
//# sourceMappingURL=add_permission_to_user_request.js.map