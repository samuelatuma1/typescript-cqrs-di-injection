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
const create_permission_response_dto_1 = __importDefault(require("../../../domain/common/dto/responses/create_permission_response_dto"));
const permission_repository_1 = require("../../contract/data_access/authentication/permission_repository");
const duplicate_exception_1 = __importDefault(require("../../common/exceptions/duplicate_exception"));
const user_permission_1 = __importDefault(require("../../../domain/authentication/user_permission"));
const event_tracer_1 = require("../../contract/observability/event_tracer");
let UserService = class UserService {
    permissionRepository;
    eventTracer;
    constructor(permissionRepository, eventTracer) {
        this.permissionRepository = permissionRepository;
        this.eventTracer = eventTracer;
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
            this.eventTracer.response = response;
            this.eventTracer.isSuccessWithMessage("Permission successfully created");
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
    __param(0, (0, tsyringe_1.inject)(permission_repository_1.IIUserPermissionRepository)),
    __param(1, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __metadata("design:paramtypes", [Object, Object])
], UserService);
exports.default = UserService;
//# sourceMappingURL=user_service.js.map