"use strict";
exports.__esModule = true;
var OrderItem = /** @class */ (function () {
    function OrderItem(init) {
        var _a;
        this.productVariantId = null;
        this.product = init.product;
        this.qty = init.qty;
        this.priceAtOrder = init.priceAtOrder;
        this.currency = init.currency;
        this.productVariantId = (_a = init.productVariantId) !== null && _a !== void 0 ? _a : null;
    }
    return OrderItem;
}());
exports["default"] = OrderItem;
