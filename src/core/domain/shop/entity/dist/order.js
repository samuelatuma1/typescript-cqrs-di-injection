"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var order_status_1 = require("../enum/order_status");
var base_entity_1 = require("../../../domain/common/entity/base_entity");
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order(orderInit) {
        var _a;
        var _this = this;
        var id = new mongoose_1.Types.ObjectId();
        _this = _super.call(this, id) || this;
        _this.user = null;
        _this.address = null;
        _this.orderItems = orderInit.orderItems;
        _this.totalAmount = orderInit.totalAmount;
        _this.payment = orderInit.payment;
        _this.user = orderInit.user;
        _this.address = orderInit.address;
        _this.status = (_a = orderInit.status) !== null && _a !== void 0 ? _a : order_status_1.OrderStatus.PENDING;
        _this.currency = orderInit.currency;
        return _this;
    }
    return Order;
}(base_entity_1["default"]));
exports["default"] = Order;
