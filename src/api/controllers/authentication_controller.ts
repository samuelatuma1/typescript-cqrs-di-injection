import { inject, injectable } from "tsyringe";
import {NextFunction, Request, Response} from "express";
import IUserService, { IIUserService } from "../../core/application/contract/services/authentication/user_service";

@injectable()
export default class AuthenticationController {

  constructor(@inject(IIUserService) private userService: IUserService) {

  }

  createPermission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const permission = await this.userService.createPermission(req.body);
        res.json(permission);
    }
    catch(ex){
        next(ex)
    }
  }
}