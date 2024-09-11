"use strict";
var _this = this;
exports.__esModule = true;
var subscribe_event_options_1 = require("../../../domain/model/events/subscribe_event_options");
var time_unit_1 = require("../../../domain/model/utiliities/time_unit");
var EventNamesConfig = /** @class */ (function () {
    function EventNamesConfig() {
    }
    EventNamesConfig.NewOrderCreated = 'ORDER_CREATED';
    EventNamesConfig.NewOrderConsumerGroupName = this.NewOrderCreated + "_CONSUMER_GROUP_ALPHA";
    EventNamesConfig.NewOrderCreatedDeadLetterQueueName = this.NewOrderCreated + "_DEAD_LETTER_QUEUE";
    EventNamesConfig.NewOrderCreatedConsumerName = this.NewOrderCreated + "_CONSUMER_GROUP_ALPHA";
    EventNamesConfig.getConfigForNewOrderCreated = function () {
        return {
            queueName: _this.NewOrderCreated,
            sizeStrategy: new subscribe_event_options_1.EventQueueSizeStrategyRetention({ unit: time_unit_1.TimeUnit.days, duration: 30 })
        };
    };
    EventNamesConfig.getConfigForNewOrderCreatedSubscriber = function () {
        return {
            queueName: _this.NewOrderCreated,
            consumerGroupName: _this.NewOrderConsumerGroupName,
            consumerName: _this.NewOrderCreatedConsumerName,
            maxNumberOfEntries: 10,
            dlqQueueName: _this.NewOrderCreatedDeadLetterQueueName,
            maxRetryCountBeforeDLQ: 3,
            dlqSizeStrategy: new subscribe_event_options_1.EventQueueSizeStrategyRetention({ duration: 30, unit: time_unit_1.TimeUnit.days })
        };
    };
    EventNamesConfig.NewReviewCreated = 'REVIEW_CREATED';
    EventNamesConfig.NewReviewCreatedDeadLetterQueueName = this.NewReviewCreated + "_DEAD_LETTER_QUEUE";
    EventNamesConfig.NewReviewConsumerGroupName = this.NewReviewCreated + "_CONSUMER_GROUP_ALPHA";
    EventNamesConfig.NewReviewCreatedConsumerName = this.NewReviewCreated + "_CONSUMER_GROUP_ALPHA";
    EventNamesConfig.getConfigForNewReviewCreated = function () {
        return {
            queueName: _this.NewReviewCreated,
            sizeStrategy: new subscribe_event_options_1.EventQueueSizeStrategyRetention({ unit: time_unit_1.TimeUnit.days, duration: 30 })
        };
    };
    EventNamesConfig.getConfigForNewReviewCreatedSubscriber = function () {
        return {
            queueName: _this.NewReviewCreated,
            consumerGroupName: _this.NewReviewConsumerGroupName,
            consumerName: _this.NewReviewCreatedConsumerName,
            maxNumberOfEntries: 10,
            dlqQueueName: _this.NewReviewCreatedDeadLetterQueueName,
            maxRetryCountBeforeDLQ: 3,
            dlqSizeStrategy: new subscribe_event_options_1.EventQueueSizeStrategyRetention({ duration: 30, unit: time_unit_1.TimeUnit.days })
        };
    };
    return EventNamesConfig;
}());
exports["default"] = EventNamesConfig;
