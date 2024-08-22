"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const order_status_1 = require("../enum/order_status");
const base_entity_1 = __importDefault(require("../../../domain/common/entity/base_entity"));
class Order extends base_entity_1.default {
    orderItems;
    totalAmount;
    currency;
    payment;
    user = null;
    address = null;
    orderDate;
    status;
    constructor(orderInit) {
        const id = new mongoose_1.Types.ObjectId();
        super(id);
        this.orderItems = orderInit.orderItems;
        this.totalAmount = orderInit.totalAmount;
        this.payment = orderInit.payment;
        this.user = orderInit.user;
        this.address = orderInit.address;
        this.status = orderInit.status ?? order_status_1.OrderStatus.PENDING;
        this.currency = orderInit.currency;
    }
}
exports.default = Order;
//# sourceMappingURL=order.js.map