import Discount from "../../entity/discount";
import { Filter } from "../../entity/filter";
import Product from "../../entity/product";
export declare class ProductResponse extends Product {
    allFiltersForProduct: {
        [key: string]: Filter;
    };
    discountedPrice: number;
    applieddiscounts: Discount[];
}
