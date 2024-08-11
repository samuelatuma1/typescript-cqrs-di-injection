import { Router, Request } from "express";
import { iocContainer } from "../program";
import AuthenticationController from "../controllers/authentication_controller";

const authenticationRoute = Router();

const authController = iocContainer.resolve(AuthenticationController);

authenticationRoute.post('/permissions', (req, res, next) => authController.createPermission(req, res, next));
authenticationRoute.post('/roles', (req, res, next) => authController.createRole(req, res, next));
authenticationRoute.post("/role/add-permissions", (req, res, next) => authController.addPermissions(req, res, next));
authenticationRoute.post('/role/remove-permissions', (req, res, next) => authController.removePermissionsFromRole(req, res, next));
authenticationRoute.post('/user', (req, res, next) => authController.createUser(req, res, next));
authenticationRoute.post('/user/add-permissions', (req, res, next) => authController.addPermissionsToUser(req, res, next));
authenticationRoute.post('/user/add-roles', (req, res, next) => authController.addRolesToUser(req, res, next));
authenticationRoute.post('/user/user-permissions/:userId', (req: Request<{userId: string}>, res, next) => authController.getUserWithAllPermissions(req, res, next));
authenticationRoute.post('/user/sign-in', (req, res, next) => authController.signInUser(req, res, next));
export default authenticationRoute;
