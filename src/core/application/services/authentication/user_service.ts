import { inject, injectable } from "tsyringe";
import CreatePermissionRequestDTO from "../../../domain/authentication/dto/requests/create_permission_request_dto";
import CreatePermissionResponseDTO from "../../../domain/authentication/dto/responses/create_permission_response_dto";
import IUserService from "../../contract/services/authentication/user_service";
import IUserPermissionRepository, { IIUserPermissionRepository } from "../../contract/data_access/authentication/permission_repository";
import DuplicateException from "../../common/exceptions/duplicate_exception";
import UserPermission from "../../../domain/authentication/entity/user_permission";
import IEventTracer, { IIEventTracer } from "../../contract/observability/event_tracer";
import CreateRoleRequest from "../../../domain/authentication/dto/requests/create_role_request";
import IRoleRepository, { IIRoleRepository } from "../../contract/data_access/authentication/role_repository";
import UserRole from "../../../domain/authentication/entity/user_role";
import CreateRoleResponse from "../../../domain/authentication/dto/responses/create_role_response";
import NotFoundException from "../../../application/common/exceptions/not_found_exception";
import { Types } from "mongoose";
import IUserRepository, { IIUserRepository } from "../../../application/contract/data_access/authentication/user_repository";
import CreateUserRequest from "../../../domain/authentication/dto/requests/create_user_request";
import HashUtility from "../../../application/common/utilities/hash_utility";
import IServiceConfig, { IIServiceConfig } from "../../../application/common/config/service_config";
import User from "../../../domain/authentication/entity/user";

@injectable()
export default class UserService implements IUserService {
    
