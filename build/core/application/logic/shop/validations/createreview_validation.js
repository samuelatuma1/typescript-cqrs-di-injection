"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fluentvalidation_ts_1 = require("fluentvalidation-ts");
class CreateReviewValidation extends fluentvalidation_ts_1.Validator {
    constructor() {
        super();
        this.ruleFor('rating').notNull().lessThan(6).withMessage(`Rating must nut exceed 5`);
        this.ruleFor('wouldRecommend').notNull();
        this.ruleFor('title').notEmpty().notNull();
        this.ruleFor('body').notEmpty().notNull();
        this.ruleFor('productId').notNull().must((id) => {
            try {
                id = new mongoose_1.Types.ObjectId(id);
                return true;
            }
            catch (ex) {
                return false;
            }
        }).withMessage('Please use a valid productId');
    }
}
exports.default = CreateReviewValidation;
//# sourceMappingURL=createreview_validation.js.map