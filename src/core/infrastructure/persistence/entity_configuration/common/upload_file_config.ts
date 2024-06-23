import UploadFile from "../../../../domain/common/model/upload_file";
import { Schema } from "mongoose";

export const UploadFileSchema = new Schema<UploadFile>({
    resource_type: {type:String, default: ''},
    secure_url: {type:String, default: ''},
    public_id: {type:String, default: ''},
    folder: {type:String, default: ''},
}, {_id: false});