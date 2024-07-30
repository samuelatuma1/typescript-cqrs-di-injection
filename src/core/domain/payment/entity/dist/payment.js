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
var base_entity_1 = require("../../../domain/common/entity/base_entity");
var Payment = /** @class */ (function (_super) {
    __extends(Payment, _super);
    function Payment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Payment;
}(base_entity_1["default"]));
exports["default"] = Payment;
