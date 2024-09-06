"use strict";
var _this = this;
exports.__esModule = true;
var subscribe_event_options_1 = require("../../../domain/model/events/subscribe_event_options");
var time_unit_1 = require("../../../domain/model/utiliities/time_unit");
var EventNamesConfig = /** @class */ (function () {
    function EventNamesConfig() {
    }
    EventNamesConfig.NewOrderCreated = 'NEW_ORDER_CREATED';
    EventNamesConfig.NewOrderCreatedConsumerGroupName = this.NewOrderCreated + "_CONSUMER_GROUP_ALPHA";
    EventNamesConfig.NewOrderCreatedConsumerName = this.NewOrderCreated + "_CONSUMER_GROUP_ALPHA";
    EventNamesConfig.DeadLetterQueueName = this.NewOrderCreated + "_DEAD_LETTER_QUEUE";
    EventNamesConfig.getConfigForNewOrderCreated = function () {
        return {
            queueName: _this.NewOrderCreated,
            sizeStrategy: new subscribe_event_options_1.EventQueueSizeStrategyRetention({ unit: time_unit_1.TimeUnit.days, duration: 30 })
        };
    };
    EventNamesConfig.getConfigForNewOrderCreatedSubscriber = function () {
        return {
            queueName: _this.NewOrderCreated,
            consumerGroupName: _this.NewOrderCreatedConsumerGroupName,
            consumerName: _this.NewOrderCreatedConsumerName,
            maxNumberOfEntries: 10,
            dlqQueueName: _this.DeadLetterQueueName,
            maxRetryCountBeforeDLQ: 3,
            dlqSizeStrategy: new subscribe_event_options_1.EventQueueSizeStrategyRetention({ duration: 30, unit: time_unit_1.TimeUnit.days })
        };
    };
    return EventNamesConfig;
}());
exports["default"] = EventNamesConfig;
