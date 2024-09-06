"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderPlacedEventDTO {
    orderId;
    createdAt;
    constructor(init) {
        this.orderId = init.orderId;
        this.createdAt = init.createdAt;
    }
}
exports.default = OrderPlacedEventDTO;
//# sourceMappingURL=order_placed_event_dto.js.map