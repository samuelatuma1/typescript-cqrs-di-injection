import IEventService from "../../../contract/events/event_service";
import IEventTracer from "../../../contract/observability/event_tracer";
import IProductLogic from "../../../contract/logic/shop/product_logic";
import IProductServiceConsumer from "../../../contract/events/shop/consumer/product_service_consumer";
export default class ProductServiceConsumer implements IProductServiceConsumer {
    private readonly eventService;
    private readonly eventTracer;
    private readonly productLogic;
    constructor(eventService: IEventService, eventTracer: IEventTracer, productLogic: IProductLogic);
    private newReviewCreatedEvent;
    listenFoNewReviewCreatedEvent: () => Promise<void>;
}
