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
const role_repository_1 = require("core/application/contract/data_access/authentication/role_repository");
const user_role_1 = __importDefault(require("core/domain/authentication/entity/user_role"));
const create_role_response_1 = __importDefault(require("core/domain/authentication/dto/responses/create_role_response"));
let UserService = class UserService {
    eventTracer;
    permissionRepository;
    roleRepository;
    constructor(eventTracer, permissionRepository, roleRepository) {
        this.eventTracer = eventTracer;
        this.permissionRepository = permissionRepository;
        this.roleRepository = roleRepository;
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
};
UserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __param(1, (0, tsyringe_1.inject)(permission_repository_1.IIUserPermissionRepository)),
    __param(2, (0, tsyringe_1.inject)(role_repository_1.IIRoleRepository)),
    __metadata("design:paramtypes", [Object, Object, Object])
], UserService);
exports.default = UserService;
//# sourceMappingURL=user_service.js.map