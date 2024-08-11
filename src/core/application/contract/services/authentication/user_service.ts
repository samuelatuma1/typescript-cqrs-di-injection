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

    createRole (createRoleRequest: CreateRoleRequest): Promise<CreateRoleResponse>;

    addPermissionsToRole(roleName: string, permissions: string[]): Promise<UserRole | null>;

    removePermissionsFromRole(roleName: string, permissions: string[]): Promise<UserRole | null>;

    createUser(createUserRequest: CreateUserRequest): Promise<User>;

    assignPermissionsToUser(userId: Types.ObjectId, permissions: string[]): Promise<User | null>;

    assignRolesToUser(userId: Types.ObjectId, roles: string[]): Promise<User | null>

    getUserWithAllPermissions(userId: Types.ObjectId): Promise<User | null>

    getUserByEmail(email: string): Promise<User | null>;

    signInUser(signInUser: SignInUserRequest) : Promise<SignInUserResponse>
    decodeAccessToken(token: string): AccessTokenPayload | null
}

export const IIUserService = "IUserService";