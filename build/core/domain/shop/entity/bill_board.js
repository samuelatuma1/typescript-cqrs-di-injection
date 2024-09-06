"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = __importDefault(require("../../../domain/common/entity/base_entity"));
const mongoose_1 = require("mongoose");
class Billboard extends base_entity_1.default {
    img;
    title;
    desc;
    isActive;
    billboardType;
    filters;
    billboardRef;
    constructor(init) {
        const _id = new mongoose_1.Types.ObjectId();
        super(_id);
        this.img = init.img;
        this.title = init.title;
        this.desc = init.desc;
        this.isActive = init.isActive;
        this.billboardType = init.billboardType;
        this.filters = init.filters ?? null;
        this.billboardRef = init.billboardRef;
    }
}
exports.default = Billboard;
//# sourceMappingURL=bill_board.js.map