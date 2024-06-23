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
var mongoose_1 = require("mongoose");
var base_entity_1 = require("../../common/entity/base_entity");
var UserPermission = /** @class */ (function (_super) {
    __extends(UserPermission, _super);
    function UserPermission(nameOrInit, desc) {
        if (nameOrInit === void 0) { nameOrInit = ''; }
        if (desc === void 0) { desc = ""; }
        var _this = this;
        var id = new mongoose_1.Types.ObjectId();
        _this = _super.call(this, id) || this;
        _this.desc = "";
        if (typeof nameOrInit === 'string') {
            _this.name = nameOrInit;
            _this.desc = desc;
        }
        else {
            _this.name = nameOrInit.name;
            _this.desc = nameOrInit.desc;
        }
        return _this;
    }
    return UserPermission;
}(base_entity_1["default"]));
exports["default"] = UserPermission;
