import { Types } from "mongoose";
import UploadFile from "../../../../domain/common/model/upload_file";

export class CreateBrandRequest{
    public name: string;
    public desc: string;
    public isFeatured: boolean;
    public products?: Types.ObjectId[];
    public mainImg: UploadFile
}