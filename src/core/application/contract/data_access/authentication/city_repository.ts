import { Types } from "mongoose";
import { City, Country } from "../../../../domain/authentication/entity/address";
import IBaseRepository from "../common/base_repository";

export default interface ICityRepository extends IBaseRepository<City, Types.ObjectId> {
    
}

export const IICityRepository = "ICityRepository"