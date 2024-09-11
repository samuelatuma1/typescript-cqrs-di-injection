"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_repository_1 = require("../common/base_repository");
const review_config_1 = require("../../entity_configuration/shop/review_config");
class ReviewRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(review_config_1.reviewModel);
    }
}
exports.default = ReviewRepository;
//# sourceMappingURL=review_repository.js.map