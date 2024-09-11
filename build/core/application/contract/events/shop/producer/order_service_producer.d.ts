import OrderPlacedEventDTO from "../../../../../domain/model/events/dto/order_placed_event_dto";
export interface IOrderServiceProducer {
    publishNewOrderCreatedEvent(orderPlacedDTO: OrderPlacedEventDTO): Promise<string | null>;
}
export declare const IIOrderServiceProducer = "IOrderServiceProducer";
