/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import UploadFile from "../../../../domain/common/model/upload_file";
import { Types } from "mongoose";
import { ProductInventory } from "../../entity/product_inventory";
import { Currency } from "../../../../domain/common/enum/currency";
import ProductExtra from "../../entity/product_extra";
import { CreateDiscountRequest } from "./discount_request";
import Pagination from "../../../../domain/common/dto/requests/paginate_request";
import { UpdateProductInventoryType } from "../../enum/update_product_inventory_type";
export declare class CreateFilterForProduct {
    name?: string;
    values: string[];
    filterId: Types.ObjectId | string;
}
export interface CreateProductRequestInit {
    name: string;
    desc?: string;
    mainImg?: UploadFile | null;
    otherMedia?: UploadFile[];
    inventory?: ProductInventory;
    price: number;
    currency: Currency | string;
    filters: {
        [key: string]: CreateFilterForProduct;
    };
    categories: string[] | Types.ObjectId[];
    extras: ProductExtra[];
    isPack?: boolean;
    brandId?: Types.ObjectId | string;
    tags?: string[];
    isFeatured?: boolean;
}
export declare class CreateProductRequest {
    name: string;
    desc?: string;
    mainImg?: UploadFile | null;
    otherMedia?: UploadFile[];
    inventory?: ProductInventory;
    price: number;
    currency: Currency | string;
    filters: {
        [key: string]: CreateFilterForProduct;
    };
    categories: string[] | Types.ObjectId[];
    extras: ProductExtra[];
    brandId: Types.ObjectId | string;
    isPack: boolean;
    tags?: string[];
    isFeatured?: boolean;
    constructor(init?: CreateProductRequestInit | null);
}
export declare class CreatePackProduct {
    name: string;
    desc?: string;
    mainImg: UploadFile | null;
    otherMedia: UploadFile[];
    qty: number;
}
export declare class UpdatePackProduct {
    name?: string;
    desc?: string;
    mainImg?: UploadFile | null;
    otherMedia?: UploadFile[];
    qty?: number;
}
export declare class UpdateProductInventory {
    qty: number;
    updateType: UpdateProductInventoryType;
}
export declare class UpdateProductRequest {
    name?: string;
    desc?: string;
    inventory?: UpdateProductInventory;
    price?: number;
    currency?: Currency | string;
    filters?: {
        [key: string]: CreateFilterForProduct;
    };
    addCategories?: string[] | Types.ObjectId[];
    removeCategories?: string[] | Types.ObjectId[];
    brandId?: Types.ObjectId | null;
    addTags?: string[];
    removeTags?: string[];
    addExtras?: ProductExtra[];
    removeExtras?: ProductExtra[];
    isFeatured?: boolean;
}
export declare class ApplyProductToDiscount {
    productId: Types.ObjectId | string;
    discountId?: Types.ObjectId | string;
    discount?: CreateDiscountRequest;
}
export declare class BestSellersQuery extends Pagination<Types.ObjectId> {
    categoryId?: string | Types.ObjectId;
    catalogueId?: string | Types.ObjectId;
    brandId?: string | Types.ObjectId;
    lastItemId?: string | Types.ObjectId;
}
