import IBillboardRepository from "../../../../application/contract/data_access/shop/billboard_repository";
import { BaseRepository } from "../common/base_repository";
import Billboard from "../../../../domain/shop/entity/bill_board";
import { Types } from "mongoose";
import { billboardModel } from "../../entity_configuration/shop/billboard_config";
import { injectable } from "tsyringe";


@injectable()
export default class BillboardRepository extends BaseRepository<Billboard, Types.ObjectId> implements IBillboardRepository {
    public constructor(){
        super(billboardModel)
    }

}