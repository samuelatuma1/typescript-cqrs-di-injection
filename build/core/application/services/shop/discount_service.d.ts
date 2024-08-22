/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { CreateDiscountRequest, SpecialOfferRequest } from "../../../domain/shop/dto/requests/discount_request";
import IDiscountService from "../../../application/contract/services/shop/discount_service";
import IDiscountRepository from "../../../application/contract/data_access/shop/discount_repository";
import IEventTracer from "../../../application/contract/observability/event_tracer";
import Discount from "../../../domain/shop/entity/discount";
import { Types } from "mongoose";
import SpecialOffer from "../../../domain/shop/entity/special_offer";
import ISpecialOfferRepository from "../../../application/contract/data_access/shop/special_offer_repository";
export default class DiscountService implements IDiscountService {
    private readonly eventTracer;
    private readonly discountRepository;
    private readonly specialOfferRepository;
    constructor(eventTracer: IEventTracer, discountRepository: IDiscountRepository, specialOfferRepository: ISpecialOfferRepository);
    getDiscountById: (id: Types.ObjectId) => Promise<Discount>;
    convertCreateDiscountRequestToDiscount: (createDiscountRequest: CreateDiscountRequest) => Discount;
    createDiscount: (createDiscountRequest: CreateDiscountRequest) => Promise<Discount>;
    createSpecialOffer: (specialOfferRequest: SpecialOfferRequest) => Promise<SpecialOffer>;
    getDiscountsInSpecialOffer: (specialOfferId: Types.ObjectId | string) => Promise<Discount[]>;
    getSpecialOffer: (specialOfferId: Types.ObjectId | string) => Promise<SpecialOffer>;
    addDiscountsToSpecialOffer: (specialOfferId: Types.ObjectId | string, discountIds: Types.ObjectId[] | string[]) => Promise<Discount[]>;
    getActiveSpecialOffers: (includeDiscounts?: boolean) => Promise<SpecialOffer[]>;
}
