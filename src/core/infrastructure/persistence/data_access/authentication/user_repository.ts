import User from "core/domain/authentication/entity/user";
import { injectable } from "tsyringe";
import { BaseRepository } from "../common/base_repository";
import { Types } from "mongoose";

import { userModel } from "../../entity_configuration/authentication/user_config";
import IUserRepository from "../../../../../core/application/contract/data_access/authentication/user_repository";

@injectable()
export default class UserRepository extends BaseRepository<User, Types.ObjectId> implements IUserRepository{
    public constructor(){
        super(userModel)
    }
}