import { EventQueueSizeStrategyRetention } from "../../../domain/model/events/subscribe_event_options";
export default class EventNamesConfig {
    private static NewOrderCreated;
    private static NewOrderCreatedConsumerGroupName;
    private static NewOrderCreatedConsumerName;
    private static DeadLetterQueueName;
    static getConfigForNewOrderCreated: () => {
        queueName: string;
        sizeStrategy: EventQueueSizeStrategyRetention;
    };
    static getConfigForNewOrderCreatedSubscriber: () => {
        queueName: string;
        consumerGroupName: string;
        consumerName: string;
        maxNumberOfEntries: number;
        dlqQueueName: string;
        maxRetryCountBeforeDLQ: number;
        dlqSizeStrategy: EventQueueSizeStrategyRetention;
    };
}
