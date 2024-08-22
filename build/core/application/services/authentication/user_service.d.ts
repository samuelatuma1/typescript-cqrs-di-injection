/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import CreatePermissionRequestDTO from "../../../domain/authentication/dto/requests/create_permission_request_dto";
import CreatePermissionResponseDTO from "../../../domain/authentication/dto/responses/create_permission_response_dto";
import IUserService from "../../contract/services/authentication/user_service";
import IUserPermissionRepository from "../../contract/data_access/authentication/permission_repository";
import IEventTracer from "../../contract/observability/event_tracer";
import CreateRoleRequest from "../../../domain/authentication/dto/requests/create_role_request";
import IRoleRepository from "../../contract/data_access/authentication/role_repository";
import UserRole from "../../../domain/authentication/entity/user_role";
import CreateRoleResponse from "../../../domain/authentication/dto/responses/create_role_response";
import { Types } from "mongoose";
import IUserRepository from "../../../application/contract/data_access/authentication/user_repository";
import CreateUserRequest, { SignInUserRequest } from "../../../domain/authentication/dto/requests/create_user_request";
import IServiceConfig from "../../../application/common/config/service_config";
import User from "../../../domain/authentication/entity/user";
import IJwtService from "../../../application/contract/services/authentication/jwt_service";
import { SignInUserResponse } from "../../../domain/authentication/dto/responses/user_response";
import { AccessTokenPayload } from "../../../domain/model/authentication/jwt_model";
export default class UserService implements IUserService {
    private readonly eventTracer;
    private readonly serviceConfig;
    private readonly permissionRepository;
    private readonly roleRepository;
    private readonly userRepository;
    private readonly jwtService;
    constructor(eventTracer: IEventTracer, serviceConfig: IServiceConfig, permissionRepository: IUserPermissionRepository, roleRepository: IRoleRepository, userRepository: IUserRepository, jwtService: IJwtService);
    createPermission: (createPermissionRequest: CreatePermissionRequestDTO) => Promise<CreatePermissionResponseDTO>;
    deletePermission: (permissionName: string) => Promise<number>;
    createRole: (createRoleRequest: CreateRoleRequest) => Promise<CreateRoleResponse>;
    addPermissionsToRole: (roleName: string, permissions: string[]) => Promise<UserRole | null>;
    removePermissionsFromRole: (roleName: string, permissions: string[]) => Promise<UserRole | null>;
    createUser: (createUserRequest: CreateUserRequest) => Promise<User>;
    private hashUserPassword;
    private doesPasswordMatchHash;
    assignPermissionsToUser: (userId: Types.ObjectId, permissions: string[]) => Promise<User | null>;
    assignRolesToUser: (userId: Types.ObjectId, roles: string[]) => Promise<User | null>;
    getUserWithAllPermissions: (userId: Types.ObjectId) => Promise<User | null>;
    getUserByEmail: (email: string) => Promise<User | null>;
    signInUser: (signInUser: SignInUserRequest) => Promise<SignInUserResponse>;
    decodeAccessToken: (token: string) => AccessTokenPayload | null;
}
