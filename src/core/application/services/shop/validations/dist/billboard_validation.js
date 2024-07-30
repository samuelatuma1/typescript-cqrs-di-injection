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
exports.CreateBillboardValidator = void 0;
var billboard_type_1 = require("../../../../domain/shop/enum/billboard_type");
var fluentvalidation_ts_1 = require("fluentvalidation-ts");
var CreateBillboardValidator = /** @class */ (function (_super) {
    __extends(CreateBillboardValidator, _super);
    function CreateBillboardValidator() {
        var _this = _super.call(this) || this;
        _this.isVAalidBillBoardType = function (createBillboardReq) {
            return Object.values(billboard_type_1.BillboardType).includes(createBillboardReq);
        };
        _this.ruleFor('title')
            .notEmpty()
            .notNull()
            .withMessage("Please input a title");
        _this.ruleFor('billboardType')
            .notEmpty()
            .notNull()
            .withMessage("Please provide billboard type")
            .must(function (x) { return _this.isVAalidBillBoardType(x); })
            .withMessage("Invalid billboard type");
        _this.ruleFor('billboardRef')
            .notNull()
            .must(function (x) { return x.toString().length > 0; });
        return _this;
    }
    return CreateBillboardValidator;
}(fluentvalidation_ts_1.Validator));
exports.CreateBillboardValidator = CreateBillboardValidator;
