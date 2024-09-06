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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const user_service_1 = require("../../core/application/contract/services/authentication/user_service");
const add_permission_to_user_request_1 = __importDefault(require("../../core/domain/authentication/dto/requests/add_permission_to_user_request"));
const add_role_to_user_request_1 = __importDefault(require("../../core/domain/authentication/dto/requests/add_role_to_user_request"));
const mongoose_1 = require("mongoose");
const base_controller_1 = __importDefault(require("./base_controller"));
let AuthenticationController = class AuthenticationController extends base_controller_1.default {
    userService;
    constructor(userService) {
        super();
        this.userService = userService;
    }
    createPermission = async (req, res, next) => {
        try {
            const permission = await this.userService.createPermission(req.body);
            res.json(permission);
        }
        catch (ex) {
            next(ex);
        }
    };
    createRole = async (req, res, next) => {
        try {
            const role = await this.userService.createRole(req.body);
            return res.json(role);
        }
        catch (ex) {
            next(ex);
        }
    };
    addPermissions = async (req, res, next) => {
        try {
            const roleWithPermissions = await this.userService.addPermissionsToRole(req.body.roleName, req.body.permissions);
            return res.json(roleWithPermissions);
        }
        catch (ex) {
            next(ex);
        }
    };
    removePermissionsFromRole = async (req, res, next) => {
        try {
            const roleWithPermissions = await this.userService.removePermissionsFromRole(req.body.roleName, req.body.permissions);
            return res.json(roleWithPermissions);
        }
        catch (ex) {
            next(ex);
        }
    };
    createUser = async (req, res, next) => {
        try {
            const createdUser = await this.userService.createUser(req.body);
            return res.json(createdUser);
        }
        catch (ex) {
            next(ex);
        }
    };
    addPermissionsToUser = async (req, res, next) => {
        try {
            var addPermissionRequest = new add_permission_to_user_request_1.default(req.body.userId, req.body.permissions);
            const userWithPermissions = await this.userService.assignPermissionsToUser(addPermissionRequest.userId, addPermissionRequest.permissions);
            return res.json(userWithPermissions);
        }
        catch (ex) {
            next(ex);
        }
    };
    addRolesToUser = async (req, res, next) => {
        try {
            var addPermissionRequest = new add_role_to_user_request_1.default(req.body.userId, req.body.roles);
            const userWithPermissions = await this.userService.assignRolesToUser(addPermissionRequest.userId, addPermissionRequest.roles);
            return res.json(userWithPermissions);
        }
        catch (ex) {
            next(ex);
        }
    };
    getUserWithAllPermissions = async (req, res, next) => {
        try {
            var userId = new mongoose_1.Types.ObjectId(req.params.userId);
            console.log({ params: req.params, query: req.query, userId });
            const userWithPermissions = await this.userService.getUserWithAllPermissions(userId);
            return res.json(userWithPermissions);
        }
        catch (ex) {
            next(ex);
        }
    };
    signInUser = async (req, res, next) => {
        try {
            console.log(req.body);
            let signedInUser = await this.userService.signInUser(req.body);
            return res.json(signedInUser);
        }
        catch (ex) {
            next(ex);
        }
    };
};
AuthenticationController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(user_service_1.IIUserService)),
    __metadata("design:paramtypes", [Object])
], AuthenticationController);
exports.default = AuthenticationController;
//# sourceMappingURL=authentication_controller.js.map