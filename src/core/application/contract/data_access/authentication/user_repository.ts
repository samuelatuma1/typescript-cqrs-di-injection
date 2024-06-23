import {  Types } from "mongoose";
import IBaseRepository from "../common/base_repository";
import UserRole from "../../../../domain/authentication/entity/user_role";
import User from "../../../../domain/authentication/entity/user";


export default interface IUserRepository extends IBaseRepository<User, Types.ObjectId> {

}

export const IIUserRepository = "IUserRepository";