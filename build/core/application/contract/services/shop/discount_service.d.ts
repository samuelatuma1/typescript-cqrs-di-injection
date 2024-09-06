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
import Discount from "../../../../domain/shop/entity/discount";
import { CreateDiscountRequest, SpecialOfferRequest } from "../../../../domain/shop/dto/requests/discount_request";
import { Types } from "mongoose";
import SpecialOffer from "../../../../domain/shop/entity/special_offer";
export default interface IDiscountService {
    createDiscount(createDiscountRequest: CreateDiscountRequest): Promise<Discount>;
    getDiscountById(id: Types.ObjectId): Promise<Discount>;
    createSpecialOffer(specialOfferRequest: SpecialOfferRequest): Promise<SpecialOffer>;
    addDiscountsToSpecialOffer(specialOfferId: Types.ObjectId | string, discountIds: Types.ObjectId[] | string[]): Promise<Discount[]>;
    getDiscountsInSpecialOffer(specialOfferId: Types.ObjectId | string): Promise<Discount[]>;
    getActiveSpecialOffers(includeDiscounts?: boolean): Promise<SpecialOffer[]>;
    getSpecialOffer(specialOfferId: Types.ObjectId | string): Promise<SpecialOffer>;
}
export declare const IIDiscountService = "IDiscountService";