    public constructor( 
        @inject(IIEventTracer) private readonly eventTracer: IEventTracer,
        @inject(IIServiceConfig) private readonly serviceConfig: IServiceConfig,
        @inject(IIUserPermissionRepository) private readonly permissionRepository: IUserPermissionRepository,
        @inject(IIRoleRepository) private readonly roleRepository: IRoleRepository,
        @inject(IIUserRepository) private readonly userRepository: IUserRepository,
    ){

    }
    createPermission = async (createPermissionRequest: CreatePermissionRequestDTO): Promise<CreatePermissionResponseDTO> => {
        try{
            this.eventTracer.say("Creating permission");
            this.eventTracer.request = createPermissionRequest;
            let permissionWithName = await this.permissionRepository.firstOrDefaultAsync({name: createPermissionRequest.name});
            
            if(permissionWithName){
                throw new DuplicateException(`Permission with name ${createPermissionRequest.name} already exists`);
            }
            this.eventTracer.say(`Not a duplicate permission`);
            const userPermission = new UserPermission(createPermissionRequest.name, createPermissionRequest.desc);
            const savedPermission = await this.permissionRepository.addAsync(userPermission);
            const response =  new CreatePermissionResponseDTO(savedPermission._id, savedPermission.name, savedPermission.desc);

            this.eventTracer.isSuccessWithResponseAndMessage(response, "Permission successfully created");
            return response;
        }
        catch (ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }

    deletePermission = async (permissionName: string): Promise<number> => {
       try{
            // find permission by name 
            this.eventTracer.say(`Deleting permission with name : ${permissionName}`);
            const permission = await this.permissionRepository.firstOrDefaultAsync({name : permissionName})
            let deleteCount = 0;
            if (permission){
                this.eventTracer.say("Permission found");
                deleteCount = await this.permissionRepository.deleteAsync(permission);
                this.eventTracer.say(`Permissions deleted count : ${deleteCount}`);
            }
            this.eventTracer.isSuccess();
            return deleteCount;
        }
        catch (ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }

    createRole = async (createRoleRequest: CreateRoleRequest): Promise<CreateRoleResponse> => {
        try{
            this.eventTracer.say("Creating role");
            this.eventTracer.request = createRoleRequest;

            let roleWithName = await this.roleRepository.firstOrDefaultAsync({name: createRoleRequest.name})
            if(roleWithName){
                throw new DuplicateException(`Role with name ${roleWithName.name} already exists`);
            }

            const userRole = new UserRole(createRoleRequest.name, createRoleRequest.desc);
            const savedRole = await this.roleRepository.addAsync(userRole);

            const response = new CreateRoleResponse(savedRole.name, savedRole._id, savedRole.desc);

            this.eventTracer.isSuccessWithResponseAndMessage(response, "Role successfully created");

            return response;
        }
        catch (ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }
    
    addPermissionsToRole = async (roleName: string, permissions: string[]): Promise<UserRole | null> => {
        try{
            // get all permissions with name 
            this.eventTracer.say(`adding permissions: ${permissions} to role: ${roleName}`)

            const permissionsWithName = await this.permissionRepository.contains({name: permissions})
            this.eventTracer.say(`Permissions found: ${permissionsWithName}`)
            if (!permissionsWithName){
                this.eventTracer.isErrorWithMessage("No permission found");
                return null;
            }

            // get role by name populated with permissions
            const role = await this.roleRepository.firstOrDefaultAsync({name: roleName});
            if(!role){
                throw new NotFoundException(`Role with name ${roleName} not found`)
            }
            // filter out already existing permissions in role
            const existingRolePermissions = role.permissions as unknown as Types.ObjectId[]
            const existingRolePermissionsSet = new Set(existingRolePermissions.map(permission => permission.toJSON()));
            for(let permission of permissionsWithName){
                existingRolePermissionsSet.add(permission._id.toJSON());
            }
            role.permissions = [...existingRolePermissionsSet].map(permission => new Types.ObjectId(permission))

            this.eventTracer.say(`Cleaned permissions ${role.permissions}`)
            await this.roleRepository.updateByIdAsync(role._id, role);
            const response =  await this.roleRepository.getByIdAsync(role._id, {permissions: true});

            this.eventTracer.isSuccessWithResponseAndMessage(response)
            return response;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }

    removePermissionsFromRole = async (roleName: string, permissions: string[]): Promise<UserRole | null> => {
        try{
            // get all permissions with name 
            this.eventTracer.say(`adding permissions: ${permissions} to role: ${roleName}`)

            const permissionsWithName = await this.permissionRepository.contains({name: permissions})
            this.eventTracer.say(`Permissions found: ${permissionsWithName}`)
            if (!permissionsWithName.length){
                this.eventTracer.isErrorWithMessage("No permission found");
                return null;
            }

            // get role by name populated with permissions
            const role = await this.roleRepository.firstOrDefaultAsync({name: roleName});
            if(!role){
                throw new NotFoundException(`Role with name ${roleName} not found`)
            }
            // filter out already existing permissions in role
            const existingRolePermissions = role.permissions as unknown as Types.ObjectId[]
            const existingRolePermissionsSet = new Set(existingRolePermissions.map(permission => permission.toJSON()));
            for(let permission of permissionsWithName){
                existingRolePermissionsSet.delete(permission._id.toJSON());
            }
            role.permissions = [...existingRolePermissionsSet].map(permission => new Types.ObjectId(permission))

            this.eventTracer.say(`Cleaned permissions ${role.permissions}`)
            await this.roleRepository.updateByIdAsync(role._id, role);
            const response =  await this.roleRepository.getByIdAsync(role._id, {permissions: true});

            this.eventTracer.isSuccessWithResponseAndMessage(response)
            return response;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }

    createUser = async (createUserRequest: CreateUserRequest): Promise<User> => {
        try{
            // verify email is unique,

            this.eventTracer.say(`Creating user with email : ${createUserRequest.email}`)
            this.eventTracer.say(`hashkey: ${this.serviceConfig.hashkey}`)
            const userExists = await this.userRepository.firstOrDefaultAsync({email: createUserRequest.email});
            if(userExists){
                throw new DuplicateException(`User with email ${createUserRequest.email} already exists`);
            }

            // validate password
            // hash password
            const hashedPassword = HashUtility.hashStringWithSha512(createUserRequest.password, this.serviceConfig.hashkey);
            this.eventTracer.say(`Hashed Password: ${hashedPassword}, hashkey: ${this.serviceConfig.hashkey}`)
            const user = new User(createUserRequest.email, hashedPassword, createUserRequest.name);

            // save user with hashed password
            const response =  await this.userRepository.addAsync(user);

            this.eventTracer.isSuccessWithResponseAndMessage(response);
            return response
            //
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }

    assignPermissionsToUser = async (userId: Types.ObjectId, permissions: string[]): Promise<User | null>=> {
        try{
            // get all permissions with name 
            this.eventTracer.say(`adding permissions: ${permissions} to user with id: ${userId}`)

            const permissionsWithName = await this.permissionRepository.contains({name: permissions})
            this.eventTracer.say(`Permissions found: ${permissionsWithName}`)
            if (!permissionsWithName.length){
                this.eventTracer.isErrorWithMessage("No permission found");
                return null;
            }

            // get role by name populated with permissions
            const user = await this.userRepository.firstOrDefaultAsync({_id: userId});
            if(!user){
                throw new NotFoundException(`User with id ${userId} not found`)
            }
            // filter out already existing permissions in role
            const existingUserPermissions = user.permissions as unknown as Types.ObjectId[]
            const existingUserPermissionsSet = new Set(existingUserPermissions.map(permission => permission.toJSON()));
            for(let permission of permissionsWithName){
                existingUserPermissionsSet.add(permission._id.toJSON());
            }
            user.permissions = [...existingUserPermissionsSet].map(permission => new Types.ObjectId(permission))

            this.eventTracer.say(`Cleaned permissions ${user.permissions}`);
            await this.userRepository.updateByIdAsync(user._id, user);
            const response =  await this.userRepository.getByIdAsync(user._id, {permissions: true});

            this.eventTracer.isSuccessWithResponseAndMessage(response);
            return response;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }

    assignRolesToUser = async (userId: Types.ObjectId, roles: string[]): Promise<User | null>=> {
        try{
            // get all permissions with name 
            this.eventTracer.say(`adding permissions: ${roles} to user with id: ${userId}`)

            const rolesWithNames = await this.roleRepository.contains({name: roles})
            this.eventTracer.say(`Roles found: ${rolesWithNames}`)
            if (!rolesWithNames.length){
                this.eventTracer.isErrorWithMessage("No role found");
                return null;
            }

            // get role by name populated with permissions
            const user = await this.userRepository.firstOrDefaultAsync({_id: userId});
            if(!user){
                throw new NotFoundException(`User with id ${userId} not found`)
            }
            // filter out already existing permissions in role
            const existingUserRoles = user.roles as unknown as Types.ObjectId[]
            const existingUserRolesSet = new Set(existingUserRoles.map(role => role.toJSON()));
            for(let role of rolesWithNames){
                existingUserRolesSet.add(role._id.toJSON());
            }
            user.roles = [...existingUserRolesSet].map(role => new Types.ObjectId(role))

            this.eventTracer.say(`Cleaned roles ${user.roles}`);
            await this.userRepository.updateByIdAsync(user._id, user);
            const response =  await this.userRepository.getByIdAsync(user._id, {roles: true});

            this.eventTracer.isSuccessWithResponseAndMessage(response);
            return response;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }

    getUserWithAllPermissions = async (userId: Types.ObjectId): Promise<User | null> => {
        try{
            this.eventTracer.say(`Getting all user roles`);
            const user = await this.userRepository.firstOrDefaultAsync({_id: userId}, {permissions: false, roles: true});
            if(!user){
                throw new NotFoundException(`User with id ${userId} not found`)
            }
            const userRoles: UserRole[] = user.roles as unknown as UserRole[]
            let permissionIds: Set<string> = new Set<string>(user.permissions.map(permission => permission.toString()));
            this.eventTracer.say(`User Permissions ${[...permissionIds]}`);

            for (let role of userRoles){
                const rolePermissions = role.permissions as unknown as Types.ObjectId[]
                let permissionsSet = new Set(rolePermissions.map(permission => permission.toJSON()))
                permissionIds = new Set([...permissionIds, ...permissionsSet]);
            }
            console.log({permissionIds});
            let permissionsObjectIds = [...permissionIds].map(role => new Types.ObjectId(role))
            this.eventTracer.say(`permission ids for user ${permissionsObjectIds}; Getting them now  :-)`);

            let allRolesPermissions = await this.permissionRepository.contains({_id: permissionsObjectIds})
            user.permissions = allRolesPermissions;
            this.eventTracer.isSuccessWithResponseAndMessage(user);
            return user;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }

    getUserByEmail = async (email: string): Promise<User | null> => {
        return await this.userRepository.firstOrDefaultAsync({email});
    }
}

