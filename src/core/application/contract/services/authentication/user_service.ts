import CreatePermissionRequestDTO from "../../../../domain/common/dto/requests/create_permission_request_dto";
import CreatePermissionResponseDTO from "../../../../domain/common/dto/responses/create_permission_response_dto";

export default interface IUserService {
    createPermission(createPermissionRequest: CreatePermissionRequestDTO): Promise<CreatePermissionResponseDTO>;
}

export const IIUserService = "IUserService";