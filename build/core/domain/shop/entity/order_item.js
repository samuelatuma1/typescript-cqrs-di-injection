"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_status_1 = require("../enum/item_status");
class OrderItem {
    product;
    qty;
    priceAtOrder;
    currency;
    productVariantId = null;
    status;
    constructor(init) {
        this.product = init.product;
        this.qty = init.qty;
        this.priceAtOrder = init.priceAtOrder;
        this.currency = init.currency;
        this.productVariantId = init.productVariantId ?? null;
        this.status = init.status ?? item_status_1.ItemStatus.AVAILABLE;
    }
}
exports.default = OrderItem;
//# sourceMappingURL=order_item.js.map