"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBillboardValidator = void 0;
const billboard_type_1 = require("../../../../domain/shop/enum/billboard_type");
const fluentvalidation_ts_1 = require("fluentvalidation-ts");
class CreateBillboardValidator extends fluentvalidation_ts_1.Validator {
    constructor() {
        super();
        this.ruleFor('title')
            .notEmpty()
            .notNull()
            .withMessage("Please input a title");
        this.ruleFor('billboardType')
            .notEmpty()
            .notNull()
            .withMessage("Please provide billboard type")
            .must((x) => this.isVAalidBillBoardType(x))
            .withMessage("Invalid billboard type");
        this.ruleFor('billboardRef')
            .notNull()
            .must(x => x.toString().length > 0);
    }
    isVAalidBillBoardType = (createBillboardReq) => {
        return Object.values(billboard_type_1.BillboardType).includes(createBillboardReq);
    };
}
exports.CreateBillboardValidator = CreateBillboardValidator;
//# sourceMappingURL=billboard_validation.js.map