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
var user_status_1 = require("../enum/user_status");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(email, password, name, permissions, roles, status) {
        if (name === void 0) { name = ''; }
        if (permissions === void 0) { permissions = []; }
        if (roles === void 0) { roles = []; }
        if (status === void 0) { status = user_status_1.UserStatus.PENDING_VERIFICATION; }
        var _this = this;
        var id = new mongoose_1.Types.ObjectId();
        _this = _super.call(this, id) || this;
        _this.isactive = true;
        _this.isadmin = false;
        _this.roles = [];
        _this.status = user_status_1.UserStatus.PENDING_VERIFICATION;
        _this.address = null;
        _this.permissions = [];
        _this.email = email;
        _this.name = name,
            _this.password = password;
        _this.permissions = permissions;
        _this.roles = roles;
        _this.address = null;
        _this.status = status;
        return _this;
    }
    return User;
}(base_entity_1["default"]));
exports["default"] = User;
