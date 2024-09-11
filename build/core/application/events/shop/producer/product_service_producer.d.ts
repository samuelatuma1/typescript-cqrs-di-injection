import IEventService from "../../../contract/events/event_service";
import IProductServiceProducer from "../../../contract/events/shop/producer/product_service_producer";
import ReviewCreatedEventDTO from "../../../../domain/model/events/review_created_event_dto";
export default class ProductServiceProducer implements IProductServiceProducer {
    private readonly eventService;
    constructor(eventService: IEventService);
    publishReviewCreated: (reviewCreatedEventDTO: ReviewCreatedEventDTO) => Promise<string | null>;
}
