"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_entity_1 = __importDefault(require("../../../domain/common/entity/base_entity"));
class Payment extends base_entity_1.default {
    reference;
    cartId;
    amount;
    currency;
    customer;
    status;
    narration;
    amount_paid;
}
exports.default = Payment;
//# sourceMappingURL=payment.js.map