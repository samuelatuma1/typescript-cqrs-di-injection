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
const discount_repository_1 = require("../../../application/contract/data_access/shop/discount_repository");
const event_tracer_1 = require("../../../application/contract/observability/event_tracer");
const discount_1 = __importDefault(require("../../../domain/shop/entity/discount"));
const mongoose_1 = require("mongoose");
const special_offer_1 = __importDefault(require("../../../domain/shop/entity/special_offer"));
const special_offer_repository_1 = require("../../../application/contract/data_access/shop/special_offer_repository");
const date_utility_1 = __importDefault(require("../../../application/common/utilities/date_utility"));
let DiscountService = class DiscountService {
    eventTracer;
    discountRepository;
    specialOfferRepository;
    constructor(eventTracer, discountRepository, specialOfferRepository) {
        this.eventTracer = eventTracer;
        this.discountRepository = discountRepository;
        this.specialOfferRepository = specialOfferRepository;
    }
    getDiscountById = async (id) => {
        return await this.discountRepository.getByIdAsync(new mongoose_1.Types.ObjectId(id));
    };
    convertCreateDiscountRequestToDiscount = (createDiscountRequest) => {
        return new discount_1.default({ ...createDiscountRequest });
    };
    createDiscount = async (createDiscountRequest) => {
        try {
            this.eventTracer.say(`Creating Discount`);
            this.eventTracer.request = createDiscountRequest;
            const discount = this.convertCreateDiscountRequestToDiscount(createDiscountRequest);
            const savedDiscount = await this.discountRepository.addAsync(discount);
            this.eventTracer.isSuccessWithResponseAndMessage(savedDiscount);
            return discount;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    createSpecialOffer = async (specialOfferRequest) => {
        try {
            this.eventTracer.say(`Creating Special Offer`);
            this.eventTracer.request = specialOfferRequest;
            const specialOffer = new special_offer_1.default(specialOfferRequest);
            const savedSpecialOfer = await this.specialOfferRepository.addAsync(specialOffer);
            this.eventTracer.isSuccessWithResponseAndMessage(savedSpecialOfer);
            return savedSpecialOfer;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    getDiscountsInSpecialOffer = async (specialOfferId) => {
        specialOfferId = new mongoose_1.Types.ObjectId(specialOfferId);
        return await this.discountRepository.getAsync({ specialOfferid: specialOfferId });
    };
    getSpecialOffer = async (specialOfferId) => {
        specialOfferId = new mongoose_1.Types.ObjectId(specialOfferId);
        return await this.specialOfferRepository.getByIdAsync(specialOfferId);
    };
    addDiscountsToSpecialOffer = async (specialOfferId, discountIds) => {
        try {
            // find special offer
            const specialOffer = await this.getSpecialOffer(specialOfferId);
            if (specialOffer) {
                discountIds = discountIds.map(id => new mongoose_1.Types.ObjectId(id));
                await this.discountRepository.updateManyAsync({ _id: { $in: discountIds } }, {
                    specialOfferid: specialOffer._id,
                    validityStartDate: specialOffer.validityStartDate,
                    validityEndDate: specialOffer.validityEndDate
                });
                return await this.discountRepository.contains({ _id: discountIds });
            }
            return [];
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    getActiveSpecialOffers = async (includeDiscounts = false) => {
        const dateToday = date_utility_1.default.getUTCNow();
        var specialOffers = await this.specialOfferRepository.getAsync({ validityStartDate: { $lte: dateToday }, validityEndDate: { $gte: dateToday } });
        if (includeDiscounts) {
            const specialOffersIds = [];
            const specialOfferDicts = {};
            for (let offer of specialOffers) {
                offer.discounts = []; // clear discount to remove possibly saved ObjectIds
                specialOfferDicts[offer._id.toString()] = offer;
                specialOffersIds.push(offer._id);
            }
            const allDiscountsWithSpecialOffers = await this.discountRepository.contains({ specialOfferid: specialOffersIds });
            console.log({ allDiscountsWithSpecialOffers });
            for (let discount of allDiscountsWithSpecialOffers) {
                const specialOfferIdForDiscount = discount.specialOfferid.toString();
                specialOfferDicts[specialOfferIdForDiscount].discounts.push(discount);
            }
            specialOffers = Object.values(specialOfferDicts);
        }
        return specialOffers;
    };
};
DiscountService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __param(1, (0, tsyringe_1.inject)(discount_repository_1.IIDiscountRepository)),
    __param(2, (0, tsyringe_1.inject)(special_offer_repository_1.IISpecialOfferRepository)),
    __metadata("design:paramtypes", [Object, Object, Object])
], DiscountService);
exports.default = DiscountService;
//# sourceMappingURL=discount_service.js.map