import { Types } from "mongoose";
import { FilterType } from "../enum/filter_type";

interface FilterForProductInit {
    name: string;
    values: string[];
    categoryId: Types.ObjectId | string;
    filterType: FilterType | string;
    filterId: Types.ObjectId | string;
}
export default class FilterForProduct {
    name: string;
    values: string[];
    categoryId: Types.ObjectId | string;
    filterType: FilterType | string;
    filterId: Types.ObjectId | string;

    public constructor(filterForProductInit: FilterForProductInit){
        this.name = filterForProductInit.name;
        this.values = filterForProductInit.values;
        this.filterType = filterForProductInit.filterType;
        this.filterId = filterForProductInit.filterId;
    }
} 