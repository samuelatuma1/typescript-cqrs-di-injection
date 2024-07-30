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
var base_entity_1 = require("../../../domain/common/entity/base_entity");
var SpecialOffer = /** @class */ (function (_super) {
    __extends(SpecialOffer, _super);
    function SpecialOffer(init) {
        var _a;
        var _this = _super.call(this, new mongoose_1.Types.ObjectId()) || this;
        _this.desc = "";
        _this.name = init.name;
        _this.desc = (_a = init.desc) !== null && _a !== void 0 ? _a : "";
        _this.discounts = [];
        _this.validityStartDate = init.validityStartDate;
        _this.validityEndDate = init.validityEndDate;
        return _this;
    }
    return SpecialOffer;
}(base_entity_1["default"]));
exports["default"] = SpecialOffer;
