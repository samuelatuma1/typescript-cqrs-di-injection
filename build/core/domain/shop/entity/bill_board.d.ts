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
import UploadFile from "../../../domain/common/model/upload_file";
import { Types } from "mongoose";
import { BillboardType } from "../enum/billboard_type";
interface BillboardInit {
    img: UploadFile;
    title: string;
    desc: string;
    isActive: boolean;
    billboardRef: string | Types.ObjectId;
    billboardType: BillboardType;
    filters?: {
        [key: string]: string;
    } | null;
}
export default class Billboard extends BaseEntity<Types.ObjectId> {
    img: UploadFile;
    title: string;
    desc: string;
    isActive: boolean;
    billboardType: BillboardType | string;
    filters: {
        [key: string]: string;
    } | null;
    billboardRef: string | Types.ObjectId;
    constructor(init: BillboardInit);
}
export {};
