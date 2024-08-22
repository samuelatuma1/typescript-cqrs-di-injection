"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenPayload = exports.AccessTokenPayload = void 0;
class AccessTokenPayload {
    email;
    roles;
    permissions;
    isAdmin;
}
exports.AccessTokenPayload = AccessTokenPayload;
class RefreshTokenPayload {
    email;
}
exports.RefreshTokenPayload = RefreshTokenPayload;
//# sourceMappingURL=jwt_model.js.map