
import { injectable } from "tsyringe";
import { BaseRepository } from "../common/base_repository";
import Address from "../../../../domain/authentication/entity/address";
import { Types } from "mongoose";
import { addressModel } from "../../entity_configuration/authentication/address";
import IAddressRepository from "../../../../application/contract/data_access/authentication/address_repository";

@injectable()
export default class AddressRepository extends BaseRepository<Address, Types.ObjectId> implements IAddressRepository{
    public constructor(){
        super(addressModel);
    }
}