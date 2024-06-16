import { ObjectId } from "mongoose";
import IBaseRepository from "../common/base_repository";
import UserRole from "../../../../domain/authentication/user_role";

export default interface IRoleRepository extends IBaseRepository<UserRole, ObjectId> {

}