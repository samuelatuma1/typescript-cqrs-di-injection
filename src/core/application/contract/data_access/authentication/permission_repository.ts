import { Types } from "mongoose";
import UserPermission from "../../../../domain/authentication/entity/user_permission";
import IBaseRepository from "../common/base_repository";

export default interface IUserPermissionRepository extends IBaseRepository<UserPermission, Types.ObjectId> {
    
}

export const IIUserPermissionRepository = "IUserPermissionRepository"