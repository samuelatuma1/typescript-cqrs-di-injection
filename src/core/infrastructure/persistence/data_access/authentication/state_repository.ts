import { injectable } from "tsyringe";
import { BaseRepository } from "../common/base_repository";
import { State } from "../../../../domain/authentication/entity/address";
import { Types } from "mongoose";
import { stateModel } from "../../entity_configuration/authentication/address";
import IStateRepository from "../../../../application/contract/data_access/authentication/state_repository";

@injectable()
export default class StateRepository extends BaseRepository<State, Types.ObjectId> implements IStateRepository{
    public constructor(){
        super(stateModel);
    }
}