"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var AddPermissionToUserRequest = /** @class */ (function () {
    function AddPermissionToUserRequest(userId, permissions) {
        this.permissions = [];
        this.userId = new mongoose_1.Types.ObjectId(userId);
        this.permissions = permissions;
    }
    return AddPermissionToUserRequest;
}());
exports["default"] = AddPermissionToUserRequest;
