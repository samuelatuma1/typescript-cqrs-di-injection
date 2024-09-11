"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const create_permission_response_dto_1 = __importDefault(require("../../../domain/authentication/dto/responses/create_permission_response_dto"));
const permission_repository_1 = require("../../contract/data_access/authentication/permission_repository");
const duplicate_exception_1 = __importDefault(require("../../common/exceptions/duplicate_exception"));
const user_permission_1 = __importDefault(require("../../../domain/authentication/entity/user_permission"));
const event_tracer_1 = require("../../contract/observability/event_tracer");
const role_repository_1 = require("../../contract/data_access/authentication/role_repository");
const user_role_1 = __importDefault(require("../../../domain/authentication/entity/user_role"));
const create_role_response_1 = __importDefault(require("../../../domain/authentication/dto/responses/create_role_response"));
const not_found_exception_1 = __importDefault(require("../../../application/common/exceptions/not_found_exception"));
const mongoose_1 = require("mongoose");
const user_repository_1 = require("../../../application/contract/data_access/authentication/user_repository");
const hash_utility_1 = __importDefault(require("../../../application/common/utilities/hash_utility"));
const service_config_1 = require("../../../application/common/config/service_config");
const user_1 = __importDefault(require("../../../domain/authentication/entity/user"));
const validation_exception_1 = __importDefault(require("../../../application/common/exceptions/validation_exception"));
const user_not_active_exception_1 = __importDefault(require("../../../application/common/exceptions/user_not_active_exception"));
const jwt_service_1 = require("../../../application/contract/services/authentication/jwt_service");
let UserService = class UserService {
    eventTracer;
    serviceConfig;
    permissionRepository;
    roleRepository;
    userRepository;
    jwtService;
    constructor(eventTracer, serviceConfig, permissionRepository, roleRepository, userRepository, jwtService) {
        this.eventTracer = eventTracer;
        this.serviceConfig = serviceConfig;
        this.permissionRepository = permissionRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    createPermission = async (createPermissionRequest) => {
        try {
            this.eventTracer.say("Creating permission");
            this.eventTracer.request = createPermissionRequest;
            let permissionWithName = await this.permissionRepository.firstOrDefaultAsync({ name: createPermissionRequest.name });
            if (permissionWithName) {
                throw new duplicate_exception_1.default(`Permission with name ${createPermissionRequest.name} already exists`);
            }
            this.eventTracer.say(`Not a duplicate permission`);
            const userPermission = new user_permission_1.default(createPermissionRequest.name, createPermissionRequest.desc);
            const savedPermission = await this.permissionRepository.addAsync(userPermission);
            const response = new create_permission_response_dto_1.default(savedPermission._id, savedPermission.name, savedPermission.desc);
            this.eventTracer.isSuccessWithResponseAndMessage(response, "Permission successfully created");
            return response;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    deletePermission = async (permissionName) => {
        try {
            // find permission by name 
            this.eventTracer.say(`Deleting permission with name : ${permissionName}`);
            const permission = await this.permissionRepository.firstOrDefaultAsync({ name: permissionName });
            let deleteCount = 0;
            if (permission) {
                this.eventTracer.say("Permission found");
                deleteCount = await this.permissionRepository.deleteAsync(permission);
                this.eventTracer.say(`Permissions deleted count : ${deleteCount}`);
            }
            this.eventTracer.isSuccess();
            return deleteCount;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    createRole = async (createRoleRequest) => {
        try {
            this.eventTracer.say("Creating role");
            this.eventTracer.request = createRoleRequest;
            let roleWithName = await this.roleRepository.firstOrDefaultAsync({ name: createRoleRequest.name });
            if (roleWithName) {
                throw new duplicate_exception_1.default(`Role with name ${roleWithName.name} already exists`);
            }
            const userRole = new user_role_1.default(createRoleRequest.name, createRoleRequest.desc);
            const savedRole = await this.roleRepository.addAsync(userRole);
            const response = new create_role_response_1.default(savedRole.name, savedRole._id, savedRole.desc);
            this.eventTracer.isSuccessWithResponseAndMessage(response, "Role successfully created");
            return response;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    addPermissionsToRole = async (roleName, permissions) => {
        try {
            // get all permissions with name 
            this.eventTracer.say(`adding permissions: ${permissions} to role: ${roleName}`);
            const permissionsWithName = await this.permissionRepository.contains({ name: permissions });
            this.eventTracer.say(`Permissions found: ${permissionsWithName}`);
            if (!permissionsWithName) {
                this.eventTracer.isErrorWithMessage("No permission found");
                return null;
            }
            // get role by name populated with permissions
            const role = await this.roleRepository.firstOrDefaultAsync({ name: roleName });
            if (!role) {
                throw new not_found_exception_1.default(`Role with name ${roleName} not found`);
            }
            // filter out already existing permissions in role
            const existingRolePermissions = role.permissions;
            const existingRolePermissionsSet = new Set(existingRolePermissions.map(permission => permission.toJSON()));
            for (let permission of permissionsWithName) {
                existingRolePermissionsSet.add(permission._id.toJSON());
            }
            role.permissions = [...existingRolePermissionsSet].map(permission => new mongoose_1.Types.ObjectId(permission));
            this.eventTracer.say(`Cleaned permissions ${role.permissions}`);
            await this.roleRepository.updateByIdAsync(role._id, role);
            const response = await this.roleRepository.getByIdAsync(role._id, { permissions: true });
            this.eventTracer.isSuccessWithResponseAndMessage(response);
            return response;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    removePermissionsFromRole = async (roleName, permissions) => {
        try {
            // get all permissions with name 
            this.eventTracer.say(`adding permissions: ${permissions} to role: ${roleName}`);
            const permissionsWithName = await this.permissionRepository.contains({ name: permissions });
            this.eventTracer.say(`Permissions found: ${permissionsWithName}`);
            if (!permissionsWithName.length) {
                this.eventTracer.isErrorWithMessage("No permission found");
                return null;
            }
            // get role by name populated with permissions
            const role = await this.roleRepository.firstOrDefaultAsync({ name: roleName });
            if (!role) {
                throw new not_found_exception_1.default(`Role with name ${roleName} not found`);
            }
            // filter out already existing permissions in role
            const existingRolePermissions = role.permissions;
            const existingRolePermissionsSet = new Set(existingRolePermissions.map(permission => permission.toJSON()));
            for (let permission of permissionsWithName) {
                existingRolePermissionsSet.delete(permission._id.toJSON());
            }
            role.permissions = [...existingRolePermissionsSet].map(permission => new mongoose_1.Types.ObjectId(permission));
            this.eventTracer.say(`Cleaned permissions ${role.permissions}`);
            await this.roleRepository.updateByIdAsync(role._id, role);
            const response = await this.roleRepository.getByIdAsync(role._id, { permissions: true });
            this.eventTracer.isSuccessWithResponseAndMessage(response);
            return response;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    createUser = async (createUserRequest) => {
        try {
            // verify email is unique,
            this.eventTracer.say(`Creating user with email : ${createUserRequest.email}`);
            this.eventTracer.say(`hashkey: ${this.serviceConfig.hashkey}`);
            const userExists = await this.userRepository.firstOrDefaultAsync({ email: createUserRequest.email });
            if (userExists) {
                throw new duplicate_exception_1.default(`User with email ${createUserRequest.email} already exists`);
            }
            // validate password
            // hash password
            const hashedPassword = this.hashUserPassword(createUserRequest.password);
            this.eventTracer.say(`Hashed Password: ${hashedPassword}, hashkey: ${this.serviceConfig.hashkey}`);
            const user = new user_1.default(createUserRequest.email, hashedPassword, createUserRequest.name);
            // save user with hashed password
            const response = await this.userRepository.addAsync(user);
            this.eventTracer.isSuccessWithResponseAndMessage(response);
            return response;
            //
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    hashUserPassword = (password) => {
        return hash_utility_1.default.hashStringWithSha512(password, this.serviceConfig.hashkey);
    };
    doesPasswordMatchHash = (password, hash) => {
        let hashPassword = this.hashUserPassword(password);
        return hashPassword === hash;
    };
    assignPermissionsToUser = async (userId, permissions) => {
        try {
            // get all permissions with name 
            this.eventTracer.say(`adding permissions: ${permissions} to user with id: ${userId}`);
            const permissionsWithName = await this.permissionRepository.contains({ name: permissions });
            this.eventTracer.say(`Permissions found: ${permissionsWithName}`);
            if (!permissionsWithName.length) {
                this.eventTracer.isErrorWithMessage("No permission found");
                return null;
            }
            // get role by name populated with permissions
            const user = await this.userRepository.firstOrDefaultAsync({ _id: userId });
            if (!user) {
                throw new not_found_exception_1.default(`User with id ${userId} not found`);
            }
            // filter out already existing permissions in role
            const existingUserPermissions = user.permissions;
            const existingUserPermissionsSet = new Set(existingUserPermissions.map(permission => permission.toJSON()));
            for (let permission of permissionsWithName) {
                existingUserPermissionsSet.add(permission._id.toJSON());
            }
            user.permissions = [...existingUserPermissionsSet].map(permission => new mongoose_1.Types.ObjectId(permission));
            this.eventTracer.say(`Cleaned permissions ${user.permissions}`);
            await this.userRepository.updateByIdAsync(user._id, user);
            const response = await this.userRepository.getByIdAsync(user._id, { permissions: true });
            this.eventTracer.isSuccessWithResponseAndMessage(response);
            return response;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    assignRolesToUser = async (userId, roles) => {
        try {
            // get all permissions with name 
            this.eventTracer.say(`adding permissions: ${roles} to user with id: ${userId}`);
            const rolesWithNames = await this.roleRepository.contains({ name: roles });
            this.eventTracer.say(`Roles found: ${rolesWithNames}`);
            if (!rolesWithNames.length) {
                this.eventTracer.isErrorWithMessage("No role found");
                return null;
            }
            // get role by name populated with permissions
            const user = await this.userRepository.firstOrDefaultAsync({ _id: userId });
            if (!user) {
                throw new not_found_exception_1.default(`User with id ${userId} not found`);
            }
            // filter out already existing permissions in role
            const existingUserRoles = user.roles;
            const existingUserRolesSet = new Set(existingUserRoles.map(role => role.toJSON()));
            for (let role of rolesWithNames) {
                existingUserRolesSet.add(role._id.toJSON());
            }
            user.roles = [...existingUserRolesSet].map(role => new mongoose_1.Types.ObjectId(role));
            this.eventTracer.say(`Cleaned roles ${user.roles}`);
            await this.userRepository.updateByIdAsync(user._id, user);
            const response = await this.userRepository.getByIdAsync(user._id, { roles: true });
            this.eventTracer.isSuccessWithResponseAndMessage(response);
            return response;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    getUserWithAllPermissions = async (userId) => {
        try {
            this.eventTracer.say(`Getting all user roles`);
            const user = await this.userRepository.firstOrDefaultAsync({ _id: userId }, { permissions: false, roles: true });
            if (!user) {
                throw new not_found_exception_1.default(`User with id ${userId} not found`);
            }
            const userRoles = user.roles;
            let permissionIds = new Set(user.permissions.map(permission => permission.toString()));
            this.eventTracer.say(`User Permissions ${[...permissionIds]}`);
            for (let role of userRoles) {
                const rolePermissions = role.permissions;
                let permissionsSet = new Set(rolePermissions.map(permission => permission.toJSON()));
                permissionIds = new Set([...permissionIds, ...permissionsSet]);
            }
            console.log({ permissionIds });
            let permissionsObjectIds = [...permissionIds].map(role => new mongoose_1.Types.ObjectId(role));
            this.eventTracer.say(`permission ids for user ${permissionsObjectIds}; Getting them now  :-)`);
            let allRolesPermissions = await this.permissionRepository.contains({ _id: permissionsObjectIds });
            user.permissions = allRolesPermissions;
            this.eventTracer.isSuccessWithResponseAndMessage(user);
            return user;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    getUserByEmail = async (email) => {
        return await this.userRepository.firstOrDefaultAsync({ email });
    };
    signInUser = async (signInUser) => {
        // get user with email
        try {
            this.eventTracer.request = signInUser;
            this.eventTracer.say(`Sign in user`);
            let user = await this.userRepository.firstOrDefaultAsync({ email: signInUser.email }, { roles: true, permissions: true });
            if (!user) {
                throw new not_found_exception_1.default(`User with email ${signInUser.email} does not exist`);
            }
            // if user exists
            let isValidPassword = this.doesPasswordMatchHash(signInUser.password, user.password);
            if (!isValidPassword) {
                throw new validation_exception_1.default(`Password incorrect`);
            }
            if (!user.isactive) {
                throw new user_not_active_exception_1.default(`User not active`);
            }
            let userPermissions = user.permissions ?? [];
            this.eventTracer.say(`Saved user permissions ${userPermissions.length}`);
            // if user is active, get user permissions
            let userPermissionIdsFromRoles = [];
            user.roles.forEach(role => {
                let permissionForRoles = [];
                for (let userPermissionId of role.permissions) {
                    console.log({ userPermissionId });
                    permissionForRoles.push(userPermissionId);
                }
                userPermissionIdsFromRoles = [...userPermissionIdsFromRoles, ...permissionForRoles];
            });
            let allUserRolesPermissions = await this.permissionRepository.contains({ _id: userPermissionIdsFromRoles });
            this.eventTracer.say(`Getting user permissions from roles`);
            userPermissions = [...userPermissions, ...allUserRolesPermissions];
            let permissionNames = userPermissions.map(permission => permission.name);
            this.eventTracer.say(`All user permissions count: ${userPermissions.length}.\nAll user roles count: ${user.roles.length}.`);
            let roleNames = user.roles.map(role => role.name);
            this.eventTracer.say(`Getting access and refresh tokens`);
            let accessTokenPayload = {
                email: user.email,
                roles: roleNames,
                permissions: permissionNames,
                isAdmin: user.isadmin
            };
            let refreshTokenPayload = {
                email: user.email
            };
            let accessTokenExpiryInSeconds = 60 * 60;
            let accessToken = this.jwtService.encode(accessTokenPayload, accessTokenExpiryInSeconds, this.serviceConfig.jwtsecret);
            let refreshTokenExpiryInSeconds = 60 * 60 * 24;
            let refreshToken = this.jwtService.encode(refreshTokenPayload, refreshTokenExpiryInSeconds, this.serviceConfig.jwtsecret);
            let response = {
                email: user.email,
                roles: roleNames,
                permissions: permissionNames,
                isAdmin: user.isadmin,
                accessTokenExpiryInSeconds,
                accessToken,
                refreshToken,
                refreshTokenExpiryInSeconds,
            };
            this.eventTracer.isSuccessWithResponseAndMessage(response, "user successfully signed in");
            return response;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    decodeAccessToken = (token) => {
        try {
            return this.jwtService.decode(token, this.serviceConfig.jwtsecret);
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            return null;
        }
    };
    getUsersWithRolesOrPermissions = async (rolesOrPermissions) => {
        let userRoles = [];
        let permissions = [];
        if (rolesOrPermissions.roles?.length) {
            userRoles = await this.roleRepository.contains({ name: rolesOrPermissions.roles });
        }
        if (rolesOrPermissions.permissions?.length) {
            permissions = await this.permissionRepository.contains({ name: rolesOrPermissions.permissions });
        }
        let users = await this.userRepository.or([{ roles: userRoles.map(role => role._id) }, { permissions: permissions.map(permission => permission._id) }]);
        return users;
    };
};
UserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __param(1, (0, tsyringe_1.inject)(service_config_1.IIServiceConfig)),
    __param(2, (0, tsyringe_1.inject)(permission_repository_1.IIUserPermissionRepository)),
    __param(3, (0, tsyringe_1.inject)(role_repository_1.IIRoleRepository)),
    __param(4, (0, tsyringe_1.inject)(user_repository_1.IIUserRepository)),
    __param(5, (0, tsyringe_1.inject)(jwt_service_1.IIJwtService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], UserService);
exports.default = UserService;
//# sourceMappingURL=user_service.js.map