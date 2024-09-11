import { IOrderServiceProducer } from "../../../contract/events/shop/producer/order_service_producer";
import IEventService from "../../../contract/events/event_service";
import OrderPlacedEventDTO from "../../../../domain/model/events/dto/order_placed_event_dto";
export default class OrderServiceProducer implements IOrderServiceProducer {
    private readonly eventService;
    constructor(eventService: IEventService);
    publishNewOrderCreatedEvent: (orderPlacedDTO: OrderPlacedEventDTO) => Promise<string | null>;
}
