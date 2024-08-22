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
import { Types } from "mongoose";
import BaseEntity from "../../../domain/common/entity/base_entity";
import UploadFile from "../../../domain/common/model/upload_file";
import Category from "./category";
import Review from "./review";
import FilterForProduct from "./filter_for_product";
import { ProductInventory } from "./product_inventory";
import { Currency } from "../../../domain/common/enum/currency";
import ProductExtra from "./product_extra";
import Discount from "./discount";
import Catalogue from "./catalogue";
export interface ProductInit {
    name: string;
    desc?: string;
    mainImg?: UploadFile | null;
    otherMedia?: UploadFile[];
    inventory: ProductInventory;
    price: number;
    currency: Currency | string;
    filters: Map<string, FilterForProduct>;
    categories?: Types.ObjectId[];
    extras: ProductExtra[];
    discounts?: Discount[] | Types.ObjectId[];
    isPack?: boolean;
    packProducts?: PackProduct[];
    brandId?: Types.ObjectId | null;
}
export declare class PackProduct {
    _id?: Types.ObjectId;
    name: string;
    desc?: string;
    mainImg: UploadFile | null;
    otherMedia: UploadFile[];
    qty: number;
    isDeleted: boolean;
}
export default class Product extends BaseEntity<Types.ObjectId> {
    name: string;
    desc: string;
    mainImg: UploadFile | null;
    otherMedia: UploadFile[];
    inventory: ProductInventory;
    price: number;
    currency: Currency | string;
    filters: Map<string, FilterForProduct>;
    categories: Category[] | Types.ObjectId[];
    reviews: Review[] | Types.ObjectId[];
    extras: ProductExtra[];
    variants: Variant[];
    discounts: Discount[] | Types.ObjectId[];
    isPack: boolean;
    packProducts?: PackProduct[];
    catalogues: Catalogue[] | Types.ObjectId[];
    brandId?: Types.ObjectId | null;
    constructor(init: ProductInit);
}
declare class Variant extends Product {
    variants: null;
    productId: Types.ObjectId | null;
}
export {};
