import { Types } from "mongoose";
import Address from "../../../../domain/authentication/entity/address";
import IBaseRepository from "../common/base_repository";

export default interface IAddressRepository extends IBaseRepository<Address, Types.ObjectId> {
    
}

export const IIAddressRepository = "IAddressRepository"