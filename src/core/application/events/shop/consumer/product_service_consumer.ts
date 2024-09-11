import SerializationUtility from "../../../common/utilities/serialization_utility";
import IEventService, { IIEventService } from "../../../contract/events/event_service";
import { inject, injectable } from "tsyringe";
import IEventTracer, { IIEventTracer } from "../../../contract/observability/event_tracer";
import EventNamesConfig from "../../../common/config/event_names_config";
import IProductLogic, { IIProductLogic } from "../../../contract/logic/shop/product_logic";
import ReviewCreatedEventDTO from "../../../../domain/model/events/review_created_event_dto";
import IProductServiceConsumer from "../../../contract/events/shop/consumer/product_service_consumer";



@injectable()
export default class ProductServiceConsumer implements IProductServiceConsumer{
    public constructor(
        @inject(IIEventService) private readonly eventService: IEventService,
        @inject(IIEventTracer) private readonly eventTracer: IEventTracer,
        @inject(IIProductLogic) private readonly productLogic: IProductLogic
    ){

    }

    private newReviewCreatedEvent = async (message: any, messageId: string): Promise<boolean> => {
        try{
            // deconstruct message
            
            this.eventTracer.say(`NewReviewCreatedEvent for id: ${messageId}`)
            this.eventTracer.request = message;
            message = message as {[key: string]: string}
            console.log({message})
            let reviewCreatedEventDTO = SerializationUtility.deserializeJson<ReviewCreatedEventDTO>(message.data)
            let isReviewCreatedEventHandled = await this.productLogic.handleReviewCreatedEvent(reviewCreatedEventDTO);

            this.eventTracer.isSuccessWithMessage(`Event handler returned ${isReviewCreatedEventHandled}`)
            return isReviewCreatedEventHandled
            
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`)
            return false;
        }
        
    } 

    public listenFoNewReviewCreatedEvent = async (): Promise<void> => {
        let newReviewListenConfig = EventNamesConfig.getConfigForNewReviewCreatedSubscriber();
        await this.eventService.subscribeToQueue({
            queueName: newReviewListenConfig.queueName,
            consumerGroupName: newReviewListenConfig.consumerGroupName,
            consumerName: newReviewListenConfig.consumerName,
            maxNumberOfEntries: newReviewListenConfig.maxNumberOfEntries,
            messageHandler: this.newReviewCreatedEvent,
            saveFailedProcessesToDeadLetterQueue: {
                deadLetterQueueName: newReviewListenConfig.dlqQueueName,
                maxReprocessRetry: newReviewListenConfig.maxRetryCountBeforeDLQ,
                sizeStrategy: newReviewListenConfig.dlqSizeStrategy
            }
        })
    }
}