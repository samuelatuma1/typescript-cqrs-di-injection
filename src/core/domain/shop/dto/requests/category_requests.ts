import { Types } from "mongoose";
import UploadFile from "../../../common/model/upload_file";
import { FilterType } from "../../enum/filter_type";

export class CreateFilterRequest {
    name!: string;
    filterType: FilterType;
    values: string[] | number[];
    categoryId: Types.ObjectId | null = null;
}

export class UpdateFilterRequest {
    _id: Types.ObjectId | string;
    name?: string;
    filterType?: FilterType;
    values?: string[] | number[];
}
export class CreateCategoryRequest{
    public name: string;
    public desc: string;
    public urlName: string;
    img: UploadFile | null = null;
    public parentCategory: Types.ObjectId | null = null;
    public filters: CreateFilterRequest[] = []
}