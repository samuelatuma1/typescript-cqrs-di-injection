import Catalogue from "../../../../../core/domain/shop/entity/catalogue";
import { model, Schema } from "mongoose";
import { UploadFileSchema } from "../common/upload_file_config";

export const catalogueSchema = new Schema<Catalogue>({
    createdAt: {type: Date},
    updatedAt: {type: Date},
    recordStatus: {type: String},

    isFeatured: {type:  Boolean},
    title: {type:  String},
    desc: {type:  String},
    mainImg: {type:  UploadFileSchema},
    products: {type: [Schema.Types.ObjectId], ref: 'Product'}
})

export const catalogueModel = model('Catalogue', catalogueSchema);