import { Types } from "mongoose";
import { Country } from "../../../../domain/authentication/entity/address";
import IBaseRepository from "../common/base_repository";

export default interface ICountryRepository extends IBaseRepository<Country, Types.ObjectId> {
    
}

export const IICountryRepository = "ICountryRepository"