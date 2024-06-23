import CreatePermissionRequestDTO from "../../../domain/authentication/dto/requests/create_permission_request_dto";
import CreatePermissionResponseDTO from "../../../domain/authentication/dto/responses/create_permission_response_dto";
import IUserService from "../../contract/services/authentication/user_service";
import IUserPermissionRepository from "../../contract/data_access/authentication/permission_repository";
import IEventTracer from "../../contract/observability/event_tracer";
import CreateRoleRequest from "core/domain/authentication/dto/requests/create_role_request";
import IRoleRepository from "core/application/contract/data_access/authentication/role_repository";
import CreateRoleResponse from "core/domain/authentication/dto/responses/create_role_response";
export default class UserService implements IUserService {
    private readonly eventTracer;
    private readonly permissionRepository;
    private readonly roleRepository;
    constructor(eventTracer: IEventTracer, permissionRepository: IUserPermissionRepository, roleRepository: IRoleRepository);
    createPermission: (createPermissionRequest: CreatePermissionRequestDTO) => Promise<CreatePermissionResponseDTO>;
    deletePermission: (permissionName: string) => Promise<number>;
    createRole: (createRoleRequest: CreateRoleRequest) => Promise<CreateRoleResponse>;
}
