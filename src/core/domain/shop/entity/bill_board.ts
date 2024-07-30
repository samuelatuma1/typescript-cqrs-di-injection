import BaseEntity from "../../../domain/common/entity/base_entity";
import UploadFile from "../../../domain/common/model/upload_file";
import { Types } from "mongoose";
import { BillboardType } from "../enum/billboard_type";


interface BillboardInit {
     img: UploadFile;
     title: string;
     desc: string;
     isActive: boolean;
    billboardRef: string | Types.ObjectId;
     billboardType: BillboardType;
     filters?: {[key: string]: string} | null;
}
export default class Billboard extends BaseEntity<Types.ObjectId> {
    public img: UploadFile;
    public title: string;
    public desc: string;
    public isActive: boolean;
    public billboardType: BillboardType | string;
    public filters: {[key: string]: string} | null;
    public billboardRef: string | Types.ObjectId;

    public constructor(init: BillboardInit){
        const _id = new Types.ObjectId();
        super(_id);
        this.img = init.img;
        this.title = init.title;
        this.desc = init.desc;
        this.isActive = init.isActive;
        this.billboardType = init.billboardType;
        this.filters = init.filters ?? null;
        this.billboardRef = init.billboardRef;
    }
}