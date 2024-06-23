import UploadFile from "../../../../domain/common/model/upload_file";
import { Types } from "mongoose";
import { ProductInventory } from "../../entity/product_inventory";
import { Currency } from "../../../../domain/common/enum/currency";
import ProductExtra from "../../entity/product_extra";

export class CreateFilterForProduct {
    name?: string;
    values: string[];
    filterId: Types.ObjectId | string;
}
interface CreateProductRequestInit {
     name : string;
     desc?: string;
    mainImg?: UploadFile | null;
    otherMedia?: UploadFile[];
    inventory?: ProductInventory;
    price: number;
    currency: Currency | string;
    filters: {[key: string]: CreateFilterForProduct} ;// key is the filterId as string
    categories: string[] | Types.ObjectId[];
    extras: ProductExtra[];
}
export class CreateProductRequest {
    public name : string;
    public desc?: string;
    public mainImg?: UploadFile | null = null;
    public otherMedia?: UploadFile[] = [];
    public inventory?: ProductInventory;
    public price: number = 0;
    public currency: Currency | string = Currency.NGN;
    public filters: {[key: string]: CreateFilterForProduct} = {};// key is the filterId as string
    public categories: string[] | Types.ObjectId[] = [];
    public extras: ProductExtra[] = [];

    public constructor(init: CreateProductRequestInit | null = null ){
        this.name = init?.name;
        this.desc = init?.desc ?? "";
        this.mainImg = init?.mainImg ?? null;
        this.otherMedia = init?.otherMedia ?? [],
        this.inventory = init?.inventory ?? null;
        this.price = init?.price ?? 0;
        this.currency = init?.currency ?? Currency.NGN;
        this.filters = init?.filters ?? {};
        this.categories = init?.categories ?? [];
        this.extras = init?.extras ?? []
    }
}