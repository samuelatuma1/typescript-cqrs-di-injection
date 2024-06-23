import { Filter } from "core/domain/shop/entity/filter";
import { Schema } from "mongoose";

// name: string;
// categoryId: Types.ObjectId | null = null;
// filterType: string;
// values: string[] | number[];
export const FilterSchema = new Schema<Filter>({
    name: {type: String, required: true},
    categoryId: { type: Schema.Types.ObjectId },
    filterType: {type: String, default: 'string'},
    values: {type: [String]}
})