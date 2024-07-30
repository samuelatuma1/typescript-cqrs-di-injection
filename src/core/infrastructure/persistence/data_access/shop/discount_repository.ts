import { Types } from "mongoose";
import Discount from "../../../../domain/shop/entity/discount";
import { BaseRepository } from "../common/base_repository";
import IDiscountRepository from "../../../../application/contract/data_access/shop/discount_repository";
import { injectable } from "tsyringe";
import { Discountmodel } from "../../entity_configuration/shop/discount_config";

@injectable()
export default class DiscountRepository extends BaseRepository<Discount, Types.ObjectId> implements IDiscountRepository{
    public constructor(){
        const _model = Discountmodel;
        super(_model);
    }
}