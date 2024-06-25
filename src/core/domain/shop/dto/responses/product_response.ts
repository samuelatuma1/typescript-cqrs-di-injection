import { Filter } from "../../entity/filter";
import Product from "../../entity/product";

export class ProductResponse extends Product {
    public allFiltersForProduct: { [key: string]: Filter; } = {};
}