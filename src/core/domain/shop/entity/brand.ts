import BaseEntity from "../../../domain/common/entity/base_entity";
import { Types } from "mongoose";
import Product from "./product";
import UploadFile from "../../../domain/common/model/upload_file";

interface BrandInit{
    isFeatured: boolean;
    name: string;
    desc: string;
    mainImg: UploadFile;
}

export default class Brand extends BaseEntity<Types.ObjectId> {
    public name: string;
    public desc: string;
    public isFeatured: boolean;
    public products: Product[] | Types.ObjectId[];
    public mainImg: UploadFile
    public constructor(init: BrandInit){
        super(new Types.ObjectId())
        this.isFeatured = init.isFeatured;
        this.name = init.name;
        this.desc = init.desc;
        this.mainImg = init.mainImg;
        this.products = [];
    }
}