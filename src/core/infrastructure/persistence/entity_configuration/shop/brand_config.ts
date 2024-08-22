import { model, Schema } from "mongoose";
import Brand from "../../../../domain/shop/entity/brand";
import { UploadFileSchema } from "../common/upload_file_config";

const BrandSchema = new Schema<Brand>({
    isFeatured: {type: Boolean, default: false},
    name: {type: String, default: ""},
    desc: {type: String, default: ""},
    mainImg: {type: UploadFileSchema},
    products: {type: [Schema.Types.ObjectId]}
})

export const brandModel = model('Brand', BrandSchema);