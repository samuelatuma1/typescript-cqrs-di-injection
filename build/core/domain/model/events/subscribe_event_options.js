"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventQueueSizeStrategyMaxLength = exports.EventQueueSizeStrategyRetention = void 0;
class EventQueueSizeStrategyRetention {
    duration;
    unit;
    constructor(init) {
        this.duration = init.duration;
        this.unit = init.unit;
    }
}
exports.EventQueueSizeStrategyRetention = EventQueueSizeStrategyRetention;
class EventQueueSizeStrategyMaxLength {
    maxLength;
    constructor(init) {
        this.maxLength = init.maxLength;
    }
}
exports.EventQueueSizeStrategyMaxLength = EventQueueSizeStrategyMaxLength;
//# sourceMappingURL=subscribe_event_options.js.map