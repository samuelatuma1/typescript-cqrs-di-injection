import { CreateDiscountRequest, SpecialOfferRequest } from "../../../domain/shop/dto/requests/discount_request";
import IDiscountService from "../../../application/contract/services/shop/discount_service";
import { inject, injectable } from "tsyringe";
import IDiscountRepository, { IIDiscountRepository } from "../../../application/contract/data_access/shop/discount_repository";
import IEventTracer, { IIEventTracer } from "../../../application/contract/observability/event_tracer";
import Discount from "../../../domain/shop/entity/discount";
import { Types } from "mongoose";
import SpecialOffer from "../../../domain/shop/entity/special_offer";
import ISpecialOfferRepository, { IISpecialOfferRepository } from "../../../application/contract/data_access/shop/special_offer_repository";
import DateUtility from "../../../application/common/utilities/date_utility";
import ObjectUtility from "core/application/common/utilities/object_utility";

@injectable()
export default class DiscountService implements IDiscountService {
    public constructor(
        @inject(IIEventTracer)private readonly eventTracer: IEventTracer,
        @inject(IIDiscountRepository)private readonly discountRepository: IDiscountRepository,
        @inject(IISpecialOfferRepository) private readonly specialOfferRepository: ISpecialOfferRepository
    ){
        
    }
    getDiscountById = async (id: Types.ObjectId): Promise<Discount> => {
        return await this.discountRepository.getByIdAsync(new Types.ObjectId(id));
    }
    convertCreateDiscountRequestToDiscount = (createDiscountRequest: CreateDiscountRequest): Discount => {
        return new Discount({...createDiscountRequest});
    }
    createDiscount = async (createDiscountRequest: CreateDiscountRequest): Promise<Discount> => {
        try{
            this.eventTracer.say(`Creating Discount`);
            this.eventTracer.request = createDiscountRequest;
            const discount = this.convertCreateDiscountRequestToDiscount(createDiscountRequest);
            const savedDiscount = await this.discountRepository.addAsync(discount);
            this.eventTracer.isSuccessWithResponseAndMessage(savedDiscount);
            return discount;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }

    createSpecialOffer = async (specialOfferRequest: SpecialOfferRequest): Promise<SpecialOffer> => {
        try{
            this.eventTracer.say(`Creating Special Offer`);
            this.eventTracer.request = specialOfferRequest;
            const specialOffer = new SpecialOffer(specialOfferRequest);
            const savedSpecialOfer = await this.specialOfferRepository.addAsync(specialOffer);
            this.eventTracer.isSuccessWithResponseAndMessage(savedSpecialOfer);
            return savedSpecialOfer;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }

    

    getDiscountsInSpecialOffer = async (specialOfferId: Types.ObjectId | string): Promise<Discount[]> => {
        specialOfferId = new Types.ObjectId(specialOfferId);
        return await this.discountRepository.getAsync({specialOfferid: specialOfferId});
    }

    addDiscountsToSpecialOffer = async (specialOfferId: Types.ObjectId | string, discountIds: Types.ObjectId[] | string[]): Promise<Discount[]> => {
        try{
            // find special offer
            specialOfferId = new Types.ObjectId(specialOfferId);
            const specialOffer = await this.specialOfferRepository.getByIdAsync(specialOfferId);
            if(specialOffer){
                discountIds = discountIds.map(id => new Types.ObjectId(id));
                await this.discountRepository.updateManyAsync({_id: {$in: discountIds}}, {
                    specialOfferid: specialOffer._id,
                    validityStartDate: specialOffer.validityStartDate,
                    validityEndDate: specialOffer.validityEndDate
                })
                return await this.discountRepository.contains({_id: discountIds})
            }
            return [];
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }

    getActiveSpecialOffers = async (includeDiscounts: boolean = false): Promise<SpecialOffer[]> => {
        const dateToday: Date = DateUtility.getUTCNow();
        var specialOffers = await this.specialOfferRepository.getAsync({validityStartDate: {$lte: dateToday}, validityEndDate: {$gte: dateToday}});
        if(includeDiscounts){
            const specialOffersIds: Types.ObjectId[] = [];
            const specialOfferDicts: {[key: string]: SpecialOffer} = {};
            for(let offer of specialOffers){
                offer.discounts = [] as Discount[]; // clear discount to remove possibly saved ObjectIds
                specialOfferDicts[offer._id.toString()] = offer;

                specialOffersIds.push(offer._id);
            }
            const allDiscountsWithSpecialOffers = await this.discountRepository.contains({specialOfferid: specialOffersIds});
            console.log({allDiscountsWithSpecialOffers})
            for(let discount of allDiscountsWithSpecialOffers){
                const specialOfferIdForDiscount = discount.specialOfferid.toString();
                (specialOfferDicts[specialOfferIdForDiscount].discounts as Discount[]).push(discount);

            }

            specialOffers = Object.values(specialOfferDicts);
        }
        return specialOffers;
    }
   
}

