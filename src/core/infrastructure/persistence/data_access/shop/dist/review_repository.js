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
var base_repository_1 = require("../common/base_repository");
var review_config_1 = require("../../entity_configuration/shop/review_config");
var ReviewRepository = /** @class */ (function (_super) {
    __extends(ReviewRepository, _super);
    function ReviewRepository() {
        return _super.call(this, review_config_1.reviewModel) || this;
    }
    return ReviewRepository;
}(base_repository_1.BaseRepository));
exports["default"] = ReviewRepository;
