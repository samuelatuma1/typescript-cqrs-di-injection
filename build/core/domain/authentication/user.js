"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = __importDefault(require("../common/entity/base_entity"));
class User extends base_entity_1.default {
    name;
    email;
    password;
}
exports.default = User;
//# sourceMappingURL=user.js.map