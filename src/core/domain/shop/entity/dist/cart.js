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
exports.CartItem = void 0;
var mongoose_1 = require("mongoose");
var base_entity_1 = require("../../../domain/common/entity/base_entity");
var CartItem = /** @class */ (function () {
    function CartItem(init) {
        this.product = init.product;
        this.qty = init.qty;
        this.priceAtOrder = init.priceAtOrder;
        this.currency = init.currency;
    }
    return CartItem;
}());
exports.CartItem = CartItem;
var Cart = /** @class */ (function (_super) {
    __extends(Cart, _super);
    function Cart(init) {
        var _a, _b;
        var _this = this;
        var _id = new mongoose_1.Types.ObjectId;
        _this = _super.call(this, _id) || this;
        _this.user = null; // user email
        _this.cartItems = init.cartItems;
        _this.totalAmount = (_a = init.totalAmount) !== null && _a !== void 0 ? _a : 0;
        _this.user = (_b = init.user) !== null && _b !== void 0 ? _b : null;
        _this.isActive = true;
        return _this;
    }
    return Cart;
}(base_entity_1["default"]));
exports["default"] = Cart;
