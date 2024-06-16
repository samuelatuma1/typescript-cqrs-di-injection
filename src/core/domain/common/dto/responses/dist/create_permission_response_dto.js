"use strict";
exports.__esModule = true;
var CreatePermissionResponseDTO = /** @class */ (function () {
    function CreatePermissionResponseDTO(id, name, desc) {
        if (name === void 0) { name = ""; }
        if (desc === void 0) { desc = ""; }
        this.name = "";
        this.desc = "";
        this._id = id;
        this.name = name;
        this.desc = desc;
    }
    return CreatePermissionResponseDTO;
}());
exports["default"] = CreatePermissionResponseDTO;
