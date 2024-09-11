import { NextFunction, Request, Response } from "express";
import IProductService, { IIProductService } from "../../core/application/contract/services/shop/product_service";
import { inject, injectable } from "tsyringe";
import { BestSellersQuery, CreatePackProduct, CreateProductRequest, UpdatePackProduct, UpdateProductRequest } from "../../core/domain/shop/dto/requests/product_requests";
import BaseController from "./base_controller";
import SerializationUtility from "../../core/application/common/utilities/serialization_utility";
import { Types } from "mongoose";
import UploadFile from "../../core/domain/common/model/upload_file";
import { CreateProductReview } from "../../core/domain/shop/dto/requests/review_requests";
import IProductLogic, { IIProductLogic } from "../../core/application/contract/logic/shop/product_logic";

@injectable()
export default class ProductController extends BaseController {
    public constructor(
        @inject(IIProductService) private readonly productService: IProductService,
        @inject(IIProductLogic) private readonly productLogic: IProductLogic
    ){
        super();
    }

    public createProduct = async (req: Request, res: Response, next: NextFunction) => {
        try{
            let reqBody: CreateProductRequest = SerializationUtility.deserializeJson<CreateProductRequest>(req.body.data);

            reqBody.mainImg = this.convertReqFilesToUploadFiles(req, "mainImg")[0] ?? null;
            reqBody.otherMedia = this.convertReqFilesToUploadFiles(req, "otherMedia");
            console.log({reqBody})
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

    public addPackProduct = async (req: Request<{productId: Types.ObjectId }>, res: Response, next: NextFunction) => {
        try{
            let productId = req.params.productId;
            let reqBody: CreatePackProduct = SerializationUtility.deserializeJson<CreatePackProduct>(req.body.data);

            reqBody.mainImg = this.convertReqFilesToUploadFiles(req as unknown as Request, "mainImg")[0] ?? null;
            reqBody.otherMedia = this.convertReqFilesToUploadFiles(req as unknown as Request, "otherMedia");
           
            let product = await this.productService.addPackProduct(productId, reqBody);
            return res.json(product);
        }
        catch(ex){
            next(ex)
        }
    }


    public addPackProducts = async (req: Request<{productId: Types.ObjectId }>, res: Response, next: NextFunction) => {
        try{
            let productId = req.params.productId;
            let reqBody: CreatePackProduct[] = SerializationUtility.deserializeJson<CreatePackProduct[]>(req.body.data);
            let imgs: UploadFile[] = []
            for(let i = 1; i <= 10; i++){
                let img = this.convertReqFilesToUploadFiles(req as unknown as Request, `mainImg${i}`) ?? [];
                if(img?.length){
                    imgs.push(img[0])
                }
            }
            for(let j = 0; j < (reqBody.length ?? 0); j++){
                let productImg = imgs[j] ?? null;
                
                reqBody[j].mainImg = productImg;
            }

            let product = await this.productService.addPackProducts(productId, reqBody);
            return res.json(product);
        }
        catch(ex){
            next(ex)
        }
    }

    // public updatePackProduct = async (req: Request<{}>)
    public deletePackProduct = async (req: Request<{productId: Types.ObjectId }, {}, {}, {packProductId: Types.ObjectId | string}>, res: Response, next: NextFunction) => {
        try{
            let productId = req.params.productId;
            let packProductId = req.query.packProductId;
            
            let product = await this.productService.deletePackProduct(productId, packProductId);
            return res.json(product);
        }
        catch(ex){
            next(ex)
        }
    }

    public updatePackProduct = async (req: Request<{productId: Types.ObjectId }, {}, {data: string}, {packProductId: Types.ObjectId | string}>, res: Response, next: NextFunction) => {
        try{
            let productId = req.params.productId;
            let packProductId = req.query.packProductId;
            console.log({body: req.body})
            let reqBody: UpdatePackProduct = SerializationUtility.deserializeJson<UpdatePackProduct>(req.body.data);

            reqBody.mainImg = this.convertReqFilesToUploadFiles(req as unknown as Request, "mainImg")[0] ?? null;
            reqBody.otherMedia = this.convertReqFilesToUploadFiles(req as unknown as Request, "otherMedia");

            let product = await this.productService.updatePackProduct(productId, packProductId, reqBody);
            return res.json(product);
        }
        catch(ex){
            next(ex)
        }
    }

    public bestSellers = async (req: Request<{}, {}, {}, BestSellersQuery>, res: Response, next: NextFunction) => {
        try{
            let query: BestSellersQuery = req.query;

            console.log("Here")
            let page = query.page ?? 0;
            let pageSize = query.pageSize ?? 0;
            req.query.page = parseInt(page.toString());
            req.query.pageSize = parseInt(pageSize.toString());
            console.log({query: req.query})
            let response = await this.productService.bestSellers(req.query)
            return res.json(response)
        }
        catch(ex){
            next(ex);
        }
    }

    public createReview = async (req: Request<{}, {}, CreateProductReview>, res: Response, next: NextFunction) => {
        try{
            let response = await this.productLogic.createReviewForProduct(req.body)
            return res.json(response)
        }
        catch(ex){
            next(ex);
        }
    }

}