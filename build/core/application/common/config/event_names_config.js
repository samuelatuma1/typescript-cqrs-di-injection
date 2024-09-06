"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subscribe_event_options_1 = require("../../../domain/model/events/subscribe_event_options");
const time_unit_1 = require("../../../domain/model/utiliities/time_unit");
class EventNamesConfig {
    static NewOrderCreated = 'NEW_ORDER_CREATED';
    static NewOrderCreatedConsumerGroupName = `${this.NewOrderCreated}_CONSUMER_GROUP_ALPHA`;
    static NewOrderCreatedConsumerName = `${this.NewOrderCreated}_CONSUMER_GROUP_ALPHA`;
    static DeadLetterQueueName = `${this.NewOrderCreated}_DEAD_LETTER_QUEUE`;
    static getConfigForNewOrderCreated = () => {
        return {
            queueName: this.NewOrderCreated,
            sizeStrategy: new subscribe_event_options_1.EventQueueSizeStrategyRetention({ unit: time_unit_1.TimeUnit.days, duration: 30 })
        };
    };
    static getConfigForNewOrderCreatedSubscriber = () => {
        return {
            queueName: this.NewOrderCreated,
            consumerGroupName: this.NewOrderCreatedConsumerGroupName,
            consumerName: this.NewOrderCreatedConsumerName,
            maxNumberOfEntries: 10,
            dlqQueueName: this.DeadLetterQueueName,
            maxRetryCountBeforeDLQ: 3,
            dlqSizeStrategy: new subscribe_event_options_1.EventQueueSizeStrategyRetention({ duration: 30, unit: time_unit_1.TimeUnit.days })
        };
    };
}
exports.default = EventNamesConfig;
//# sourceMappingURL=event_names_config.js.map