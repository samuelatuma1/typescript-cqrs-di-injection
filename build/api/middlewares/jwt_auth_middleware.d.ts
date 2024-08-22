import IUserService from "../../core/application/contract/services/authentication/user_service";
import { Request, NextFunction, Response } from "express";
export default class JwtMiddlewareAuth {
    private readonly userService;
    constructor(userService: IUserService);
    verifyUserHasPermission: (permissions: string[], req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
}
