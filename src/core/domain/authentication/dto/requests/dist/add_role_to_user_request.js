"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var AddRolesToUserRequest = /** @class */ (function () {
    function AddRolesToUserRequest(userId, roles) {
        this.roles = [];
        this.userId = new mongoose_1.Types.ObjectId(userId);
        this.roles = roles;
    }
    return AddRolesToUserRequest;
}());
exports["default"] = AddRolesToUserRequest;
