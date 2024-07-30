import { injectable } from "tsyringe";
import { BaseRepository } from "../common/base_repository";
import { City, Country } from "../../../../domain/authentication/entity/address";
import { Types } from "mongoose";
import { cityModel } from "../../entity_configuration/authentication/address";
import ICityRepository from "../../../../application/contract/data_access/authentication/city_repository";

@injectable()
export default class CityRepository extends BaseRepository<City, Types.ObjectId> implements ICityRepository{
    public constructor(){
        super(cityModel);
    }
}