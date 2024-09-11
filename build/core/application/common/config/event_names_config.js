"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscribe_event_options_1 = require("../../../domain/model/events/subscribe_event_options");
const time_unit_1 = require("../../../domain/model/utiliities/time_unit");
class EventNamesConfig {
    static NewOrderCreated = 'ORDER_CREATED';
    static NewOrderConsumerGroupName = `${this.NewOrderCreated}_CONSUMER_GROUP_ALPHA`;
    static NewOrderCreatedDeadLetterQueueName = `${this.NewOrderCreated}_DEAD_LETTER_QUEUE`;
    static NewOrderCreatedConsumerName = `${this.NewOrderCreated}_CONSUMER_GROUP_ALPHA`;
    static getConfigForNewOrderCreated = () => {
        return {
            queueName: this.NewOrderCreated,
            sizeStrategy: new subscribe_event_options_1.EventQueueSizeStrategyRetention({ unit: time_unit_1.TimeUnit.days, duration: 30 })
        };
    };
    static getConfigForNewOrderCreatedSubscriber = () => {
        return {
            queueName: this.NewOrderCreated,
            consumerGroupName: this.NewOrderConsumerGroupName,
            consumerName: this.NewOrderCreatedConsumerName,
            maxNumberOfEntries: 10,
            dlqQueueName: this.NewOrderCreatedDeadLetterQueueName,
            maxRetryCountBeforeDLQ: 3,
            dlqSizeStrategy: new subscribe_event_options_1.EventQueueSizeStrategyRetention({ duration: 30, unit: time_unit_1.TimeUnit.days })
        };
    };
    static NewReviewCreated = 'REVIEW_CREATED';
    static NewReviewCreatedDeadLetterQueueName = `${this.NewReviewCreated}_DEAD_LETTER_QUEUE`;
    static NewReviewConsumerGroupName = `${this.NewReviewCreated}_CONSUMER_GROUP_ALPHA`;
    static NewReviewCreatedConsumerName = `${this.NewReviewCreated}_CONSUMER_GROUP_ALPHA`;
    static getConfigForNewReviewCreated = () => {
        return {
            queueName: this.NewReviewCreated,
            sizeStrategy: new subscribe_event_options_1.EventQueueSizeStrategyRetention({ unit: time_unit_1.TimeUnit.days, duration: 30 })
        };
    };
    static getConfigForNewReviewCreatedSubscriber = () => {
        return {
            queueName: this.NewReviewCreated,
            consumerGroupName: this.NewReviewConsumerGroupName,
            consumerName: this.NewReviewCreatedConsumerName,
            maxNumberOfEntries: 10,
            dlqQueueName: this.NewReviewCreatedDeadLetterQueueName,
            maxRetryCountBeforeDLQ: 3,
            dlqSizeStrategy: new subscribe_event_options_1.EventQueueSizeStrategyRetention({ duration: 30, unit: time_unit_1.TimeUnit.days })
        };
    };
}
exports.default = EventNamesConfig;
//# sourceMappingURL=event_names_config.js.map