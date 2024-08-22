import Product, { PackProduct } from "../../../../domain/shop/entity/product";
import { model, Schema } from "mongoose";
import { UploadFileSchema } from "../common/upload_file_config";
import { ProductInventory } from "../../../../domain/shop/entity/product_inventory";
import FilterForProduct from "../../../../domain/shop/entity/filter_for_product";
import ProductExtra from "../../../../domain/shop/entity/product_extra";

const ProductInventorySchema = new Schema<ProductInventory>({
    qtyAvailable: {type: Number, default: 0},
    qtySold: {type: Number, default: 0}
})

const FilterForProductSchema = new Schema<FilterForProduct>({
    name: {type: String, default: ""},
    values: {type: [String]},
    categoryId: {type: Schema.Types.ObjectId},
    filterType: {type: String, default: ""},
    filterId: {type: Schema.Types.ObjectId}
});

const ExtraSchema = new Schema<ProductExtra>({
    title: {type: String},
    body: {type: String}
})

const PackProductSchema = new Schema<PackProduct>({
    name: {type: String},
    desc: {type: String},
    mainImg: {type: UploadFileSchema, default: null},
    otherMedia: {type: [UploadFileSchema], default: []},
    qty: {type: Number, default: 1},
    isDeleted: {type: Boolean, default: false}
})
export const ProductSchema = new Schema<Product>({
    createdAt: {type: Date},
    updatedAt: {type: Date},
    recordStatus: {type: String},
    
    name: {type: String, required: true},
    desc: {type: String, default: ""},
    mainImg: {type: UploadFileSchema, default: null},
    otherMedia: {type: [UploadFileSchema], default: []},
    inventory: {type: ProductInventorySchema},
    price: {type: Number},
    currency: {type: String},
    filters: {type: Map, of: FilterForProductSchema},

    categories: {type: [Schema.Types.ObjectId], ref: 'Category'},
    extras: {type: [ExtraSchema]},

    discounts: {type: [Schema.Types.ObjectId], ref: 'Discount'},
    isPack: {type: Boolean, default: false},
    packProducts: {type:[PackProductSchema]},
    brandId: {type: Schema.Types.ObjectId, ref: 'Brand', default: null}
});

export const productModel = model<Product>('Product', ProductSchema);