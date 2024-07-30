
import { Types } from "mongoose";
import { BaseRepository } from "../common/base_repository";
import { injectable } from "tsyringe";
import IOrderRepository from "../../../../application/contract/data_access/shop/order_repository";
import { orderModel } from "../../entity_configuration/shop/order_config";
import Order from "../../../../domain/shop/entity/order";

@injectable()
export default class OrderRepository extends BaseRepository<Order, Types.ObjectId> implements IOrderRepository{
    public constructor(){
        const _model = orderModel;
        super(_model);
    }
}