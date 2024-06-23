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
exports.ProductInventory = void 0;
var mongoose_1 = require("mongoose");
var base_entity_1 = require("../../../domain/common/entity/base_entity");
var ProductInventory = /** @class */ (function (_super) {
    __extends(ProductInventory, _super);
    function ProductInventory(init) {
        if (init === void 0) { init = {}; }
        var _a, _b;
        var _this = this;
        var _id = new mongoose_1.Types.ObjectId;
        _this = _super.call(this, _id) || this;
        _this.qtyAvailable = 0;
        _this.qtySold = 0;
        _this.qtyAvailable = (_a = init.qtyAvailable) !== null && _a !== void 0 ? _a : 0;
        _this.qtySold = (_b = init.qtySold) !== null && _b !== void 0 ? _b : 0;
        return _this;
    }
    return ProductInventory;
}(base_entity_1["default"]));
exports.ProductInventory = ProductInventory;
