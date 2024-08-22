"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var product_service_1 = require("../../core/application/contract/services/shop/product_service");
var tsyringe_1 = require("tsyringe");
var base_controller_1 = require("./base_controller");
var serialization_utility_1 = require("../../core/application/common/utilities/serialization_utility");
var mongoose_1 = require("mongoose");
var ProductController = /** @class */ (function (_super) {
    __extends(ProductController, _super);
    function ProductController(productService) {
        var _this = _super.call(this) || this;
        _this.productService = productService;
        _this.createProduct = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var reqBody, createdProduct, ex_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        reqBody = serialization_utility_1["default"].deserializeJson(req.body.data);
                        reqBody.mainImg = (_a = this.convertReqFilesToUploadFiles(req, "mainImg")[0]) !== null && _a !== void 0 ? _a : null;
                        reqBody.otherMedia = this.convertReqFilesToUploadFiles(req, "otherMedia");
                        console.log({ reqBody: reqBody });
                        return [4 /*yield*/, this.productService.createProduct(reqBody)];
                    case 1:
                        createdProduct = _b.sent();
                        return [2 /*return*/, res.json(createdProduct)];
                    case 2:
                        ex_1 = _b.sent();
                        next(ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.updateProduct = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var productId, updatedProduct, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        productId = new mongoose_1.Types.ObjectId(req.params.productId);
                        return [4 /*yield*/, this.productService.updateProduct(productId, req.body)];
                    case 1:
                        updatedProduct = _a.sent();
                        return [2 /*return*/, res.json(updatedProduct)];
                    case 2:
                        ex_2 = _a.sent();
                        next(ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.getProduct = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var productId, product, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        productId = new mongoose_1.Types.ObjectId(req.params.productId);
                        return [4 /*yield*/, this.productService.getProduct(productId)];
                    case 1:
                        product = _a.sent();
                        return [2 /*return*/, res.json(product)];
                    case 2:
                        ex_3 = _a.sent();
                        next(ex_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.specialOffers = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var offerId, product, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        offerId = new mongoose_1.Types.ObjectId(req.params.offerId);
                        return [4 /*yield*/, this.productService.getProductsWithSpecialOffer(offerId)];
                    case 1:
                        product = _a.sent();
                        return [2 /*return*/, res.json(product)];
                    case 2:
                        ex_4 = _a.sent();
                        next(ex_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.addPackProduct = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var productId, reqBody, product, ex_5;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        productId = req.params.productId;
                        reqBody = serialization_utility_1["default"].deserializeJson(req.body.data);
                        reqBody.mainImg = (_a = this.convertReqFilesToUploadFiles(req, "mainImg")[0]) !== null && _a !== void 0 ? _a : null;
                        reqBody.otherMedia = this.convertReqFilesToUploadFiles(req, "otherMedia");
                        return [4 /*yield*/, this.productService.addPackProduct(productId, reqBody)];
                    case 1:
                        product = _b.sent();
                        return [2 /*return*/, res.json(product)];
                    case 2:
                        ex_5 = _b.sent();
                        next(ex_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.addPackProducts = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var productId, reqBody, imgs, i, img, j, productImg, product, ex_6;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        productId = req.params.productId;
                        reqBody = serialization_utility_1["default"].deserializeJson(req.body.data);
                        imgs = [];
                        for (i = 1; i <= 10; i++) {
                            img = (_a = this.convertReqFilesToUploadFiles(req, "mainImg" + i)) !== null && _a !== void 0 ? _a : [];
                            if (img === null || img === void 0 ? void 0 : img.length) {
                                imgs.push(img[0]);
                            }
                        }
                        for (j = 0; j < ((_b = reqBody.length) !== null && _b !== void 0 ? _b : 0); j++) {
                            productImg = (_c = imgs[j]) !== null && _c !== void 0 ? _c : null;
                            reqBody[j].mainImg = productImg;
                        }
                        return [4 /*yield*/, this.productService.addPackProducts(productId, reqBody)];
                    case 1:
                        product = _d.sent();
                        return [2 /*return*/, res.json(product)];
                    case 2:
                        ex_6 = _d.sent();
                        next(ex_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // public updatePackProduct = async (req: Request<{}>)
        _this.deletePackProduct = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var productId, packProductId, product, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        productId = req.params.productId;
                        packProductId = req.query.packProductId;
                        return [4 /*yield*/, this.productService.deletePackProduct(productId, packProductId)];
                    case 1:
                        product = _a.sent();
                        return [2 /*return*/, res.json(product)];
                    case 2:
                        ex_7 = _a.sent();
                        next(ex_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.updatePackProduct = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var productId, packProductId, reqBody, product, ex_8;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        productId = req.params.productId;
                        packProductId = req.query.packProductId;
                        console.log({ body: req.body });
                        reqBody = serialization_utility_1["default"].deserializeJson(req.body.data);
                        reqBody.mainImg = (_a = this.convertReqFilesToUploadFiles(req, "mainImg")[0]) !== null && _a !== void 0 ? _a : null;
                        reqBody.otherMedia = this.convertReqFilesToUploadFiles(req, "otherMedia");
                        return [4 /*yield*/, this.productService.updatePackProduct(productId, packProductId, reqBody)];
                    case 1:
                        product = _b.sent();
                        return [2 /*return*/, res.json(product)];
                    case 2:
                        ex_8 = _b.sent();
                        next(ex_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.bestSellers = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var query, page, pageSize, response, ex_9;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        query = req.query;
                        console.log("Here");
                        page = (_a = query.page) !== null && _a !== void 0 ? _a : 0;
                        pageSize = (_b = query.pageSize) !== null && _b !== void 0 ? _b : 0;
                        req.query.page = parseInt(page.toString());
                        req.query.pageSize = parseInt(pageSize.toString());
                        console.log({ query: req.query });
                        return [4 /*yield*/, this.productService.bestSellers(req.query)];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, res.json(response)];
                    case 2:
                        ex_9 = _c.sent();
                        next(ex_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    ProductController = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(product_service_1.IIProductService))
    ], ProductController);
    return ProductController;
}(base_controller_1["default"]));
exports["default"] = ProductController;
