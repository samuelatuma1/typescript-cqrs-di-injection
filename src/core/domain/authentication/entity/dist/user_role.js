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
var UserRole = /** @class */ (function (_super) {
    __extends(UserRole, _super);
    function UserRole(name, desc, permissions) {
        if (desc === void 0) { desc = ""; }
        if (permissions === void 0) { permissions = []; }
        var _this = this;
        var id = new mongoose_1.Types.ObjectId();
        _this = _super.call(this, id) || this;
        _this.permissions = [];
        _this.name = name;
        _this.desc = desc;
        _this.permissions = [];
        return _this;
    }
    return UserRole;
}(base_entity_1["default"]));
exports["default"] = UserRole;
