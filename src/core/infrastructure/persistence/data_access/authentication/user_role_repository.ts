import IRoleRepository from "core/application/contract/data_access/authentication/role_repository";
import { BaseRepository } from "../common/base_repository";
import UserRole from "core/domain/authentication/entity/user_role";
import { Types } from "mongoose";
import { userRoleModel } from "../../entity_configuration/authentication/user_role_config";
import { injectable } from "tsyringe";
import { RecordStatus } from "core/domain/common/enum/record_status";

@injectable()
export default class UserRoleRepository extends BaseRepository<UserRole, Types.ObjectId> implements IRoleRepository{
    public constructor(){
        super(userRoleModel)
    }
}