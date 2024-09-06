import { EventQueueSizeStrategyRetention } from "../../../domain/model/events/subscribe_event_options"
import { TimeUnit } from "../../../domain/model/utiliities/time_unit"

export default class EventNamesConfig{
    private static NewOrderCreated = 'NEW_ORDER_CREATED'
    private static NewOrderCreatedConsumerGroupName = `${this.NewOrderCreated}_CONSUMER_GROUP_ALPHA`
    private static NewOrderCreatedConsumerName =   `${this.NewOrderCreated}_CONSUMER_GROUP_ALPHA`
    private static DeadLetterQueueName =   `${this.NewOrderCreated}_DEAD_LETTER_QUEUE`
    public static getConfigForNewOrderCreated = () => {
        return {
            queueName: this.NewOrderCreated,
            sizeStrategy: new EventQueueSizeStrategyRetention({unit: TimeUnit.days, duration: 30})
        }
    }

    public static getConfigForNewOrderCreatedSubscriber  = () =>  {
            return {
                queueName: this.NewOrderCreated,
                consumerGroupName: this.NewOrderCreatedConsumerGroupName,
                consumerName: this.NewOrderCreatedConsumerName,
                maxNumberOfEntries: 10,
                dlqQueueName: this.DeadLetterQueueName,
                maxRetryCountBeforeDLQ: 3,
                dlqSizeStrategy: new EventQueueSizeStrategyRetention({duration: 30, unit: TimeUnit.days})
            }
        }
}