import { Types } from "mongoose";
import BaseEntity from "../../common/entity/base_entity";
import UploadFile from "../../common/model/upload_file";
import { Filter } from "./filter";

interface CategoryInit {
    name: string;
    urlName: string;
    desc?: string;
    img?: UploadFile;
    parentCategory?: Types.ObjectId | null | string;
    filters?: Filter[];
    products?: object[]; //TODO: Replace with actual product
}

export default class Category extends BaseEntity<Types.ObjectId>{
    name!: string;
    urlName: string;
    desc: string = "";
    img: UploadFile | null;
    parentCategory: Types.ObjectId | Category | null = null;
    filters: Filter[];
    products: object[]; //TODO: Replace with actual product

    constructor(init: CategoryInit);
    public constructor(init: CategoryInit){
        const id = new Types.ObjectId();
        super(id);
        this.name = init.name;
        this.urlName = init.urlName;
        this.desc = init.desc ?? '';
        this.img = init.img ?? null;
        this.parentCategory = init.parentCategory ? new Types.ObjectId(init.parentCategory) : null;
        this.filters = init.filters ?? [];
        this.products = init.products ?? [];
        
    }
}