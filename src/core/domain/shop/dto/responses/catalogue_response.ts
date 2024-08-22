import UploadFile from "../../../../domain/common/model/upload_file";
import Catalogue from "../../entity/catalogue";
import Product from "../../entity/product";
import { ProductResponse } from "./product_response";
import { Types } from "mongoose";

export default class CatalogueResponse {
    public _id: Types.ObjectId;
    public isFeatured: boolean;
    public title: string;
    public desc: string;
    public mainImg: UploadFile;
    products: ProductResponse[] | Types.ObjectId[] | Product[]
    public constructor(init: Catalogue){
        this.isFeatured = init.isFeatured;
        this.title = init.title;
        this.desc = init.desc;
        this.mainImg = init.mainImg;
        this.products = init.products ?? [];
        this._id = init._id
    }
}