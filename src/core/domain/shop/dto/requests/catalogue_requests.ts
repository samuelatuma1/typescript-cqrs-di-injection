import { Types } from "mongoose";
import UploadFile from "../../../../domain/common/model/upload_file";

export class CreateCatalogueRequest {
    public isFeatured: boolean;
    public title: string;
    public desc: string;
    public mainImg: UploadFile;
}

export class UpdateCatalogueRequest {
    public isFeatured?: boolean
    public title?: string;
    public desc?: string;
    public mainImg?: UploadFile;
}

export class QueryCatalogue {
    public isFeatured?: boolean | string
    public title?: string;
    public desc?: string;
    public mainImg?: UploadFile;
}


export class AddProductsToCatalogueRequest {
    catalogueId: Types.ObjectId;
    productIds: Types.ObjectId[];
}

export class RemoveProductsToCatalogueRequest {
    catalogueId: Types.ObjectId;
    productIds: Types.ObjectId[];
}