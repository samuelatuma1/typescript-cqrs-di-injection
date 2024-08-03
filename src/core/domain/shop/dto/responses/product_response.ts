import Discount from "../../entity/discount";
import { Filter } from "../../entity/filter";
import Product, { PackProduct } from "../../entity/product";

export class ProductResponse extends Product {
    public allFiltersForProduct: { [key: string]: Filter; } = {};

    public discountedPrice: number = 0;
    public applieddiscounts: Discount[] = [];

    
}