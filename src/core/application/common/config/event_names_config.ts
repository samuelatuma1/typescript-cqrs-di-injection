import { EventQueueSizeStrategyRetention } from "../../../domain/model/events/subscribe_event_options"
import { TimeUnit } from "../../../domain/model/utiliities/time_unit"

export default class EventNamesConfig{
    
    
    
    
    private static NewOrderCreated = 'ORDER_CREATED'
    private static NewOrderConsumerGroupName = `${this.NewOrderCreated}_CONSUMER_GROUP_ALPHA`
    private static NewOrderCreatedDeadLetterQueueName =   `${this.NewOrderCreated}_DEAD_LETTER_QUEUE`
    private static NewOrderCreatedConsumerName =   `${this.NewOrderCreated}_CONSUMER_GROUP_ALPHA`
    public static getConfigForNewOrderCreated = () => {
        return {
            queueName: this.NewOrderCreated,
            sizeStrategy: new EventQueueSizeStrategyRetention({unit: TimeUnit.days, duration: 30})
        }
    }

    public static getConfigForNewOrderCreatedSubscriber  = () =>  {
            return {
                queueName: this.NewOrderCreated,
                consumerGroupName: this.NewOrderConsumerGroupName,
                consumerName: this.NewOrderCreatedConsumerName,
                maxNumberOfEntries: 10,
                dlqQueueName: this.NewOrderCreatedDeadLetterQueueName,
                maxRetryCountBeforeDLQ: 3,
                dlqSizeStrategy: new EventQueueSizeStrategyRetention({duration: 30, unit: TimeUnit.days})
            }
        }

        
    private static NewReviewCreated = 'REVIEW_CREATED'
    private static NewReviewCreatedDeadLetterQueueName =   `${this.NewReviewCreated}_DEAD_LETTER_QUEUE`
    private static NewReviewConsumerGroupName = `${this.NewReviewCreated}_CONSUMER_GROUP_ALPHA`
    private static NewReviewCreatedConsumerName =   `${this.NewReviewCreated}_CONSUMER_GROUP_ALPHA`
    public static getConfigForNewReviewCreated = () => {
        return {
            queueName: this.NewReviewCreated,
            sizeStrategy: new EventQueueSizeStrategyRetention({unit: TimeUnit.days, duration: 30})
        }
    }

    public static getConfigForNewReviewCreatedSubscriber  = () =>  {
        return {
            queueName: this.NewReviewCreated,
            consumerGroupName: this.NewReviewConsumerGroupName,
            consumerName: this.NewReviewCreatedConsumerName,
            maxNumberOfEntries: 10,
            dlqQueueName: this.NewReviewCreatedDeadLetterQueueName,
            maxRetryCountBeforeDLQ: 3,
            dlqSizeStrategy: new EventQueueSizeStrategyRetention({duration: 30, unit: TimeUnit.days})
        }
    }
}