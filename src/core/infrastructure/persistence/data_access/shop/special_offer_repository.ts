import { injectable } from "tsyringe";
import { BaseRepository } from "../common/base_repository";
import SpecialOffer from "core/domain/shop/entity/special_offer";
import { Types } from "mongoose";
import ISpecialOfferRepository from "../../../../application/contract/data_access/shop/special_offer_repository";
import { scpecialOfferModel } from "../../entity_configuration/shop/special_offer";

@injectable()
export default class SpecialOfferRepository extends  BaseRepository<SpecialOffer, Types.ObjectId> implements ISpecialOfferRepository{
    public constructor(){
        const _model = scpecialOfferModel;
        super(_model);
    }
}