import { Types } from "mongoose";
import IUserPermissionRepository from "../../../../application/contract/data_access/authentication/permission_repository";
import UserPermission from "../../../../domain/authentication/entity/user_permission";
import { BaseRepository } from "../common/base_repository";
import { userPermissionModel } from "../../entity_configuration/authentication/user_permission_config";
import { injectable } from "tsyringe";

@injectable()
export default class UserPermissionRepository extends BaseRepository<UserPermission, Types.ObjectId> implements IUserPermissionRepository{
    public constructor(){
        super(userPermissionModel);
    }
}