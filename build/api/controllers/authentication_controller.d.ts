import { NextFunction, Request, Response } from "express";
import IUserService from "../../core/application/contract/services/authentication/user_service";
import CreatePermissionRequestDTO from "../../core/domain/authentication/dto/requests/create_permission_request_dto";
import CreateRoleRequest from "../../core/domain/authentication/dto/requests/create_role_request";
import AddPermissionRequest from "../../core/domain/authentication/dto/requests/add_permission_request";
import RemovePermissionFromRoleRequest from "../../core/domain/authentication/dto/requests/remove_permission_from_role_request";
import CreateUserRequest, { SignInUserRequest } from "../../core/domain/authentication/dto/requests/create_user_request";
import AddPermissionToUserRequest from "../../core/domain/authentication/dto/requests/add_permission_to_user_request";
import AddRolesToUserRequest from "../../core/domain/authentication/dto/requests/add_role_to_user_request";
import BaseController from "./base_controller";
export default class AuthenticationController extends BaseController {
    private userService;
    constructor(userService: IUserService);
    createPermission: (req: Request<{}, {}, CreatePermissionRequestDTO>, res: Response, next: NextFunction) => Promise<void>;
    createRole: (req: Request<{}, {}, CreateRoleRequest>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    addPermissions: (req: Request<{}, {}, AddPermissionRequest>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    removePermissionsFromRole: (req: Request<{}, {}, RemovePermissionFromRoleRequest>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    createUser: (req: Request<{}, {}, CreateUserRequest>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    addPermissionsToUser: (req: Request<{}, {}, AddPermissionToUserRequest>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    addRolesToUser: (req: Request<{}, {}, AddRolesToUserRequest>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getUserWithAllPermissions: (req: Request<{
        userId: string;
    }, {}>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    signInUser: (req: Request<{}, {}, SignInUserRequest>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
}
