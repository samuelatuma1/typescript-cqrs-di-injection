import { Types } from "mongoose";
import BaseEntity from "../../../domain/common/entity/base_entity";
import UploadFile from "../../../domain/common/model/upload_file";
import Category from "./category";
import Review from "./review";
import FilterForProduct from "./filter_for_product";
import { ProductInventory } from "./product_inventory";
import { Currency } from "../../../domain/common/enum/currency";
import ProductExtra from "./product_extra";
import { FilterType } from "../enum/filter_type";

interface ProductInit {
     name : string;
     desc?: string;
     mainImg?: UploadFile | null;
     otherMedia?: UploadFile[];
     inventory: ProductInventory;
     price: number;
     currency: Currency | string;
     filters: Map<string, FilterForProduct> // key is the filterId as string
     categories?: Types.ObjectId[];
     extras: ProductExtra[];
}
export default class Product extends BaseEntity<Types.ObjectId> {
    public name : string;
    public desc: string;
    public mainImg: UploadFile | null ;
    public otherMedia: UploadFile[];
    public inventory: ProductInventory;
    public price: number;
    public currency: Currency | string;
    public filters: Map<string, FilterForProduct> // key is the filterId as string
    public categories: Category[] | Types.ObjectId[];
    public reviews: Review[] | Types.ObjectId[] = [];
    public extras: ProductExtra[];

    public constructor(init: ProductInit){
        const id = new Types.ObjectId();
        super(id);
        this.name = init.name;
        this.desc = init.desc ?? "";
        this.mainImg = init.mainImg ?? null;
        this.otherMedia = init.otherMedia ?? []
        this.inventory = init.inventory,
        this.price = init.price;
        this.currency = init.currency;
        this.filters = init.filters ?? new Map();
        this.categories = init.categories ?? [];
        this.reviews = [];
        this.extras = init.extras ?? []
    }

}
