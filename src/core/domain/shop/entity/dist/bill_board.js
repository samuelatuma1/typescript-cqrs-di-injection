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
var mongoose_1 = require("mongoose");
var Billboard = /** @class */ (function (_super) {
    __extends(Billboard, _super);
    function Billboard(init) {
        var _a;
        var _this = this;
        var _id = new mongoose_1.Types.ObjectId();
        _this = _super.call(this, _id) || this;
        _this.img = init.img;
        _this.title = init.title;
        _this.desc = init.desc;
        _this.isActive = init.isActive;
        _this.billboardType = init.billboardType;
        _this.filters = (_a = init.filters) !== null && _a !== void 0 ? _a : null;
        _this.billboardRef = init.billboardRef;
        return _this;
    }
    return Billboard;
}(base_entity_1["default"]));
exports["default"] = Billboard;
