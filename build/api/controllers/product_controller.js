"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = require("../../core/application/contract/services/shop/product_service");
const tsyringe_1 = require("tsyringe");
const base_controller_1 = __importDefault(require("./base_controller"));
const serialization_utility_1 = __importDefault(require("../../core/application/common/utilities/serialization_utility"));
const mongoose_1 = require("mongoose");
const product_logic_1 = require("../../core/application/contract/logic/shop/product_logic");
let ProductController = class ProductController extends base_controller_1.default {
    productService;
    productLogic;
    constructor(productService, productLogic) {
        super();
        this.productService = productService;
        this.productLogic = productLogic;
    }
    createProduct = async (req, res, next) => {
        try {
            let reqBody = serialization_utility_1.default.deserializeJson(req.body.data);
            reqBody.mainImg = this.convertReqFilesToUploadFiles(req, "mainImg")[0] ?? null;
            reqBody.otherMedia = this.convertReqFilesToUploadFiles(req, "otherMedia");
            console.log({ reqBody });
            let createdProduct = await this.productService.createProduct(reqBody);
            return res.json(createdProduct);
        }
        catch (ex) {
            next(ex);
        }
    };
    updateProduct = async (req, res, next) => {
        try {
            let productId = new mongoose_1.Types.ObjectId(req.params.productId);
            let updatedProduct = await this.productService.updateProduct(productId, req.body);
            return res.json(updatedProduct);
        }
        catch (ex) {
            next(ex);
        }
    };
    getProduct = async (req, res, next) => {
        try {
            let productId = new mongoose_1.Types.ObjectId(req.params.productId);
            let product = await this.productService.getProduct(productId);
            return res.json(product);
        }
        catch (ex) {
            next(ex);
        }
    };
    specialOffers = async (req, res, next) => {
        try {
            let offerId = new mongoose_1.Types.ObjectId(req.params.offerId);
            let product = await this.productService.getProductsWithSpecialOffer(offerId);
            return res.json(product);
        }
        catch (ex) {
            next(ex);
        }
    };
    addPackProduct = async (req, res, next) => {
        try {
            let productId = req.params.productId;
            let reqBody = serialization_utility_1.default.deserializeJson(req.body.data);
            reqBody.mainImg = this.convertReqFilesToUploadFiles(req, "mainImg")[0] ?? null;
            reqBody.otherMedia = this.convertReqFilesToUploadFiles(req, "otherMedia");
            let product = await this.productService.addPackProduct(productId, reqBody);
            return res.json(product);
        }
        catch (ex) {
            next(ex);
        }
    };
    addPackProducts = async (req, res, next) => {
        try {
            let productId = req.params.productId;
            let reqBody = serialization_utility_1.default.deserializeJson(req.body.data);
            let imgs = [];
            for (let i = 1; i <= 10; i++) {
                let img = this.convertReqFilesToUploadFiles(req, `mainImg${i}`) ?? [];
                if (img?.length) {
                    imgs.push(img[0]);
                }
            }
            for (let j = 0; j < (reqBody.length ?? 0); j++) {
                let productImg = imgs[j] ?? null;
                reqBody[j].mainImg = productImg;
            }
            let product = await this.productService.addPackProducts(productId, reqBody);
            return res.json(product);
        }
        catch (ex) {
            next(ex);
        }
    };
    // public updatePackProduct = async (req: Request<{}>)
    deletePackProduct = async (req, res, next) => {
        try {
            let productId = req.params.productId;
            let packProductId = req.query.packProductId;
            let product = await this.productService.deletePackProduct(productId, packProductId);
            return res.json(product);
        }
        catch (ex) {
            next(ex);
        }
    };
    updatePackProduct = async (req, res, next) => {
        try {
            let productId = req.params.productId;
            let packProductId = req.query.packProductId;
            console.log({ body: req.body });
            let reqBody = serialization_utility_1.default.deserializeJson(req.body.data);
            reqBody.mainImg = this.convertReqFilesToUploadFiles(req, "mainImg")[0] ?? null;
            reqBody.otherMedia = this.convertReqFilesToUploadFiles(req, "otherMedia");
            let product = await this.productService.updatePackProduct(productId, packProductId, reqBody);
            return res.json(product);
        }
        catch (ex) {
            next(ex);
        }
    };
    bestSellers = async (req, res, next) => {
        try {
            let query = req.query;
            console.log("Here");
            let page = query.page ?? 0;
            let pageSize = query.pageSize ?? 0;
            req.query.page = parseInt(page.toString());
            req.query.pageSize = parseInt(pageSize.toString());
            console.log({ query: req.query });
            let response = await this.productService.bestSellers(req.query);
            return res.json(response);
        }
        catch (ex) {
            next(ex);
        }
    };
    createReview = async (req, res, next) => {
        try {
            let response = await this.productLogic.createReviewForProduct(req.body);
            return res.json(response);
        }
        catch (ex) {
            next(ex);
        }
    };
};
ProductController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(product_service_1.IIProductService)),
    __param(1, (0, tsyringe_1.inject)(product_logic_1.IIProductLogic)),
    __metadata("design:paramtypes", [Object, Object])
], ProductController);
exports.default = ProductController;
//# sourceMappingURL=product_controller.js.map