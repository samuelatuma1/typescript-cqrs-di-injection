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
import BaseEntity from "../../../domain/common/entity/base_entity";
import { Types } from "mongoose";
import Product from "./product";
import UploadFile from "../../../domain/common/model/upload_file";
interface BrandInit {
    isFeatured: boolean;
    name: string;
    desc: string;
    mainImg: UploadFile;
}
export default class Brand extends BaseEntity<Types.ObjectId> {
    name: string;
    desc: string;
    isFeatured: boolean;
    products: Product[] | Types.ObjectId[];
    mainImg: UploadFile;
    constructor(init: BrandInit);
}
export {};
