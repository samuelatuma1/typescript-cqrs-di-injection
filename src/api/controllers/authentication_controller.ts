import { inject, injectable } from "tsyringe";
import {NextFunction, Request, Response} from "express";
import IUserService, { IIUserService } from "../../core/application/contract/services/authentication/user_service";
import CreatePermissionRequestDTO from "../../core/domain/authentication/dto/requests/create_permission_request_dto";
import CreateRoleRequest from "../../core/domain/authentication/dto/requests/create_role_request";
import AddPermissionRequest from "../../core/domain/authentication/dto/requests/add_permission_request";
import RemovePermissionFromRoleRequest from "../../core/domain/authentication/dto/requests/remove_permission_from_role_request";
import CreateUserRequest, { SignInUserRequest } from "../../core/domain/authentication/dto/requests/create_user_request";
import AddPermissionToUserRequest from "../../core/domain/authentication/dto/requests/add_permission_to_user_request";
import AddRolesToUserRequest from "../../core/domain/authentication/dto/requests/add_role_to_user_request";
import { Types } from "mongoose";
import BaseController from "./base_controller";

@injectable()
export default class AuthenticationController extends BaseController{

  constructor(@inject(IIUserService) private userService: IUserService) {
    super();
  }

  createPermission = async (req: Request<{}, {}, CreatePermissionRequestDTO>, res: Response, next: NextFunction): Promise<void> => {
    try{
        const permission = await this.userService.createPermission(req.body);
        res.json(permission);
    }
    catch(ex){
        next(ex)
    }
  }

  createRole = async (req: Request<{}, {}, CreateRoleRequest>, res: Response, next: NextFunction)  => {
      try{
        const role = await this.userService.createRole(req.body);
        return res.json(role);
      }
      catch(ex){
        next(ex)
      }
  }

  addPermissions = async (req: Request<{}, {}, AddPermissionRequest>, res: Response, next: NextFunction) => {
    try{
      const roleWithPermissions = await this.userService.addPermissionsToRole(req.body.roleName, req.body.permissions);
      return res.json(roleWithPermissions);
    }
    catch(ex){
      next(ex)
    }
  }

  removePermissionsFromRole = async (req: Request<{}, {}, RemovePermissionFromRoleRequest>, res: Response, next: NextFunction) => {
    try{
      const roleWithPermissions = await this.userService.removePermissionsFromRole(req.body.roleName, req.body.permissions);
      return res.json(roleWithPermissions);
    }
    catch(ex){
      next(ex)
    }
  }

  createUser = async (req: Request<{}, {}, CreateUserRequest>, res: Response, next: NextFunction) => {
    try{
      const createdUser = await this.userService.createUser(req.body);
      return res.json(createdUser);
    }
    catch(ex){
      next(ex)
    }
  }

  addPermissionsToUser = async (req: Request<{}, {}, AddPermissionToUserRequest>, res: Response, next: NextFunction) => {
    try{
      var addPermissionRequest = new AddPermissionToUserRequest(req.body.userId, req.body.permissions)
      const userWithPermissions = await this.userService.assignPermissionsToUser(addPermissionRequest.userId, addPermissionRequest.permissions);
      return res.json(userWithPermissions);
    }
    catch(ex){
      next(ex)
    }
  }

  addRolesToUser = async (req: Request<{}, {}, AddRolesToUserRequest>, res: Response, next: NextFunction) => {
    try{
      var addPermissionRequest = new AddRolesToUserRequest(req.body.userId, req.body.roles)
      const userWithPermissions = await this.userService.assignRolesToUser(addPermissionRequest.userId, addPermissionRequest.roles);
      return res.json(userWithPermissions);
    }
    catch(ex){
      next(ex)
    }
  }

  getUserWithAllPermissions = async (req: Request<{userId: string}, {}>, res: Response, next: NextFunction) => {
    try{
      var userId = new Types.ObjectId(req.params.userId);
      console.log({params: req.params, query: req.query, userId})
      const userWithPermissions = await this.userService.getUserWithAllPermissions(userId);
      return res.json(userWithPermissions);
    }
    catch(ex){
      next(ex)
    }
  }

  signInUser = async (req: Request<{}, {}, SignInUserRequest>, res: Response, next: NextFunction) => {
    try{
      console.log(req.body)
      let signedInUser = await this.userService.signInUser(req.body);
      return res.json(signedInUser);
    }
    catch(ex){
      next(ex);
    }
  }
}