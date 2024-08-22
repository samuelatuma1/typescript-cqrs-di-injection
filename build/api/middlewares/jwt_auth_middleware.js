"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../../core/application/contract/services/authentication/user_service");
const tsyringe_1 = require("tsyringe");
let JwtMiddlewareAuth = class JwtMiddlewareAuth {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    verifyUserHasPermission = (permissions, req, res, next) => {
        let token = req.headers.authorization ?? '';
        let decodedToken = this.userService.decodeAccessToken(token);
        if (!decodedToken) {
            return res.status(403).json('Invalid token');
        }
        if (decodedToken.isAdmin) {
            return next();
        }
        for (let permission of permissions) {
            if (decodedToken.permissions.includes(permission)) {
                return next();
            }
        }
        return res.status(403).json('Permission denied');
    };
};
JwtMiddlewareAuth = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(user_service_1.IIUserService)),
    __metadata("design:paramtypes", [Object])
], JwtMiddlewareAuth);
exports.default = JwtMiddlewareAuth;
//# sourceMappingURL=jwt_auth_middleware.js.map