import { Types } from "mongoose"

export default class OrderPlacedEventDTO{
    public orderId: Types.ObjectId;
    public createdAt: Date
    public constructor(init: {orderId: Types.ObjectId, createdAt: Date}){
        this.orderId = init.orderId;
        this.createdAt = init.createdAt;
    }
}