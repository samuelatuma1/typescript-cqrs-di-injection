import { model, Schema, Types } from "mongoose";
import Category from "../../../../domain/shop/entity/category";
import { FilterSchema } from "./filter_config";
import { UploadFileSchema } from "../common/upload_file_config";
import { ProductSchema } from "./product_config";

var categorgySchema = new Schema<Category>({
    createdAt: { type: Date, required: true },
    updatedAt : { type: Date, required: true },
    recordStatus: {type: String, required: true},

    name: {type: String, required: true},
    urlName: {type: String, required: true},
    desc: {type: String, default: ""},
    img: {type: UploadFileSchema, default: null},
    parentCategory: {type: Types.ObjectId, ref: 'Category', default: null},
    filters: {type: [FilterSchema]},
    products: {type: [ProductSchema]},
    subCategories: {type: []},
});

export const categoryModel  = model<Category>("Category", categorgySchema);