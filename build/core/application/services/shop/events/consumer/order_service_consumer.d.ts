import IEventService from "../../../../../application/contract/services/events/event_service";
import IEventTracer from "../../../../../application/contract/observability/event_tracer";
import IOrderService from "../../../../../application/contract/services/shop/order_service";
import IOrderServiceConsumer from "../../../../../application/contract/services/events/shop/consumer/order_service_consumer";
export default class OrderServiceConsumer implements IOrderServiceConsumer {
    private readonly eventService;
    private readonly eventTracer;
    private readonly orderService;
    constructor(eventService: IEventService, eventTracer: IEventTracer, orderService: IOrderService);
    private newOrderCreatedEvent;
    listenForNewOrderCreateEvent: () => Promise<void>;
    listenForOrderEvents: () => Promise<void>;
}
