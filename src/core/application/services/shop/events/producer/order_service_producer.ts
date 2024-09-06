import { inject, injectable } from "tsyringe";
import { IOrderServiceProducer } from "../../../../contract/services/events/shop/producer/order_service_producer";
import IEventService, { IIEventService } from "../../../../../application/contract/services/events/event_service";
import OrderPlacedEventDTO from "../../../../../domain/model/events/dto/order_placed_event_dto";
import EventNamesConfig from "../../../../../application/common/config/event_names_config";

@injectable()
export default class OrderServiceProducer implements IOrderServiceProducer{
    public constructor(@inject(IIEventService) private readonly eventService: IEventService){

    }

    public publishNewOrderCreatedEvent = async (orderPlacedDTO: OrderPlacedEventDTO): Promise<string | null> => {
        const configForNewOrder = EventNamesConfig.getConfigForNewOrderCreated()
        return await this.eventService.publishToQueue(configForNewOrder.queueName, orderPlacedDTO, configForNewOrder.sizeStrategy)
    }
}