"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var user_service_1 = require("../../core/application/contract/services/authentication/user_service");
var tsyringe_1 = require("tsyringe");
var JwtMiddlewareAuth = /** @class */ (function () {
    function JwtMiddlewareAuth(userService) {
        var _this = this;
        this.userService = userService;
        this.verifyUserHasPermission = function (permissions, req, res, next) {
            var _a;
            var token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
            var decodedToken = _this.userService.decodeAccessToken(token);
            if (!decodedToken) {
                return res.status(403).json('Invalid token');
            }
            if (decodedToken.isAdmin) {
                return next();
            }
            for (var _i = 0, permissions_1 = permissions; _i < permissions_1.length; _i++) {
                var permission = permissions_1[_i];
                if (decodedToken.permissions.includes(permission)) {
                    return next();
                }
            }
            return res.status(403).json('Permission denied');
        };
    }
    JwtMiddlewareAuth = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(user_service_1.IIUserService))
    ], JwtMiddlewareAuth);
    return JwtMiddlewareAuth;
}());
exports["default"] = JwtMiddlewareAuth;
