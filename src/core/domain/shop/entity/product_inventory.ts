import { Types } from "mongoose";
import BaseEntity from "../../../domain/common/entity/base_entity";


interface ProductInventoryInit {
    qtyAvailable?: number;
     qtySold?: number;
}
export class ProductInventory extends BaseEntity<Types.ObjectId>{
    public qtyAvailable: number = 0;
    public qtySold: number = 0;

    public constructor(init: ProductInventoryInit = {}){
        const _id = new Types.ObjectId;
        super(_id)
        this.qtyAvailable = init.qtyAvailable ?? 0;
        this.qtySold = init.qtySold ?? 0;
    }
}