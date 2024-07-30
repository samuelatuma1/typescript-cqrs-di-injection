import { Types } from "mongoose";
import Discount from "./discount";
import BaseEntity from "../../../domain/common/entity/base_entity";


export interface SpecialOfferInit {
    name: string;
    desc?: string;
    validityStartDate: Date;
    validityEndDate: Date;
    
}
export default class SpecialOffer extends BaseEntity<Types.ObjectId>  {
    name: string;
    desc: string = "";
    validityStartDate: Date;
    validityEndDate: Date;
    discounts: Types.ObjectId[] | Discount[];
    public constructor(init: SpecialOfferInit){
        super(new Types.ObjectId())
        this.name = init.name;
        this.desc = init.desc ?? "";
        this.discounts = [];
        this.validityStartDate = init.validityStartDate;
        this.validityEndDate = init.validityEndDate;
    }
} 