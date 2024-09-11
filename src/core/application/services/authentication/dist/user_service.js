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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var tsyringe_1 = require("tsyringe");
var create_permission_response_dto_1 = require("../../../domain/authentication/dto/responses/create_permission_response_dto");
var permission_repository_1 = require("../../contract/data_access/authentication/permission_repository");
var duplicate_exception_1 = require("../../common/exceptions/duplicate_exception");
var user_permission_1 = require("../../../domain/authentication/entity/user_permission");
var event_tracer_1 = require("../../contract/observability/event_tracer");
var role_repository_1 = require("../../contract/data_access/authentication/role_repository");
var user_role_1 = require("../../../domain/authentication/entity/user_role");
var create_role_response_1 = require("../../../domain/authentication/dto/responses/create_role_response");
var not_found_exception_1 = require("../../../application/common/exceptions/not_found_exception");
var mongoose_1 = require("mongoose");
var user_repository_1 = require("../../../application/contract/data_access/authentication/user_repository");
var hash_utility_1 = require("../../../application/common/utilities/hash_utility");
var service_config_1 = require("../../../application/common/config/service_config");
var user_1 = require("../../../domain/authentication/entity/user");
var validation_exception_1 = require("../../../application/common/exceptions/validation_exception");
var user_not_active_exception_1 = require("../../../application/common/exceptions/user_not_active_exception");
var jwt_service_1 = require("../../../application/contract/services/authentication/jwt_service");
var UserService = /** @class */ (function () {
    function UserService(eventTracer, serviceConfig, permissionRepository, roleRepository, userRepository, jwtService) {
        var _this = this;
        this.eventTracer = eventTracer;
        this.serviceConfig = serviceConfig;
        this.permissionRepository = permissionRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.createPermission = function (createPermissionRequest) { return __awaiter(_this, void 0, Promise, function () {
            var permissionWithName, userPermission, savedPermission, response, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.eventTracer.say("Creating permission");
                        this.eventTracer.request = createPermissionRequest;
                        return [4 /*yield*/, this.permissionRepository.firstOrDefaultAsync({ name: createPermissionRequest.name })];
                    case 1:
                        permissionWithName = _a.sent();
                        if (permissionWithName) {
                            throw new duplicate_exception_1["default"]("Permission with name " + createPermissionRequest.name + " already exists");
                        }
                        this.eventTracer.say("Not a duplicate permission");
                        userPermission = new user_permission_1["default"](createPermissionRequest.name, createPermissionRequest.desc);
                        return [4 /*yield*/, this.permissionRepository.addAsync(userPermission)];
                    case 2:
                        savedPermission = _a.sent();
                        response = new create_permission_response_dto_1["default"](savedPermission._id, savedPermission.name, savedPermission.desc);
                        this.eventTracer.isSuccessWithResponseAndMessage(response, "Permission successfully created");
                        return [2 /*return*/, response];
                    case 3:
                        ex_1 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_1);
                        throw ex_1;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.deletePermission = function (permissionName) { return __awaiter(_this, void 0, Promise, function () {
            var permission, deleteCount, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        // find permission by name 
                        this.eventTracer.say("Deleting permission with name : " + permissionName);
                        return [4 /*yield*/, this.permissionRepository.firstOrDefaultAsync({ name: permissionName })];
                    case 1:
                        permission = _a.sent();
                        deleteCount = 0;
                        if (!permission) return [3 /*break*/, 3];
                        this.eventTracer.say("Permission found");
                        return [4 /*yield*/, this.permissionRepository.deleteAsync(permission)];
                    case 2:
                        deleteCount = _a.sent();
                        this.eventTracer.say("Permissions deleted count : " + deleteCount);
                        _a.label = 3;
                    case 3:
                        this.eventTracer.isSuccess();
                        return [2 /*return*/, deleteCount];
                    case 4:
                        ex_2 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_2);
                        throw ex_2;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.createRole = function (createRoleRequest) { return __awaiter(_this, void 0, Promise, function () {
            var roleWithName, userRole, savedRole, response, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.eventTracer.say("Creating role");
                        this.eventTracer.request = createRoleRequest;
                        return [4 /*yield*/, this.roleRepository.firstOrDefaultAsync({ name: createRoleRequest.name })];
                    case 1:
                        roleWithName = _a.sent();
                        if (roleWithName) {
                            throw new duplicate_exception_1["default"]("Role with name " + roleWithName.name + " already exists");
                        }
                        userRole = new user_role_1["default"](createRoleRequest.name, createRoleRequest.desc);
                        return [4 /*yield*/, this.roleRepository.addAsync(userRole)];
                    case 2:
                        savedRole = _a.sent();
                        response = new create_role_response_1["default"](savedRole.name, savedRole._id, savedRole.desc);
                        this.eventTracer.isSuccessWithResponseAndMessage(response, "Role successfully created");
                        return [2 /*return*/, response];
                    case 3:
                        ex_3 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_3);
                        throw ex_3;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.addPermissionsToRole = function (roleName, permissions) { return __awaiter(_this, void 0, Promise, function () {
            var permissionsWithName, role, existingRolePermissions, existingRolePermissionsSet, _i, permissionsWithName_1, permission, response, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        // get all permissions with name 
                        this.eventTracer.say("adding permissions: " + permissions + " to role: " + roleName);
                        return [4 /*yield*/, this.permissionRepository.contains({ name: permissions })];
                    case 1:
                        permissionsWithName = _a.sent();
                        this.eventTracer.say("Permissions found: " + permissionsWithName);
                        if (!permissionsWithName) {
                            this.eventTracer.isErrorWithMessage("No permission found");
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.roleRepository.firstOrDefaultAsync({ name: roleName })];
                    case 2:
                        role = _a.sent();
                        if (!role) {
                            throw new not_found_exception_1["default"]("Role with name " + roleName + " not found");
                        }
                        existingRolePermissions = role.permissions;
                        existingRolePermissionsSet = new Set(existingRolePermissions.map(function (permission) { return permission.toJSON(); }));
                        for (_i = 0, permissionsWithName_1 = permissionsWithName; _i < permissionsWithName_1.length; _i++) {
                            permission = permissionsWithName_1[_i];
                            existingRolePermissionsSet.add(permission._id.toJSON());
                        }
                        role.permissions = __spreadArrays(existingRolePermissionsSet).map(function (permission) { return new mongoose_1.Types.ObjectId(permission); });
                        this.eventTracer.say("Cleaned permissions " + role.permissions);
                        return [4 /*yield*/, this.roleRepository.updateByIdAsync(role._id, role)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.roleRepository.getByIdAsync(role._id, { permissions: true })];
                    case 4:
                        response = _a.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(response);
                        return [2 /*return*/, response];
                    case 5:
                        ex_4 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_4);
                        throw ex_4;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.removePermissionsFromRole = function (roleName, permissions) { return __awaiter(_this, void 0, Promise, function () {
            var permissionsWithName, role, existingRolePermissions, existingRolePermissionsSet, _i, permissionsWithName_2, permission, response, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        // get all permissions with name 
                        this.eventTracer.say("adding permissions: " + permissions + " to role: " + roleName);
                        return [4 /*yield*/, this.permissionRepository.contains({ name: permissions })];
                    case 1:
                        permissionsWithName = _a.sent();
                        this.eventTracer.say("Permissions found: " + permissionsWithName);
                        if (!permissionsWithName.length) {
                            this.eventTracer.isErrorWithMessage("No permission found");
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.roleRepository.firstOrDefaultAsync({ name: roleName })];
                    case 2:
                        role = _a.sent();
                        if (!role) {
                            throw new not_found_exception_1["default"]("Role with name " + roleName + " not found");
                        }
                        existingRolePermissions = role.permissions;
                        existingRolePermissionsSet = new Set(existingRolePermissions.map(function (permission) { return permission.toJSON(); }));
                        for (_i = 0, permissionsWithName_2 = permissionsWithName; _i < permissionsWithName_2.length; _i++) {
                            permission = permissionsWithName_2[_i];
                            existingRolePermissionsSet["delete"](permission._id.toJSON());
                        }
                        role.permissions = __spreadArrays(existingRolePermissionsSet).map(function (permission) { return new mongoose_1.Types.ObjectId(permission); });
                        this.eventTracer.say("Cleaned permissions " + role.permissions);
                        return [4 /*yield*/, this.roleRepository.updateByIdAsync(role._id, role)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.roleRepository.getByIdAsync(role._id, { permissions: true })];
                    case 4:
                        response = _a.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(response);
                        return [2 /*return*/, response];
                    case 5:
                        ex_5 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_5);
                        throw ex_5;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.createUser = function (createUserRequest) { return __awaiter(_this, void 0, Promise, function () {
            var userExists, hashedPassword, user, response, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        // verify email is unique,
                        this.eventTracer.say("Creating user with email : " + createUserRequest.email);
                        this.eventTracer.say("hashkey: " + this.serviceConfig.hashkey);
                        return [4 /*yield*/, this.userRepository.firstOrDefaultAsync({ email: createUserRequest.email })];
                    case 1:
                        userExists = _a.sent();
                        if (userExists) {
                            throw new duplicate_exception_1["default"]("User with email " + createUserRequest.email + " already exists");
                        }
                        hashedPassword = this.hashUserPassword(createUserRequest.password);
                        this.eventTracer.say("Hashed Password: " + hashedPassword + ", hashkey: " + this.serviceConfig.hashkey);
                        user = new user_1["default"](createUserRequest.email, hashedPassword, createUserRequest.name);
                        return [4 /*yield*/, this.userRepository.addAsync(user)];
                    case 2:
                        response = _a.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(response);
                        return [2 /*return*/, response
                            //
                        ];
                    case 3:
                        ex_6 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_6);
                        throw ex_6;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.hashUserPassword = function (password) {
            return hash_utility_1["default"].hashStringWithSha512(password, _this.serviceConfig.hashkey);
        };
        this.doesPasswordMatchHash = function (password, hash) {
            var hashPassword = _this.hashUserPassword(password);
            return hashPassword === hash;
        };
        this.assignPermissionsToUser = function (userId, permissions) { return __awaiter(_this, void 0, Promise, function () {
            var permissionsWithName, user, existingUserPermissions, existingUserPermissionsSet, _i, permissionsWithName_3, permission, response, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        // get all permissions with name 
                        this.eventTracer.say("adding permissions: " + permissions + " to user with id: " + userId);
                        return [4 /*yield*/, this.permissionRepository.contains({ name: permissions })];
                    case 1:
                        permissionsWithName = _a.sent();
                        this.eventTracer.say("Permissions found: " + permissionsWithName);
                        if (!permissionsWithName.length) {
                            this.eventTracer.isErrorWithMessage("No permission found");
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.userRepository.firstOrDefaultAsync({ _id: userId })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            throw new not_found_exception_1["default"]("User with id " + userId + " not found");
                        }
                        existingUserPermissions = user.permissions;
                        existingUserPermissionsSet = new Set(existingUserPermissions.map(function (permission) { return permission.toJSON(); }));
                        for (_i = 0, permissionsWithName_3 = permissionsWithName; _i < permissionsWithName_3.length; _i++) {
                            permission = permissionsWithName_3[_i];
                            existingUserPermissionsSet.add(permission._id.toJSON());
                        }
                        user.permissions = __spreadArrays(existingUserPermissionsSet).map(function (permission) { return new mongoose_1.Types.ObjectId(permission); });
                        this.eventTracer.say("Cleaned permissions " + user.permissions);
                        return [4 /*yield*/, this.userRepository.updateByIdAsync(user._id, user)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.userRepository.getByIdAsync(user._id, { permissions: true })];
                    case 4:
                        response = _a.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(response);
                        return [2 /*return*/, response];
                    case 5:
                        ex_7 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_7);
                        throw ex_7;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.assignRolesToUser = function (userId, roles) { return __awaiter(_this, void 0, Promise, function () {
            var rolesWithNames, user, existingUserRoles, existingUserRolesSet, _i, rolesWithNames_1, role, response, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        // get all permissions with name 
                        this.eventTracer.say("adding permissions: " + roles + " to user with id: " + userId);
                        return [4 /*yield*/, this.roleRepository.contains({ name: roles })];
                    case 1:
                        rolesWithNames = _a.sent();
                        this.eventTracer.say("Roles found: " + rolesWithNames);
                        if (!rolesWithNames.length) {
                            this.eventTracer.isErrorWithMessage("No role found");
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.userRepository.firstOrDefaultAsync({ _id: userId })];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            throw new not_found_exception_1["default"]("User with id " + userId + " not found");
                        }
                        existingUserRoles = user.roles;
                        existingUserRolesSet = new Set(existingUserRoles.map(function (role) { return role.toJSON(); }));
                        for (_i = 0, rolesWithNames_1 = rolesWithNames; _i < rolesWithNames_1.length; _i++) {
                            role = rolesWithNames_1[_i];
                            existingUserRolesSet.add(role._id.toJSON());
                        }
                        user.roles = __spreadArrays(existingUserRolesSet).map(function (role) { return new mongoose_1.Types.ObjectId(role); });
                        this.eventTracer.say("Cleaned roles " + user.roles);
                        return [4 /*yield*/, this.userRepository.updateByIdAsync(user._id, user)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.userRepository.getByIdAsync(user._id, { roles: true })];
                    case 4:
                        response = _a.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(response);
                        return [2 /*return*/, response];
                    case 5:
                        ex_8 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_8);
                        throw ex_8;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getUserWithAllPermissions = function (userId) { return __awaiter(_this, void 0, Promise, function () {
            var user, userRoles, permissionIds, _i, userRoles_1, role, rolePermissions, permissionsSet, permissionsObjectIds, allRolesPermissions, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        this.eventTracer.say("Getting all user roles");
                        return [4 /*yield*/, this.userRepository.firstOrDefaultAsync({ _id: userId }, { permissions: false, roles: true })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new not_found_exception_1["default"]("User with id " + userId + " not found");
                        }
                        userRoles = user.roles;
                        permissionIds = new Set(user.permissions.map(function (permission) { return permission.toString(); }));
                        this.eventTracer.say("User Permissions " + __spreadArrays(permissionIds));
                        for (_i = 0, userRoles_1 = userRoles; _i < userRoles_1.length; _i++) {
                            role = userRoles_1[_i];
                            rolePermissions = role.permissions;
                            permissionsSet = new Set(rolePermissions.map(function (permission) { return permission.toJSON(); }));
                            permissionIds = new Set(__spreadArrays(permissionIds, permissionsSet));
                        }
                        console.log({ permissionIds: permissionIds });
                        permissionsObjectIds = __spreadArrays(permissionIds).map(function (role) { return new mongoose_1.Types.ObjectId(role); });
                        this.eventTracer.say("permission ids for user " + permissionsObjectIds + "; Getting them now  :-)");
                        return [4 /*yield*/, this.permissionRepository.contains({ _id: permissionsObjectIds })];
                    case 2:
                        allRolesPermissions = _a.sent();
                        user.permissions = allRolesPermissions;
                        this.eventTracer.isSuccessWithResponseAndMessage(user);
                        return [2 /*return*/, user];
                    case 3:
                        ex_9 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_9);
                        throw ex_9;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.getUserByEmail = function (email) { return __awaiter(_this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.firstOrDefaultAsync({ email: email })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.signInUser = function (signInUser) { return __awaiter(_this, void 0, Promise, function () {
            var user, isValidPassword, userPermissions, userPermissionIdsFromRoles_1, allUserRolesPermissions, permissionNames, roleNames, accessTokenPayload, refreshTokenPayload, accessTokenExpiryInSeconds, accessToken, refreshTokenExpiryInSeconds, refreshToken, response, ex_10;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        this.eventTracer.request = signInUser;
                        this.eventTracer.say("Sign in user");
                        return [4 /*yield*/, this.userRepository.firstOrDefaultAsync({ email: signInUser.email }, { roles: true, permissions: true })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw new not_found_exception_1["default"]("User with email " + signInUser.email + " does not exist");
                        }
                        isValidPassword = this.doesPasswordMatchHash(signInUser.password, user.password);
                        if (!isValidPassword) {
                            throw new validation_exception_1["default"]("Password incorrect");
                        }
                        if (!user.isactive) {
                            throw new user_not_active_exception_1["default"]("User not active");
                        }
                        userPermissions = (_a = user.permissions) !== null && _a !== void 0 ? _a : [];
                        this.eventTracer.say("Saved user permissions " + userPermissions.length);
                        userPermissionIdsFromRoles_1 = [];
                        user.roles.forEach(function (role) {
                            var permissionForRoles = [];
                            for (var _i = 0, _a = role.permissions; _i < _a.length; _i++) {
                                var userPermissionId = _a[_i];
                                console.log({ userPermissionId: userPermissionId });
                                permissionForRoles.push(userPermissionId);
                            }
                            userPermissionIdsFromRoles_1 = __spreadArrays(userPermissionIdsFromRoles_1, permissionForRoles);
                        });
                        return [4 /*yield*/, this.permissionRepository.contains({ _id: userPermissionIdsFromRoles_1 })];
                    case 2:
                        allUserRolesPermissions = _b.sent();
                        this.eventTracer.say("Getting user permissions from roles");
                        userPermissions = __spreadArrays(userPermissions, allUserRolesPermissions);
                        permissionNames = userPermissions.map(function (permission) { return permission.name; });
                        this.eventTracer.say("All user permissions count: " + userPermissions.length + ".\nAll user roles count: " + user.roles.length + ".");
                        roleNames = user.roles.map(function (role) { return role.name; });
                        this.eventTracer.say("Getting access and refresh tokens");
                        accessTokenPayload = {
                            email: user.email,
                            roles: roleNames,
                            permissions: permissionNames,
                            isAdmin: user.isadmin
                        };
                        refreshTokenPayload = {
                            email: user.email
                        };
                        accessTokenExpiryInSeconds = 60 * 60;
                        accessToken = this.jwtService.encode(accessTokenPayload, accessTokenExpiryInSeconds, this.serviceConfig.jwtsecret);
                        refreshTokenExpiryInSeconds = 60 * 60 * 24;
                        refreshToken = this.jwtService.encode(refreshTokenPayload, refreshTokenExpiryInSeconds, this.serviceConfig.jwtsecret);
                        response = {
                            email: user.email,
                            roles: roleNames,
                            permissions: permissionNames,
                            isAdmin: user.isadmin,
                            accessTokenExpiryInSeconds: accessTokenExpiryInSeconds,
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                            refreshTokenExpiryInSeconds: refreshTokenExpiryInSeconds
                        };
                        this.eventTracer.isSuccessWithResponseAndMessage(response, "user successfully signed in");
                        return [2 /*return*/, response];
                    case 3:
                        ex_10 = _b.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_10);
                        throw ex_10;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.decodeAccessToken = function (token) {
            try {
                return _this.jwtService.decode(token, _this.serviceConfig.jwtsecret);
            }
            catch (ex) {
                _this.eventTracer.isExceptionWithMessage("" + ex);
                return null;
            }
        };
        this.getUsersWithRolesOrPermissions = function (rolesOrPermissions) { return __awaiter(_this, void 0, Promise, function () {
            var userRoles, permissions, users;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        userRoles = [];
                        permissions = [];
                        if (!((_a = rolesOrPermissions.roles) === null || _a === void 0 ? void 0 : _a.length)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.roleRepository.contains({ name: rolesOrPermissions.roles })];
                    case 1:
                        userRoles = _c.sent();
                        _c.label = 2;
                    case 2:
                        if (!((_b = rolesOrPermissions.permissions) === null || _b === void 0 ? void 0 : _b.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.permissionRepository.contains({ name: rolesOrPermissions.permissions })];
                    case 3:
                        permissions = _c.sent();
                        _c.label = 4;
                    case 4: return [4 /*yield*/, this.userRepository.or([{ roles: userRoles.map(function (role) { return role._id; }) }, { permissions: permissions.map(function (permission) { return permission._id; }) }])];
                    case 5:
                        users = _c.sent();
                        return [2 /*return*/, users];
                }
            });
        }); };
    }
    UserService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(event_tracer_1.IIEventTracer)),
        __param(1, tsyringe_1.inject(service_config_1.IIServiceConfig)),
        __param(2, tsyringe_1.inject(permission_repository_1.IIUserPermissionRepository)),
        __param(3, tsyringe_1.inject(role_repository_1.IIRoleRepository)),
        __param(4, tsyringe_1.inject(user_repository_1.IIUserRepository)),
        __param(5, tsyringe_1.inject(jwt_service_1.IIJwtService))
    ], UserService);
    return UserService;
}());
exports["default"] = UserService;
