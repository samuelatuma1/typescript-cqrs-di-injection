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
exports.ProductResponse = void 0;
var product_1 = require("../../entity/product");
var ProductResponse = /** @class */ (function (_super) {
    __extends(ProductResponse, _super);
    function ProductResponse() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.allFiltersForProduct = {};
        return _this;
    }
    return ProductResponse;
}(product_1["default"]));
exports.ProductResponse = ProductResponse;
