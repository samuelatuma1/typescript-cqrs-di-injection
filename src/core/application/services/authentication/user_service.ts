import { inject, injectable } from "tsyringe";
import CreatePermissionRequestDTO from "../../../domain/common/dto/requests/create_permission_request_dto";
import CreatePermissionResponseDTO from "../../../domain/common/dto/responses/create_permission_response_dto";
import IUserService from "../../contract/services/authentication/user_service";
import IUserPermissionRepository, { IIUserPermissionRepository } from "../../contract/data_access/authentication/permission_repository";
import DuplicateException from "../../common/exceptions/duplicate_exception";
import UserPermission from "../../../domain/authentication/user_permission";
import MapperUtility from "../../common/utilities/mapper_utility";
import IEventTracer, { IIEventTracer } from "../../contract/observability/event_tracer";

@injectable()
export default class UserService implements IUserService {
    
    public constructor( @inject(IIUserPermissionRepository) private readonly permissionRepository: IUserPermissionRepository, @inject(IIEventTracer) private readonly eventTracer: IEventTracer){

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
            this.eventTracer.response = response;

            this.eventTracer.isSuccessWithMessage("Permission successfully created");
            return response;
        }
        catch (ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }


}