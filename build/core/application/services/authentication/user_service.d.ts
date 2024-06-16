import CreatePermissionRequestDTO from "../../../domain/common/dto/requests/create_permission_request_dto";
import CreatePermissionResponseDTO from "../../../domain/common/dto/responses/create_permission_response_dto";
import IUserService from "../../contract/services/authentication/user_service";
import IUserPermissionRepository from "../../contract/data_access/authentication/permission_repository";
import IEventTracer from "../../contract/observability/event_tracer";
export default class UserService implements IUserService {
    private readonly permissionRepository;
    private readonly eventTracer;
    constructor(permissionRepository: IUserPermissionRepository, eventTracer: IEventTracer);
    createPermission: (createPermissionRequest: CreatePermissionRequestDTO) => Promise<CreatePermissionResponseDTO>;
}
