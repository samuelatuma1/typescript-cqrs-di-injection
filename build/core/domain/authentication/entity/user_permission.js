"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const base_entity_1 = __importDefault(require("../../common/entity/base_entity"));
class UserPermission extends base_entity_1.default {
    name;
    desc = "";
    constructor(name, desc = "") {
        const id = new mongoose_1.Types.ObjectId();
        super(id);
        this.name = name;
        this.desc = desc;
    }
}
exports.default = UserPermission;
//# sourceMappingURL=user_permission.js.map