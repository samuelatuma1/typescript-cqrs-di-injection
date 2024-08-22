"use strict";
exports.__esModule = true;
var item_status_1 = require("../enum/item_status");
var OrderItem = /** @class */ (function () {
    function OrderItem(init) {
        var _a, _b;
        this.productVariantId = null;
        this.product = init.product;
        this.qty = init.qty;
        this.priceAtOrder = init.priceAtOrder;
        this.currency = init.currency;
        this.productVariantId = (_a = init.productVariantId) !== null && _a !== void 0 ? _a : null;
        this.status = (_b = init.status) !== null && _b !== void 0 ? _b : item_status_1.ItemStatus.AVAILABLE;
    }
    return OrderItem;
}());
exports["default"] = OrderItem;
