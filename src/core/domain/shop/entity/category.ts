import { Types } from "mongoose";
import BaseEntity from "../../common/entity/base_entity";
import UploadFile from "../../common/model/upload_file";
import { Filter } from "./filter";
import Product from "./product";
import { PaginationResponse } from "../../../domain/authentication/dto/results/pagination_result";

interface CategoryInit {
    name: string;
    urlName: string;
    desc?: string;
    img?: UploadFile;
    parentCategory?: Types.ObjectId | null | string;
    filters?: Filter[];
    products?: Product[]; //TODO: Replace with actual product
    isFeatured?: boolean
}

export default class Category extends BaseEntity<Types.ObjectId>{
    name!: string;
    urlName: string;
    desc: string = "";
    img: UploadFile | null;
    parentCategory: Types.ObjectId | Category | null = null;
    subCategories: Category[] = [];
    filters: Filter[];
    products:Product[]; //TODO: Replace with actual product
    public pagedProducts: PaginationResponse<Product> | null;
    public isFeatured: boolean 
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
        this.subCategories = [];
        this.pagedProducts = null;
        this.isFeatured = init.isFeatured ?? false;
    }
}