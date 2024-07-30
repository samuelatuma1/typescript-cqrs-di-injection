import Billboard from "core/domain/shop/entity/bill_board";
import { model, Schema } from "mongoose";
import { UploadFileSchema } from "../common/upload_file_config";

export const BillboardSchema = new Schema<Billboard>({

    createdAt: { type: Date, required: true },
    updatedAt : { type: Date, required: true },
    recordStatus: {type: String, required: true},
    
    img: {type: UploadFileSchema},
    title: {type: String},
    desc: {type: String},
    isActive: {type: Boolean, default: false},
    billboardType: {type: String},
    billboardRef: {type: String},
    filters: {type: Map, of: String}
})

export const billboardModel = model('Billboard', BillboardSchema);