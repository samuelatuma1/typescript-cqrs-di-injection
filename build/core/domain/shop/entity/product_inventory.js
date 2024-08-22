"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInventory = void 0;
const mongoose_1 = require("mongoose");
const base_entity_1 = __importDefault(require("../../../domain/common/entity/base_entity"));
class ProductInventory extends base_entity_1.default {
    qtyAvailable = 0;
    qtySold = 0;
    constructor(init = {}) {
        const _id = new mongoose_1.Types.ObjectId;
        super(_id);
        this.qtyAvailable = init.qtyAvailable ?? 0;
        this.qtySold = init.qtySold ?? 0;
    }
}
exports.ProductInventory = ProductInventory;
//# sourceMappingURL=product_inventory.js.map