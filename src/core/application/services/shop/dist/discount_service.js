"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var discount_repository_1 = require("../../../application/contract/data_access/shop/discount_repository");
var event_tracer_1 = require("../../../application/contract/observability/event_tracer");
var discount_1 = require("../../../domain/shop/entity/discount");
var mongoose_1 = require("mongoose");
var special_offer_1 = require("../../../domain/shop/entity/special_offer");
var special_offer_repository_1 = require("../../../application/contract/data_access/shop/special_offer_repository");
var date_utility_1 = require("../../../application/common/utilities/date_utility");
var DiscountService = /** @class */ (function () {
    function DiscountService(eventTracer, discountRepository, specialOfferRepository) {
        var _this = this;
        this.eventTracer = eventTracer;
        this.discountRepository = discountRepository;
        this.specialOfferRepository = specialOfferRepository;
        this.getDiscountById = function (id) { return __awaiter(_this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.discountRepository.getByIdAsync(new mongoose_1.Types.ObjectId(id))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.convertCreateDiscountRequestToDiscount = function (createDiscountRequest) {
            return new discount_1["default"](__assign({}, createDiscountRequest));
        };
        this.createDiscount = function (createDiscountRequest) { return __awaiter(_this, void 0, Promise, function () {
            var discount, savedDiscount, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.eventTracer.say("Creating Discount");
                        this.eventTracer.request = createDiscountRequest;
                        discount = this.convertCreateDiscountRequestToDiscount(createDiscountRequest);
                        return [4 /*yield*/, this.discountRepository.addAsync(discount)];
                    case 1:
                        savedDiscount = _a.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(savedDiscount);
                        return [2 /*return*/, discount];
                    case 2:
                        ex_1 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_1);
                        throw ex_1;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.createSpecialOffer = function (specialOfferRequest) { return __awaiter(_this, void 0, Promise, function () {
            var specialOffer, savedSpecialOfer, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.eventTracer.say("Creating Special Offer");
                        this.eventTracer.request = specialOfferRequest;
                        specialOffer = new special_offer_1["default"](specialOfferRequest);
                        return [4 /*yield*/, this.specialOfferRepository.addAsync(specialOffer)];
                    case 1:
                        savedSpecialOfer = _a.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(savedSpecialOfer);
                        return [2 /*return*/, savedSpecialOfer];
                    case 2:
                        ex_2 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_2);
                        throw ex_2;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getDiscountsInSpecialOffer = function (specialOfferId) { return __awaiter(_this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        specialOfferId = new mongoose_1.Types.ObjectId(specialOfferId);
                        return [4 /*yield*/, this.discountRepository.getAsync({ specialOfferid: specialOfferId })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.addDiscountsToSpecialOffer = function (specialOfferId, discountIds) { return __awaiter(_this, void 0, Promise, function () {
            var specialOffer, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        // find special offer
                        specialOfferId = new mongoose_1.Types.ObjectId(specialOfferId);
                        return [4 /*yield*/, this.specialOfferRepository.getByIdAsync(specialOfferId)];
                    case 1:
                        specialOffer = _a.sent();
                        if (!specialOffer) return [3 /*break*/, 4];
                        discountIds = discountIds.map(function (id) { return new mongoose_1.Types.ObjectId(id); });
                        return [4 /*yield*/, this.discountRepository.updateManyAsync({ _id: { $in: discountIds } }, {
                                specialOfferid: specialOffer._id,
                                validityStartDate: specialOffer.validityStartDate,
                                validityEndDate: specialOffer.validityEndDate
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.discountRepository.contains({ _id: discountIds })];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/, []];
                    case 5:
                        ex_3 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_3);
                        throw ex_3;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getActiveSpecialOffers = function (includeDiscounts) {
            if (includeDiscounts === void 0) { includeDiscounts = false; }
            return __awaiter(_this, void 0, Promise, function () {
                var dateToday, specialOffers, specialOffersIds, specialOfferDicts, _i, specialOffers_1, offer, allDiscountsWithSpecialOffers, _a, allDiscountsWithSpecialOffers_1, discount, specialOfferIdForDiscount;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            dateToday = date_utility_1["default"].getUTCNow();
                            return [4 /*yield*/, this.specialOfferRepository.getAsync({ validityStartDate: { $lte: dateToday }, validityEndDate: { $gte: dateToday } })];
                        case 1:
                            specialOffers = _b.sent();
                            if (!includeDiscounts) return [3 /*break*/, 3];
                            specialOffersIds = [];
                            specialOfferDicts = {};
                            for (_i = 0, specialOffers_1 = specialOffers; _i < specialOffers_1.length; _i++) {
                                offer = specialOffers_1[_i];
                                offer.discounts = []; // clear discount to remove possibly saved ObjectIds
                                specialOfferDicts[offer._id.toString()] = offer;
                                specialOffersIds.push(offer._id);
                            }
                            return [4 /*yield*/, this.discountRepository.contains({ specialOfferid: specialOffersIds })];
                        case 2:
                            allDiscountsWithSpecialOffers = _b.sent();
                            console.log({ allDiscountsWithSpecialOffers: allDiscountsWithSpecialOffers });
                            for (_a = 0, allDiscountsWithSpecialOffers_1 = allDiscountsWithSpecialOffers; _a < allDiscountsWithSpecialOffers_1.length; _a++) {
                                discount = allDiscountsWithSpecialOffers_1[_a];
                                specialOfferIdForDiscount = discount.specialOfferid.toString();
                                specialOfferDicts[specialOfferIdForDiscount].discounts.push(discount);
                            }
                            specialOffers = Object.values(specialOfferDicts);
                            _b.label = 3;
                        case 3: return [2 /*return*/, specialOffers];
                    }
                });
            });
        };
    }
    DiscountService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(event_tracer_1.IIEventTracer)),
        __param(1, tsyringe_1.inject(discount_repository_1.IIDiscountRepository)),
        __param(2, tsyringe_1.inject(special_offer_repository_1.IISpecialOfferRepository))
    ], DiscountService);
    return DiscountService;
}());
exports["default"] = DiscountService;
