"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_repository_1 = require("../common/base_repository");
const brand_config_1 = require("../../entity_configuration/shop/brand_config");
class BrandRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(brand_config_1.brandModel);
    }
}
exports.default = BrandRepository;
//# sourceMappingURL=brand_repository.js.map