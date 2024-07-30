import { Types } from "mongoose";
import { ProductResponse } from "../dto/responses/product_response";
import User from "../../../domain/authentication/entity/user";
import Address from "../../../domain/authentication/entity/address";
import { OrderStatus } from "../enum/order_status";
import { Currency } from "../../../domain/common/enum/currency";
import OrderItem from "./order_item";
import BaseEntity from "../../../domain/common/entity/base_entity";



interface OrderInit {
     orderItems: OrderItem[];
     totalAmount: number;
     payment: null;
     user?: Types.ObjectId | User | null;
     address?: Address | Types.ObjectId | null;
     status?: OrderStatus | string;
     currency: Currency | string
}
export default class Order extends BaseEntity<Types.ObjectId> {
    public orderItems: OrderItem[];
    public totalAmount: number;
    public currency: Currency | string
    public payment: null;
    public user: Types.ObjectId | User | null = null;
    public address: Address | Types.ObjectId | null =  null;
    public orderDate: Date;
    public status: OrderStatus | string;
    public constructor(orderInit: OrderInit){
        const id = new Types.ObjectId();
        super(id);
        
        this.orderItems = orderInit.orderItems;
        this.totalAmount = orderInit.totalAmount;
        this.payment = orderInit.payment;
        this.user = orderInit.user;
        this.address = orderInit.address;
        this.status = orderInit.status ?? OrderStatus.PENDING;
        this.currency = orderInit.currency
    }
}