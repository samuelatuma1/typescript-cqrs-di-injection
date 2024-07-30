import { injectable } from "tsyringe";
import { BaseRepository } from "../common/base_repository";
import { Country } from "../../../../domain/authentication/entity/address";
import { Types } from "mongoose";
import ICountryRepository from "../../../../application/contract/data_access/authentication/country_repository";
import { countryModel } from "../../entity_configuration/authentication/address";

@injectable()
export default class CountryRepository extends BaseRepository<Country, Types.ObjectId> implements ICountryRepository{
    public constructor(){
        super(countryModel);
    }
}