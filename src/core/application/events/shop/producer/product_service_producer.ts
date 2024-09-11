import { inject, injectable } from "tsyringe";
import { IOrderServiceProducer } from "../../../contract/events/shop/producer/order_service_producer";
import IEventService, { IIEventService } from "../../../contract/events/event_service";
import OrderPlacedEventDTO from "../../../../domain/model/events/dto/order_placed_event_dto";
import EventNamesConfig from "../../../common/config/event_names_config";
import { Types } from "mongoose";
import IProductServiceProducer from "../../../contract/events/shop/producer/product_service_producer";
import ReviewCreatedEventDTO from "../../../../domain/model/events/review_created_event_dto";





@injectable()
export default class ProductServiceProducer implements IProductServiceProducer{
    public constructor(@inject(IIEventService) private readonly eventService: IEventService){

    }
    public publishReviewCreated = async (reviewCreatedEventDTO: ReviewCreatedEventDTO): Promise<string | null> => {
        let reviewQueueConfig = EventNamesConfig.getConfigForNewReviewCreated()
        return await this.eventService.publishToQueue(reviewQueueConfig.queueName, reviewCreatedEventDTO, reviewQueueConfig.sizeStrategy)
    }
}