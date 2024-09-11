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
import CreateRoleRequest from "../../../../domain/authentication/dto/requests/create_role_request";
import CreatePermissionRequestDTO from "../../../../domain/authentication/dto/requests/create_permission_request_dto";
import CreatePermissionResponseDTO from "../../../../domain/authentication/dto/responses/create_permission_response_dto";
import CreateRoleResponse from "../../../../domain/authentication/dto/responses/create_role_response";
import UserRole from "../../../../../core/domain/authentication/entity/user_role";
import CreateUserRequest, { SignInUserRequest } from "../../../../../core/domain/authentication/dto/requests/create_user_request";
import User from "../../../../../core/domain/authentication/entity/user";
import { Types } from "mongoose";
import { SignInUserResponse } from "../../../../domain/authentication/dto/responses/user_response";
import { AccessTokenPayload } from "../../../../domain/model/authentication/jwt_model";
export default interface IUserService {
    createPermission(createPermissionRequest: CreatePermissionRequestDTO): Promise<CreatePermissionResponseDTO>;
    deletePermission(permissionName: string): Promise<number>;
    createRole(createRoleRequest: CreateRoleRequest): Promise<CreateRoleResponse>;
    addPermissionsToRole(roleName: string, permissions: string[]): Promise<UserRole | null>;
    removePermissionsFromRole(roleName: string, permissions: string[]): Promise<UserRole | null>;
    createUser(createUserRequest: CreateUserRequest): Promise<User>;
    assignPermissionsToUser(userId: Types.ObjectId, permissions: string[]): Promise<User | null>;
    assignRolesToUser(userId: Types.ObjectId, roles: string[]): Promise<User | null>;
    getUserWithAllPermissions(userId: Types.ObjectId): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    signInUser(signInUser: SignInUserRequest): Promise<SignInUserResponse>;
    decodeAccessToken(token: string): AccessTokenPayload | null;
    getUsersWithRolesOrPermissions(rolesOrPermissions: {
        roles?: string[];
        permissions?: string[];
    }): Promise<User[]>;
}
export declare const IIUserService = "IUserService";
