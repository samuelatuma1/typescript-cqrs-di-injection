import { Types } from "mongoose";
import IBaseRepository from "../common/base_repository";
import SpecialOffer from "../../../../domain/shop/entity/special_offer";

export default interface ISpecialOfferRepository extends IBaseRepository<SpecialOffer, Types.ObjectId>  {

}

export const IISpecialOfferRepository = "ISpecialOfferRepository";