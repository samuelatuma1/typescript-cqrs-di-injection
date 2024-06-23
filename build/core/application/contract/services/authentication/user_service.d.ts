import CreatePermissionRequestDTO from "../../../../domain/authentication/dto/requests/create_permission_request_dto";
import CreatePermissionResponseDTO from "../../../../domain/authentication/dto/responses/create_permission_response_dto";
export default interface IUserService {
    createPermission(createPermissionRequest: CreatePermissionRequestDTO): Promise<CreatePermissionResponseDTO>;
    deletePermission(permissionName: string): Promise<number>;
}
export declare const IIUserService = "IUserService";
