import { Types } from "mongoose";
import BaseEntity from "../../../domain/common/entity/base_entity";
import { Currency } from "../../../domain/common/enum/currency";
import { PaymentStatus } from "../enum/payment_status";

export default class Payment extends BaseEntity<Types.ObjectId>{
    public reference: string;
    public cartId: Types.ObjectId;
    public amount: number;
    public currency: Currency | string;
    public customer: {email: string, phone_number: string};
    public status: PaymentStatus | string;
    public narration: string;
    public amount_paid: number;
}