import IUserService, { IIUserService } from "../../core/application/contract/services/authentication/user_service";
import { AccessTokenPayload } from "../../core/domain/model/authentication/jwt_model";
import {    Request,  NextFunction, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export default class JwtMiddlewareAuth {
    public constructor(
        @inject(IIUserService)private readonly userService: IUserService,
    ){
        
    }

    public verifyUserHasPermission = (permissions: string[], req: Request, res: Response, next: NextFunction) => {
        let token = req.headers.authorization ?? '';
        let decodedToken: AccessTokenPayload | null = this.userService.decodeAccessToken(token);
        if(!decodedToken){
            return res.status(403).json('Invalid token');
        }
        if(decodedToken.isAdmin){
            return next();
        }
        for(let permission of permissions){
            if(decodedToken.permissions.includes(permission)){
                return next();
            }
        }

        return res.status(403).json('Permission denied');
    }
}