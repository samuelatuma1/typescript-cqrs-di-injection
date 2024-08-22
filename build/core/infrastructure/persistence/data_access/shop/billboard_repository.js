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
const base_repository_1 = require("../common/base_repository");
const billboard_config_1 = require("../../entity_configuration/shop/billboard_config");
const tsyringe_1 = require("tsyringe");
let BillboardRepository = class BillboardRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(billboard_config_1.billboardModel);
    }
};
BillboardRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], BillboardRepository);
exports.default = BillboardRepository;
//# sourceMappingURL=billboard_repository.js.map