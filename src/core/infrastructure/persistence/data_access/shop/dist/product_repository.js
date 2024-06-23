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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var tsyringe_1 = require("tsyringe");
var base_repository_1 = require("../common/base_repository");
var product_config_1 = require("../../entity_configuration/shop/product_config");
var ProductRepository = /** @class */ (function (_super) {
    __extends(ProductRepository, _super);
    function ProductRepository() {
        var _this = this;
        var _model = product_config_1.productModel;
        _this = _super.call(this, _model) || this;
        return _this;
    }
    ProductRepository = __decorate([
        tsyringe_1.injectable()
    ], ProductRepository);
    return ProductRepository;
}(base_repository_1.BaseRepository));
exports["default"] = ProductRepository;
