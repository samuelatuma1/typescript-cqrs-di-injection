import { Router } from "express";
import { iocContainer } from "../program";
import AuthenticationController from "../controllers/authentication_controller";

const authenticationRoute = Router();

const authController = iocContainer.resolve(AuthenticationController);

authenticationRoute.post('/permissions', (req, res, next) => authController.createPermission(req, res, next));

export default authenticationRoute;
