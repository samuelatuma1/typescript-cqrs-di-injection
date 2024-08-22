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
var Catalogue = /** @class */ (function (_super) {
    __extends(Catalogue, _super);
    function Catalogue(init) {
        var _this = _super.call(this, new mongoose_1.Types.ObjectId()) || this;
        _this.isFeatured = init.isFeatured;
        _this.title = init.title;
        _this.desc = init.desc;
        _this.mainImg = init.mainImg;
        _this.products = [];
        return _this;
    }
    return Catalogue;
}(base_entity_1["default"]));
exports["default"] = Catalogue;
