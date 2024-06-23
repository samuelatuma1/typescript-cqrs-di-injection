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
exports.Filter = void 0;
var mongoose_1 = require("mongoose");
var base_entity_1 = require("../../common/entity/base_entity");
var filter_type_1 = require("../enum/filter_type");
var Filter = /** @class */ (function (_super) {
    __extends(Filter, _super);
    // Implementation of the constructor
    function Filter(nameOrInit, categoryId, filterType, values) {
        if (nameOrInit === void 0) { nameOrInit = ''; }
        if (categoryId === void 0) { categoryId = null; }
        if (filterType === void 0) { filterType = filter_type_1.FilterType.string; }
        if (values === void 0) { values = []; }
        var _a, _b, _c, _d;
        var _this = this;
        var id = new mongoose_1.Types.ObjectId();
        _this = _super.call(this, id) || this;
        if (typeof nameOrInit === 'string') {
            _this.name = nameOrInit;
            _this.categoryId = categoryId;
            _this.filterType = filterType;
            _this.values = values;
        }
        else {
            _this.name = (_a = nameOrInit.name) !== null && _a !== void 0 ? _a : '';
            _this.categoryId = (_b = nameOrInit.categoryId) !== null && _b !== void 0 ? _b : null;
            _this.filterType = (_c = nameOrInit.filterType) !== null && _c !== void 0 ? _c : filter_type_1.FilterType.string;
            _this.values = (_d = nameOrInit.values) !== null && _d !== void 0 ? _d : [];
        }
        return _this;
    }
    return Filter;
}(base_entity_1["default"]));
exports.Filter = Filter;
