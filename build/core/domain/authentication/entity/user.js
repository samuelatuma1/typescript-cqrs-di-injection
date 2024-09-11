"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const base_entity_1 = __importDefault(require("../../common/entity/base_entity"));
const user_status_1 = require("../enum/user_status");
class User extends base_entity_1.default {
    name;
    email;
    password;
    isactive = true;
    isadmin = false;
    roles = [];
    status = user_status_1.UserStatus.PENDING_VERIFICATION;
    address = null;
    permissions = [];
    constructor(email, password, name = '', permissions = [], roles = [], status = user_status_1.UserStatus.PENDING_VERIFICATION) {
        const id = new mongoose_1.Types.ObjectId();
        super(id);
        this.email = email;
        this.name = name,
            this.password = password;
        this.permissions = permissions;
        this.roles = roles;
        this.address = null;
        this.status = status;
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map