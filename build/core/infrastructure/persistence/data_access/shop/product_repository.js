"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortOrder = void 0;
const tsyringe_1 = require("tsyringe");
const base_repository_1 = require("../common/base_repository");
const product_config_1 = require("../../entity_configuration/shop/product_config");
var SortOrder;
(function (SortOrder) {
    SortOrder["desc"] = "desc";
    SortOrder["asc"] = "asc";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
let ProductRepository = class ProductRepository extends base_repository_1.BaseRepository {
    constructor() {
        const _model = product_config_1.productModel;
        super(_model);
    }
};
ProductRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], ProductRepository);
exports.default = ProductRepository;
//# sourceMappingURL=product_repository.js.map