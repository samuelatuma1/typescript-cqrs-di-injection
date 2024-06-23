"use strict";
exports.__esModule = true;
var CreateRoleResponse = /** @class */ (function () {
    function CreateRoleResponse(name, id, desc) {
        if (id === void 0) { id = null; }
        if (desc === void 0) { desc = ""; }
        this.desc = "";
        this.name = name;
        this._id = id;
        this.desc = desc;
    }
    return CreateRoleResponse;
}());
exports["default"] = CreateRoleResponse;
