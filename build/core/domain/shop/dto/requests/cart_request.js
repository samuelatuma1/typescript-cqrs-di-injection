"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCartRequest = exports.CreateCartItemRequest = void 0;
class CreateCartItemRequest {
    product;
    qty;
}
exports.CreateCartItemRequest = CreateCartItemRequest;
class CreateCartRequest {
    cartItems;
    user = null; // user email
}
exports.CreateCartRequest = CreateCartRequest;
//# sourceMappingURL=cart_request.js.map