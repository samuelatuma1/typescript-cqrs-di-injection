import { Types } from "mongoose";
import {  State } from "../../../../domain/authentication/entity/address";
import IBaseRepository from "../common/base_repository";

export default interface IStateRepository extends IBaseRepository<State, Types.ObjectId> {
    
}

export const IIStateRepository = "IStateRepository"