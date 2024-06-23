import { CreateProductRequest } from "../../../../domain/shop/dto/requests/product_requests";
import Product from "../../../../domain/shop/entity/product";

export default interface IProductService {
    createProduct (createProductRequest: CreateProductRequest) : Promise<Product> 
}

export const IIProductService = "IProductService";