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
var tsyringe_1 = require("tsyringe");
var base_controller_1 = require("./base_controller");
var serialization_utility_1 = require("../../core/application/common/utilities/serialization_utility");
var category_service_1 = require("../../core/application/contract/services/shop/category_service");
var mongoose_1 = require("mongoose");
var product_service_1 = require("../../core/application/contract/services/shop/product_service");
var discount_service_1 = require("../../core/application/contract/services/shop/discount_service");
var order_service_1 = require("../../core/application/contract/services/shop/order_service");
var billboard_service_1 = require("../../core/application/contract/services/shop/billboard_service");
var ShopController = /** @class */ (function (_super) {
    __extends(ShopController, _super);
    function ShopController(categoryService, productService, discountService, orderService, billboardService) {
        var _this = _super.call(this) || this;
        _this.categoryService = categoryService;
        _this.productService = productService;
        _this.discountService = discountService;
        _this.orderService = orderService;
        _this.billboardService = billboardService;
        _this.createCategory = function (req, res, next) { return __awaiter(_this, void 0, Promise, function () {
            var data, categoryDTO, createdCategory, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = req.body.data;
                        categoryDTO = serialization_utility_1["default"].deserializeJson(data);
                        categoryDTO.img = this.convertReqFileToUploadFile(req);
                        return [4 /*yield*/, this.categoryService.createCategory(categoryDTO)];
                    case 1:
                        createdCategory = _a.sent();
                        res.json(createdCategory);
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        next(ex_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.addFiltersToCategory = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var categoryId, data, categoryWithUpdatedFilters, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        categoryId = new mongoose_1.Types.ObjectId(req.params.categoryId);
                        data = req.body;
                        return [4 /*yield*/, this.categoryService.addFiltersToCategory(categoryId, data)];
                    case 1:
                        categoryWithUpdatedFilters = _a.sent();
                        return [2 /*return*/, res.json(categoryWithUpdatedFilters)];
                    case 2:
                        ex_2 = _a.sent();
                        next(ex_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.deleteFilters = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var categoryId, filterIds, categoryWithoutDeletedFilters, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        categoryId = new mongoose_1.Types.ObjectId(req.params.categoryId);
                        filterIds = req.body.map(function (id) { return new mongoose_1.Types.ObjectId(id); });
                        return [4 /*yield*/, this.categoryService.deleteFilters(categoryId, filterIds)];
                    case 1:
                        categoryWithoutDeletedFilters = _a.sent();
                        return [2 /*return*/, res.json(categoryWithoutDeletedFilters)];
                    case 2:
                        ex_3 = _a.sent();
                        next(ex_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.updateFilter = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var categoryId, categoryWithUpdatedFilter, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        categoryId = new mongoose_1.Types.ObjectId(req.params.categoryId);
                        return [4 /*yield*/, this.categoryService.updateFilter(categoryId, req.body)];
                    case 1:
                        categoryWithUpdatedFilter = _a.sent();
                        return [2 /*return*/, res.json(categoryWithUpdatedFilter)];
                    case 2:
                        ex_4 = _a.sent();
                        next(ex_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.getCategory = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var categoryId, filters, enrichedCategory, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        categoryId = new mongoose_1.Types.ObjectId(req.params.categoryId);
                        filters = req.query;
                        return [4 /*yield*/, this.productService.getCategoryEnriched(categoryId, filters)];
                    case 1:
                        enrichedCategory = _a.sent();
                        return [2 /*return*/, res.json(enrichedCategory)];
                    case 2:
                        ex_5 = _a.sent();
                        next(ex_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.createDiscount = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var discount, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.discountService.createDiscount(req.body)];
                    case 1:
                        discount = _a.sent();
                        return [2 /*return*/, res.json(discount)];
                    case 2:
                        ex_6 = _a.sent();
                        next(ex_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.addDiscount = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var queryParams, addedDiscountForProduct, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryParams = req.query;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.productService.applyDiscount(queryParams.productId, queryParams.discountId)];
                    case 2:
                        addedDiscountForProduct = _a.sent();
                        return [2 /*return*/, res.json(addedDiscountForProduct)];
                    case 3:
                        ex_7 = _a.sent();
                        next(ex_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.createSpecialOffer = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var specialOffer, ex_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.discountService.createSpecialOffer(req.body)];
                    case 1:
                        specialOffer = _a.sent();
                        return [2 /*return*/, res.json(specialOffer)];
                    case 2:
                        ex_8 = _a.sent();
                        next(ex_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.addDiscountsToSpecialOffer = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var specialOfferId, specialOfferDiscounts, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        specialOfferId = new mongoose_1.Types.ObjectId(req.params.specialOfferId);
                        return [4 /*yield*/, this.discountService.addDiscountsToSpecialOffer(specialOfferId, req.body)];
                    case 1:
                        specialOfferDiscounts = _a.sent();
                        return [2 /*return*/, res.json(specialOfferDiscounts)];
                    case 2:
                        ex_9 = _a.sent();
                        next(ex_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.getActiveSpecialOffers = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var activeSpecialOffers, ex_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.discountService.getActiveSpecialOffers(true)];
                    case 1:
                        activeSpecialOffers = _a.sent();
                        return [2 /*return*/, res.json(activeSpecialOffers)];
                    case 2:
                        ex_10 = _a.sent();
                        next(ex_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        //createCart = async (createCartRequest: CreateCartRequest): Promise<Cart> 
        _this.createCart = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userCart, ex_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.orderService.createCart(req.body)];
                    case 1:
                        userCart = _a.sent();
                        return [2 /*return*/, res.json(userCart)];
                    case 2:
                        ex_11 = _a.sent();
                        next(ex_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.createBillboard = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var billBoard, ex_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.billboardService.createBillBoard(req.body)];
                    case 1:
                        billBoard = _a.sent();
                        return [2 /*return*/, res.json(billBoard)];
                    case 2:
                        ex_12 = _a.sent();
                        next(ex_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.updateBillboard = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var billboardId, updatedBillboard, ex_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        billboardId = req.params.billboardId;
                        return [4 /*yield*/, this.billboardService.updateBillBoard(billboardId, req.body)];
                    case 1:
                        updatedBillboard = _a.sent();
                        return [2 /*return*/, res.json(updatedBillboard)];
                    case 2:
                        ex_13 = _a.sent();
                        next(ex_13);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.deleteBillboard = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var billboardId, updatedBillboard, ex_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        billboardId = req.params.billboardId;
                        return [4 /*yield*/, this.billboardService.deleteBillboard(billboardId)];
                    case 1:
                        updatedBillboard = _a.sent();
                        return [2 /*return*/, res.json(updatedBillboard)];
                    case 2:
                        ex_14 = _a.sent();
                        next(ex_14);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.getActiveBillboards = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var activeBillboads, ex_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.billboardService.getActiveBillboards()];
                    case 1:
                        activeBillboads = _a.sent();
                        return [2 /*return*/, res.json(activeBillboads)];
                    case 2:
                        ex_15 = _a.sent();
                        next(ex_15);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.getBillboard = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var billboardId, billboard, ex_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        billboardId = req.params.billboardId;
                        return [4 /*yield*/, this.billboardService.getBillboard(billboardId)];
                    case 1:
                        billboard = _a.sent();
                        return [2 /*return*/, res.json(billboard)];
                    case 2:
                        ex_16 = _a.sent();
                        next(ex_16);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.searchBillboards = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var billboards, ex_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.billboardService.search(req.query)];
                    case 1:
                        billboards = _a.sent();
                        return [2 /*return*/, res.json(billboards)];
                    case 2:
                        ex_17 = _a.sent();
                        next(ex_17);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    ShopController = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(category_service_1.IICategoryService)),
        __param(1, tsyringe_1.inject(product_service_1.IIProductService)),
        __param(2, tsyringe_1.inject(discount_service_1.IIDiscountService)),
        __param(3, tsyringe_1.inject(order_service_1.IIOrderService)),
        __param(4, tsyringe_1.inject(billboard_service_1.IIBillboardService))
    ], ShopController);
    return ShopController;
}(base_controller_1["default"]));
exports["default"] = ShopController;
