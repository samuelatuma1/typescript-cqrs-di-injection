import { NextFunction, Request, Response } from "express";
import IUserService from "../../core/application/contract/services/authentication/user_service";
export default class AuthenticationController {
    private userService;
    constructor(userService: IUserService);
    createPermission: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
