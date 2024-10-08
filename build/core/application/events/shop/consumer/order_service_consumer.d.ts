import IEventService from "../../../contract/events/event_service";
import IEventTracer from "../../../contract/observability/event_tracer";
import IOrderService from "../../../contract/services/shop/order_service";
import IOrderServiceConsumer from "../../../contract/events/shop/consumer/order_service_consumer";
export default class OrderServiceConsumer implements IOrderServiceConsumer {
    private readonly eventService;
    private readonly eventTracer;
    private readonly orderService;
    constructor(eventService: IEventService, eventTracer: IEventTracer, orderService: IOrderService);
    private newOrderCreatedEvent;
    listenForNewOrderCreateEvent: () => Promise<void>;
    listenForOrderEvents: () => Promise<void>;
}
