import OrderPlacedEventDTO from "../../../../../domain/model/events/dto/order_placed_event_dto";
import SerializationUtility from "../../../../../application/common/utilities/serialization_utility";
import IEventService, { IIEventService } from "../../../../../application/contract/services/events/event_service";
import { inject, injectable } from "tsyringe";
import IEventTracer, { IIEventTracer } from "../../../../../application/contract/observability/event_tracer";
import IOrderService, { IIOrderService } from "../../../../../application/contract/services/shop/order_service";
import EventNamesConfig from "../../../../../application/common/config/event_names_config";
import IOrderServiceConsumer from "../../../../../application/contract/services/events/shop/consumer/order_service_consumer";



@injectable()
export default class OrderServiceConsumer implements IOrderServiceConsumer{
    public constructor(
        @inject(IIEventService) private readonly eventService: IEventService,
        @inject(IIEventTracer) private readonly eventTracer: IEventTracer,
        @inject(IIOrderService) private readonly orderService: IOrderService
    ){

    }

    private newOrderCreatedEvent = async (message: any, messageId: string): Promise<boolean> => {
        try{
            // deconstruct message
            
            this.eventTracer.say(`NewOrderCreatedEvent for id: ${messageId}`)
            this.eventTracer.request = message;
            message = message as {[key: string]: string}
            console.log({message})
            let orderPlacedDTO = SerializationUtility.deserializeJson<OrderPlacedEventDTO>(message.data)
            let isOrderEventHandled = await this.orderService.handleOrderCreatedEvent(orderPlacedDTO);

            this.eventTracer.isSuccessWithMessage(`Event handler returned ${isOrderEventHandled}`)
            return isOrderEventHandled
            
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`)
            return false;
        }
        
    } 

    public listenForNewOrderCreateEvent = async (): Promise<void> => {
        let newOrderListenConfig = EventNamesConfig.getConfigForNewOrderCreatedSubscriber();
        await this.eventService.subscribeToQueue({
            queueName: newOrderListenConfig.queueName,
            consumerGroupName: newOrderListenConfig.consumerGroupName,
            consumerName: newOrderListenConfig.consumerName,
            maxNumberOfEntries: newOrderListenConfig.maxNumberOfEntries,
            messageHandler: this.newOrderCreatedEvent,
            saveFailedProcessesToDeadLetterQueue: {
                deadLetterQueueName: newOrderListenConfig.dlqQueueName,
                maxReprocessRetry: newOrderListenConfig.maxRetryCountBeforeDLQ,
                sizeStrategy: newOrderListenConfig.dlqSizeStrategy
            }
        })
    }


    public listenForOrderEvents = async (): Promise<void> => {
        await this.listenForNewOrderCreateEvent();
    }
}