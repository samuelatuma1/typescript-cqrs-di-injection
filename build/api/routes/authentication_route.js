"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const program_1 = require("../program");
const authentication_controller_1 = __importDefault(require("../controllers/authentication_controller"));
const authenticationRoute = (0, express_1.Router)();
const authController = program_1.iocContainer.resolve(authentication_controller_1.default);
authenticationRoute.post('/permissions', (req, res, next) => authController.createPermission(req, res, next));
authenticationRoute.post('/roles', (req, res, next) => authController.createRole(req, res, next));
authenticationRoute.post("/role/add-permissions", (req, res, next) => authController.addPermissions(req, res, next));
authenticationRoute.post('/role/remove-permissions', (req, res, next) => authController.removePermissionsFromRole(req, res, next));
authenticationRoute.post('/user', (req, res, next) => authController.createUser(req, res, next));
authenticationRoute.post('/user/add-permissions', (req, res, next) => authController.addPermissionsToUser(req, res, next));
authenticationRoute.post('/user/add-roles', (req, res, next) => authController.addRolesToUser(req, res, next));
authenticationRoute.post('/user/user-permissions/:userId', (req, res, next) => authController.getUserWithAllPermissions(req, res, next));
authenticationRoute.post('/user/sign-in', (req, res, next) => authController.signInUser(req, res, next));
exports.default = authenticationRoute;
//# sourceMappingURL=authentication_route.js.map