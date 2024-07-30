import { NextFunction, Request, Response } from "express";
import IProductService, { IIProductService } from "../../core/application/contract/services/shop/product_service";
import { inject, injectable } from "tsyringe";
import { CreateProductRequest, UpdateProductRequest } from "../../core/domain/shop/dto/requests/product_requests";
import BaseController from "./base_controller";
import SerializationUtility from "../../core/application/common/utilities/serialization_utility";
import { Types } from "mongoose";

@injectable()
export default class ProductController extends BaseController {
    public constructor(
        @inject(IIProductService) private readonly productService: IProductService
    ){
        super();
    }

    public createProduct = async (req: Request, res: Response, next: NextFunction) => {
        try{
            let reqBody: CreateProductRequest = SerializationUtility.deserializeJson<CreateProductRequest>(req.body.data);

            reqBody.mainImg = this.convertReqFilesToUploadFiles(req, "mainImg")[0] ?? null;
            reqBody.otherMedia = this.convertReqFilesToUploadFiles(req, "otherMedia");
            
            let createdProduct = await this.productService.createProduct(reqBody);
            return res.json(createdProduct);
        }
        catch(ex){
            next(ex);
        }
    }

    public updateProduct = async (req: Request<{productId: Types.ObjectId | string}, {}, UpdateProductRequest>, res: Response, next: NextFunction) => {
        try{

            let productId = new Types.ObjectId(req.params.productId);
            
            let updatedProduct = await this.productService.updateProduct(productId, req.body);
            return res.json(updatedProduct);
        }
        catch(ex){
            next(ex);
        }
    }

    public getProduct = async (req: Request<{productId: Types.ObjectId | string}>, res: Response, next: NextFunction) => {
        try{
            let productId = new Types.ObjectId(req.params.productId);
           
            let product = await this.productService.getProduct(productId);
            return res.json(product);
        }
        catch(ex){
            next(ex)
        }
    }

    public specialOffers = async (req: Request<{offerId: Types.ObjectId }>, res: Response, next: NextFunction) => {
        try{
            let offerId = new Types.ObjectId(req.params.offerId);
           
            let product = await this.productService.getProductsWithSpecialOffer(offerId);
            return res.json(product);
        }
        catch(ex){
            next(ex)
        }
    }

}