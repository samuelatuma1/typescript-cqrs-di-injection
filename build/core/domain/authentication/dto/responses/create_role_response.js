"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateRoleResponse {
    name;
    desc = "";
    _id;
    constructor(name, id = null, desc = "") {
        this.name = name;
        this._id = id;
        this.desc = desc;
    }
}
exports.default = CreateRoleResponse;
//# sourceMappingURL=create_role_response.js.map