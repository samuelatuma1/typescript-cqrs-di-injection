"use strict";
exports.__esModule = true;
exports.EventQueueSizeStrategyMaxLength = exports.EventQueueSizeStrategyRetention = void 0;
var EventQueueSizeStrategyRetention = /** @class */ (function () {
    function EventQueueSizeStrategyRetention(init) {
        this.duration = init.duration;
        this.unit = init.unit;
    }
    return EventQueueSizeStrategyRetention;
}());
exports.EventQueueSizeStrategyRetention = EventQueueSizeStrategyRetention;
var EventQueueSizeStrategyMaxLength = /** @class */ (function () {
    function EventQueueSizeStrategyMaxLength(init) {
        this.maxLength = init.maxLength;
    }
    return EventQueueSizeStrategyMaxLength;
}());
exports.EventQueueSizeStrategyMaxLength = EventQueueSizeStrategyMaxLength;
