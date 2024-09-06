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
const tsyringe_1 = require("tsyringe");
const base_controller_1 = __importDefault(require("./base_controller"));
const serialization_utility_1 = __importDefault(require("../../core/application/common/utilities/serialization_utility"));
const category_service_1 = require("../../core/application/contract/services/shop/category_service");
const mongoose_1 = require("mongoose");
const product_service_1 = require("../../core/application/contract/services/shop/product_service");
const discount_service_1 = require("../../core/application/contract/services/shop/discount_service");
const order_service_1 = require("../../core/application/contract/services/shop/order_service");
const billboard_service_1 = require("../../core/application/contract/services/shop/billboard_service");
const catalogue_service_1 = require("../../core/application/contract/services/shop/catalogue_service");
const brand_logic_1 = require("../../core/application/contract/logic/shop/brand_logic");
const category_logic_1 = require("../../core/application/contract/logic/shop/category_logic");
let ShopController = class ShopController extends base_controller_1.default {
    categoryService;
    productService;
    discountService;
    orderService;
    billboardService;
    catalogueService;
    brandLogic;
    cateoryLogic;
    constructor(categoryService, productService, discountService, orderService, billboardService, catalogueService, brandLogic, cateoryLogic) {
        super();
        this.categoryService = categoryService;
        this.productService = productService;
        this.discountService = discountService;
        this.orderService = orderService;
        this.billboardService = billboardService;
        this.catalogueService = catalogueService;
        this.brandLogic = brandLogic;
        this.cateoryLogic = cateoryLogic;
    }
    createCategory = async (req, res, next) => {
        try {
            let data = req.body.data;
            let categoryDTO = serialization_utility_1.default.deserializeJson(data);
            categoryDTO.img = this.convertReqFilesToUploadFiles(req, 'mainImg')[0] ?? null;
            console.log("Chai");
            const createdCategory = await this.categoryService.createCategory(categoryDTO);
            res.json(createdCategory);
        }
        catch (ex) {
            next(ex);
        }
    };
    addFiltersToCategory = async (req, res, next) => {
        try {
            let categoryId = new mongoose_1.Types.ObjectId(req.params.categoryId);
            let data = req.body;
            console.log({ data });
            const categoryWithUpdatedFilters = await this.categoryService.addFiltersToCategory(categoryId, data);
            return res.json(categoryWithUpdatedFilters);
        }
        catch (ex) {
            next(ex);
        }
    };
    deleteFilters = async (req, res, next) => {
        try {
            let categoryId = new mongoose_1.Types.ObjectId(req.params.categoryId);
            let filterIds = req.body.map(id => new mongoose_1.Types.ObjectId(id));
            const categoryWithoutDeletedFilters = await this.categoryService.deleteFilters(categoryId, filterIds);
            return res.json(categoryWithoutDeletedFilters);
        }
        catch (ex) {
            next(ex);
        }
    };
    updateFilter = async (req, res, next) => {
        try {
            let categoryId = new mongoose_1.Types.ObjectId(req.params.categoryId);
            const categoryWithUpdatedFilter = await this.categoryService.updateFilter(categoryId, req.body);
            return res.json(categoryWithUpdatedFilter);
        }
        catch (ex) {
            next(ex);
        }
    };
    getCategory = async (req, res, next) => {
        try {
            let categoryId = new mongoose_1.Types.ObjectId(req.params.categoryId);
            let filters = req.query;
            let page = parseInt((filters.page ?? 0).toString());
            let pageSize = parseInt((filters.pageSize ?? 10).toString());
            const enrichedCategory = await this.cateoryLogic.getCategoryEnriched(categoryId, filters, page, pageSize);
            return res.json(enrichedCategory);
        }
        catch (ex) {
            next(ex);
        }
    };
    createDiscount = async (req, res, next) => {
        try {
            const discount = await this.discountService.createDiscount(req.body);
            return res.json(discount);
        }
        catch (ex) {
            next(ex);
        }
    };
    addDiscount = async (req, res, next) => {
        let queryParams = req.query;
        try {
            let addedDiscountForProduct = await this.productService.applyDiscount(queryParams.productId, queryParams.discountId);
            return res.json(addedDiscountForProduct);
        }
        catch (ex) {
            next(ex);
        }
    };
    createSpecialOffer = async (req, res, next) => {
        try {
            let specialOffer = await this.discountService.createSpecialOffer(req.body);
            return res.json(specialOffer);
        }
        catch (ex) {
            next(ex);
        }
    };
    addDiscountsToSpecialOffer = async (req, res, next) => {
        try {
            const specialOfferId = new mongoose_1.Types.ObjectId(req.params.specialOfferId);
            let specialOfferDiscounts = await this.discountService.addDiscountsToSpecialOffer(specialOfferId, req.body);
            return res.json(specialOfferDiscounts);
        }
        catch (ex) {
            next(ex);
        }
    };
    addProductsWithDiscountToSpecialOffer = async (req, res, next) => {
        try {
            const specialOfferId = new mongoose_1.Types.ObjectId(req.params.specialOfferId);
            let specialOfferDiscounts = await this.productService.addProductsWithDiscountToSpecialOffer(specialOfferId, req.body);
            return res.json(specialOfferDiscounts);
        }
        catch (ex) {
        }
    };
    getActiveSpecialOffers = async (req, res, next) => {
        try {
            const activeSpecialOffers = await this.discountService.getActiveSpecialOffers(true);
            return res.json(activeSpecialOffers);
        }
        catch (ex) {
            next(ex);
        }
    };
    //createCart = async (createCartRequest: CreateCartRequest): Promise<Cart> 
    createCart = async (req, res, next) => {
        try {
            //TODO: add middleware to harness email for user
            let userCart = await this.orderService.createCart(req.body);
            return res.json(userCart);
        }
        catch (ex) {
            next(ex);
        }
    };
    createBillboard = async (req, res, next) => {
        try {
            let reqBody = serialization_utility_1.default.deserializeJson(req.body.data);
            reqBody.img = this.convertReqFilesToUploadFiles(req, "mainImg")[0] ?? null;
            let billBoard = await this.billboardService.createBillBoard(reqBody);
            return res.json(billBoard);
        }
        catch (ex) {
            next(ex);
        }
    };
    updateBillboard = async (req, res, next) => {
        try {
            let { billboardId } = req.params;
            let updatedBillboard = await this.billboardService.updateBillBoard(billboardId, req.body);
            return res.json(updatedBillboard);
        }
        catch (ex) {
            next(ex);
        }
    };
    deleteBillboard = async (req, res, next) => {
        try {
            let { billboardId } = req.params;
            let updatedBillboard = await this.billboardService.deleteBillboard(billboardId);
            return res.json(updatedBillboard);
        }
        catch (ex) {
            next(ex);
        }
    };
    getActiveBillboards = async (req, res, next) => {
        try {
            let activeBillboads = await this.billboardService.getActiveBillboards();
            return res.json(activeBillboads);
        }
        catch (ex) {
            next(ex);
        }
    };
    getBillboard = async (req, res, next) => {
        try {
            let { billboardId } = req.params;
            let billboard = await this.billboardService.getBillboard(billboardId);
            return res.json(billboard);
        }
        catch (ex) {
            next(ex);
        }
    };
    searchBillboards = async (req, res, next) => {
        try {
            let billboards = await this.billboardService.search(req.query);
            return res.json(billboards);
        }
        catch (ex) {
            next(ex);
        }
    };
    createCatalogue = async (req, res, next) => {
        try {
            let reqBody = serialization_utility_1.default.deserializeJson(req.body.data);
            reqBody.mainImg = this.convertReqFilesToUploadFiles(req, `mainImg`)[0] ?? null;
            let createdCatalogue = await this.catalogueService.createCatalogue(reqBody);
            return res.json(createdCatalogue);
        }
        catch (ex) {
            next(ex);
        }
    };
    updateCatalogue = async (req, res, next) => {
        try {
            let reqBody = serialization_utility_1.default.deserializeJson(req.body.data);
            reqBody.mainImg = (this.convertReqFilesToUploadFiles(req, `mainImg`) ?? [])[0] ?? null;
            console.log('Imela');
            let updatedCatalogue = await this.catalogueService.updateCatalogue(req.params.catalogueId, reqBody);
            return res.json(updatedCatalogue);
        }
        catch (ex) {
            next(ex);
        }
    };
    featureCatalogues = async (req, res, next) => {
        try {
            console.log({ b: req.body });
            let updatedCatalogue = await this.catalogueService.featureCatalogues(req.body.catalogueIds, req.body.feature);
            return res.json(updatedCatalogue);
        }
        catch (ex) {
            next(ex);
        }
    };
    getCatalogue = async (req, res, next) => {
        try {
            let query = req.query;
            if (query.isFeatured) {
                query.isFeatured = req.query.isFeatured.toString().toLowerCase() === "true" ? true : false;
            }
            console.log({ query });
            let response = await this.catalogueService.getCatalogues(query);
            return res.json(response);
        }
        catch (ex) {
            next(ex);
        }
    };
    addProductsToCatalogue = async (req, res, next) => {
        try {
            let updatedCatalogue = await this.catalogueService.addProductsToCatalogue(req.body);
            return res.json(updatedCatalogue);
        }
        catch (ex) {
            next(ex);
        }
    };
    removeProductsFromCatalogue = async (req, res, next) => {
        try {
            let updatedCatalogue = await this.catalogueService.removeProductsFromCatalogue(req.body);
            return res.json(updatedCatalogue);
        }
        catch (ex) {
            next(ex);
        }
    };
    createBrand = async (req, res, next) => {
        try {
            let reqBody = serialization_utility_1.default.deserializeJson(req.body.data);
            reqBody.mainImg = this.convertReqFilesToUploadFiles(req, "mainImg")[0] ?? null;
            let createdBrand = await this.brandLogic.createBrand(reqBody);
            return res.json(createdBrand);
        }
        catch (ex) {
            next(ex);
        }
    };
    addProductsToBrand = async (req, res, next) => {
        try {
            let brandId = req.params.brandId;
            console.log("Iscabas");
            let addedProducts = await this.brandLogic.addProductsToBrand(brandId, req.body);
            return res.json(addedProducts);
        }
        catch (ex) {
            next(ex);
        }
    };
    // NOTE: UNREFINED
    completeOrder = async (req, res, next) => {
        try {
            let order = await this.orderService.completeOrder(req.body.cart, req.body.paymentId, req.body.user, req.body.address);
            return res.json(order);
        }
        catch (ex) {
            next(ex);
        }
    };
};
ShopController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(category_service_1.IICategoryService)),
    __param(1, (0, tsyringe_1.inject)(product_service_1.IIProductService)),
    __param(2, (0, tsyringe_1.inject)(discount_service_1.IIDiscountService)),
    __param(3, (0, tsyringe_1.inject)(order_service_1.IIOrderService)),
    __param(4, (0, tsyringe_1.inject)(billboard_service_1.IIBillboardService)),
    __param(5, (0, tsyringe_1.inject)(catalogue_service_1.IICatalogueService)),
    __param(6, (0, tsyringe_1.inject)(brand_logic_1.IIBrandLogic)),
    __param(7, (0, tsyringe_1.inject)(category_logic_1.IICategoryLogic)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object])
], ShopController);
exports.default = ShopController;
//# sourceMappingURL=shop_controller.js.map