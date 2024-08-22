"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResponse = void 0;
const product_1 = __importDefault(require("../../entity/product"));
class ProductResponse extends product_1.default {
    allFiltersForProduct = {};
    discountedPrice = 0;
    applieddiscounts = [];
}
exports.ProductResponse = ProductResponse;
//# sourceMappingURL=product_response.js.map