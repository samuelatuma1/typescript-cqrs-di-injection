import {  Types } from "mongoose";
import IBaseRepository from "../common/base_repository";
import UserRole from "../../../../domain/authentication/entity/user_role";


export default interface IRoleRepository extends IBaseRepository<UserRole, Types.ObjectId> {

}

export const IIRoleRepository = "IRoleRepository";