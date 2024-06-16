"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreatePermissionResponseDTO {
    name = "";
    _id;
    desc = "";
    constructor(id, name = "", desc = "") {
        this._id = id;
        this.name = name;
        this.desc = desc;
    }
}
exports.default = CreatePermissionResponseDTO;
//# sourceMappingURL=create_permission_response_dto.js.map