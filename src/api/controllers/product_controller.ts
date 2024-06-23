import { NextFunction, Request, Response } from "express";
import IProductService, { IIProductService } from "../../core/application/contract/services/shop/product_service";
import { inject, injectable } from "tsyringe";
import { CreateProductRequest } from "../../core/domain/shop/dto/requests/product_requests";
import BaseController from "./base_controller";
import SerializationUtility from "../../core/application/common/utilities/serialization_utility";

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
            console.log({body: reqBody, mainImg: reqBody.mainImg, otherMedia: reqBody.otherMedia})
            
            let createdProduct = await this.productService.createProduct(reqBody);
            return res.json(createdProduct);
        }
        catch(ex){
            next(ex);
        }
    }
}