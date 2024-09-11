import { EventQueueSizeStrategyRetention } from "../../../domain/model/events/subscribe_event_options";
export default class EventNamesConfig {
    private static NewOrderCreated;
    private static NewOrderConsumerGroupName;
    private static NewOrderCreatedDeadLetterQueueName;
    private static NewOrderCreatedConsumerName;
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
    private static NewReviewCreated;
    private static NewReviewCreatedDeadLetterQueueName;
    private static NewReviewConsumerGroupName;
    private static NewReviewCreatedConsumerName;
    static getConfigForNewReviewCreated: () => {
        queueName: string;
        sizeStrategy: EventQueueSizeStrategyRetention;
    };
    static getConfigForNewReviewCreatedSubscriber: () => {
        queueName: string;
        consumerGroupName: string;
        consumerName: string;
        maxNumberOfEntries: number;
        dlqQueueName: string;
        maxRetryCountBeforeDLQ: number;
        dlqSizeStrategy: EventQueueSizeStrategyRetention;
    };
}
