import Discount from "../../../../domain/shop/entity/discount";
import { CreateDiscountRequest, SpecialOfferRequest } from "../../../../domain/shop/dto/requests/discount_request";
import { Types } from "mongoose";
import SpecialOffer from "../../../../domain/shop/entity/special_offer";

export default interface IDiscountService{
    createDiscount (createDiscountRequest: CreateDiscountRequest): Promise<Discount>;
    getDiscountById(id: Types.ObjectId) : Promise<Discount>;
    createSpecialOffer (specialOfferRequest: SpecialOfferRequest): Promise<SpecialOffer>;

    addDiscountsToSpecialOffer (specialOfferId: Types.ObjectId | string, discountIds: Types.ObjectId[] | string[]): Promise<Discount[]>
    getDiscountsInSpecialOffer (specialOfferId: Types.ObjectId | string): Promise<Discount[]>
    getActiveSpecialOffers(includeDiscounts?: boolean): Promise<SpecialOffer[]>
    getSpecialOffer(specialOfferId: Types.ObjectId | string): Promise<SpecialOffer>
}

export const IIDiscountService = "IDiscountService";