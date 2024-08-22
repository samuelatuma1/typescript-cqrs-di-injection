import { Types } from "mongoose";
import Product from "../../entity/product";
import { ProductResponse } from "./product_response";
import UploadFile from "../../../../domain/common/model/upload_file";
import Category from "../../entity/category";
import Brand from "../../entity/brand";

export class BrandResponse{
    public _id: Types.ObjectId;
    public name: string;
    public desc: string;
    public isFeatured: boolean;
    public products: Product[] | Types.ObjectId[] | ProductResponse[];
    public mainImg: UploadFile;
    public categories: Category[]
    public constructor(init: Brand){
        this._id = init._id;
        this.isFeatured = init.isFeatured;
        this.name = init.name;
        this.desc = init.desc;
        this.mainImg = init.mainImg;
        this.products = init.products;
        this.categories = []
    }

}