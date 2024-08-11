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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var tsyringe_1 = require("tsyringe");
var user_service_1 = require("../../core/application/contract/services/authentication/user_service");
var add_permission_to_user_request_1 = require("../../core/domain/authentication/dto/requests/add_permission_to_user_request");
var add_role_to_user_request_1 = require("../../core/domain/authentication/dto/requests/add_role_to_user_request");
var mongoose_1 = require("mongoose");
var base_controller_1 = require("./base_controller");
var AuthenticationController = /** @class */ (function (_super) {
    __extends(AuthenticationController, _super);
    function AuthenticationController(userService) {
        var _this = _super.call(this) || this;
        _this.userService = userService;
        _this.createPermission = function (req, res, next) { return __awaiter(_this, void 0, Promise, function () {
            var permission, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userService.createPermission(req.body)];
                    case 1:
                        permission = _a.sent();
                        res.json(permission);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        next(ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.createRole = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var role, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userService.createRole(req.body)];
                    case 1:
                        role = _a.sent();
                        return [2 /*return*/, res.json(role)];
                    case 2:
                        ex_2 = _a.sent();
                        next(ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.addPermissions = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var roleWithPermissions, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userService.addPermissionsToRole(req.body.roleName, req.body.permissions)];
                    case 1:
                        roleWithPermissions = _a.sent();
                        return [2 /*return*/, res.json(roleWithPermissions)];
                    case 2:
                        ex_3 = _a.sent();
                        next(ex_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.removePermissionsFromRole = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var roleWithPermissions, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userService.removePermissionsFromRole(req.body.roleName, req.body.permissions)];
                    case 1:
                        roleWithPermissions = _a.sent();
                        return [2 /*return*/, res.json(roleWithPermissions)];
                    case 2:
                        ex_4 = _a.sent();
                        next(ex_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.createUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var createdUser, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userService.createUser(req.body)];
                    case 1:
                        createdUser = _a.sent();
                        return [2 /*return*/, res.json(createdUser)];
                    case 2:
                        ex_5 = _a.sent();
                        next(ex_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.addPermissionsToUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var addPermissionRequest, userWithPermissions, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        addPermissionRequest = new add_permission_to_user_request_1["default"](req.body.userId, req.body.permissions);
                        return [4 /*yield*/, this.userService.assignPermissionsToUser(addPermissionRequest.userId, addPermissionRequest.permissions)];
                    case 1:
                        userWithPermissions = _a.sent();
                        return [2 /*return*/, res.json(userWithPermissions)];
                    case 2:
                        ex_6 = _a.sent();
                        next(ex_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.addRolesToUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var addPermissionRequest, userWithPermissions, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        addPermissionRequest = new add_role_to_user_request_1["default"](req.body.userId, req.body.roles);
                        return [4 /*yield*/, this.userService.assignRolesToUser(addPermissionRequest.userId, addPermissionRequest.roles)];
                    case 1:
                        userWithPermissions = _a.sent();
                        return [2 /*return*/, res.json(userWithPermissions)];
                    case 2:
                        ex_7 = _a.sent();
                        next(ex_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.getUserWithAllPermissions = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userId, userWithPermissions, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = new mongoose_1.Types.ObjectId(req.params.userId);
                        console.log({ params: req.params, query: req.query, userId: userId });
                        return [4 /*yield*/, this.userService.getUserWithAllPermissions(userId)];
                    case 1:
                        userWithPermissions = _a.sent();
                        return [2 /*return*/, res.json(userWithPermissions)];
                    case 2:
                        ex_8 = _a.sent();
                        next(ex_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.signInUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var signedInUser, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log(req.body);
                        return [4 /*yield*/, this.userService.signInUser(req.body)];
                    case 1:
                        signedInUser = _a.sent();
                        return [2 /*return*/, res.json(signedInUser)];
                    case 2:
                        ex_9 = _a.sent();
                        next(ex_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    AuthenticationController = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(user_service_1.IIUserService))
    ], AuthenticationController);
    return AuthenticationController;
}(base_controller_1["default"]));
exports["default"] = AuthenticationController;
