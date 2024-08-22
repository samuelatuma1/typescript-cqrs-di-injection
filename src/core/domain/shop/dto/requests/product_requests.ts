import UploadFile from "../../../../domain/common/model/upload_file";
import { Types } from "mongoose";
import { ProductInventory } from "../../entity/product_inventory";
import { Currency } from "../../../../domain/common/enum/currency";
import ProductExtra from "../../entity/product_extra";
import { CreateDiscountRequest } from "./discount_request";
import Pagination from "../../../../domain/common/dto/requests/paginate_request";

export class CreateFilterForProduct {
    name?: string;
    values: string[];
    filterId: Types.ObjectId | string;
}
export interface CreateProductRequestInit {
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
    isPack?: boolean;
    brandId?: Types.ObjectId | string;

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
    brandId: Types.ObjectId | string;
    public isPack: boolean = false;

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
        this.extras = init?.extras ?? [];
        this.isPack = init?.isPack ?? false;
        this.brandId = init?.brandId ?? null;
    }
}

export class CreatePackProduct{
    public name : string;
    public desc?: string;
    public mainImg: UploadFile | null ;
    public otherMedia: UploadFile[];
    public qty: number = 1;
}

export class UpdatePackProduct{
    public name?: string;
    public desc?: string;
    public mainImg?: UploadFile | null ;
    public otherMedia?: UploadFile[];
    public qty?: number = 1;
}
export class UpdateProductRequest {
    public name?: string;
    public desc?: string;
    // public mainImg?: UploadFile;
    // public otherMedia?: UploadFile[];
    public inventory?: ProductInventory;
    public price?: number = 0;
    public currency?: Currency | string = Currency.NGN;
    public filters?: {[key: string]: CreateFilterForProduct};
    public categories?: string[] | Types.ObjectId[];
    public extras?: ProductExtra[];
    public brandId?: Types.ObjectId | null = null;
}


export class ApplyProductToDiscount {
    productId: Types.ObjectId | string;
    discountId?: Types.ObjectId | string;
    discount?: CreateDiscountRequest
}

export class BestSellersQuery extends Pagination<Types.ObjectId> {
    categoryId?: string | Types.ObjectId;
    catalogueId?: string | Types.ObjectId;
    brandId?: string | Types.ObjectId;
    lastItemId?: string | Types.ObjectId;
    

}