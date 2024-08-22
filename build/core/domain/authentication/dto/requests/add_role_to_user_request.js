"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class AddRolesToUserRequest {
    userId;
    roles = [];
    constructor(userId, roles) {
        this.userId = new mongoose_1.Types.ObjectId(userId);
        this.roles = roles;
    }
}
exports.default = AddRolesToUserRequest;
//# sourceMappingURL=add_role_to_user_request.js.map