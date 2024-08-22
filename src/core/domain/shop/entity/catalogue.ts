import BaseEntity from "../../../domain/common/entity/base_entity";
import UploadFile from "../../../domain/common/model/upload_file";
import { Types } from "mongoose";
import Product from "./product";


interface CatalogueInit{
    isFeatured: boolean;
    title: string;
    desc: string;
    mainImg: UploadFile;
}
export default class Catalogue extends BaseEntity<Types.ObjectId>{
    public isFeatured: boolean;
    public title: string;
    public desc: string;
    public mainImg: UploadFile;
    products: Product[] | Types.ObjectId[]

    public constructor(init: CatalogueInit){
        super(new Types.ObjectId())
        this.isFeatured = init.isFeatured;
        this.title = init.title;
        this.desc = init.desc;
        this.mainImg = init.mainImg;
        this.products = [];

    }
}