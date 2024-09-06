"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serialization_utility_1 = __importDefault(require("../../../../../application/common/utilities/serialization_utility"));
const event_service_1 = require("../../../../../application/contract/services/events/event_service");
const tsyringe_1 = require("tsyringe");
const event_tracer_1 = require("../../../../../application/contract/observability/event_tracer");
const order_service_1 = require("../../../../../application/contract/services/shop/order_service");
const event_names_config_1 = __importDefault(require("../../../../../application/common/config/event_names_config"));
let OrderServiceConsumer = class OrderServiceConsumer {
    eventService;
    eventTracer;
    orderService;
    constructor(eventService, eventTracer, orderService) {
        this.eventService = eventService;
        this.eventTracer = eventTracer;
        this.orderService = orderService;
    }
    newOrderCreatedEvent = async (message, messageId) => {
        try {
            // deconstruct message
            this.eventTracer.say(`NewOrderCreatedEvent for id: ${messageId}`);
            this.eventTracer.request = message;
            message = message;
            console.log({ message });
            let orderPlacedDTO = serialization_utility_1.default.deserializeJson(message.data);
            let isOrderEventHandled = await this.orderService.handleOrderCreatedEvent(orderPlacedDTO);
            this.eventTracer.isSuccessWithMessage(`Event handler returned ${isOrderEventHandled}`);
            return isOrderEventHandled;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            return false;
        }
    };
    listenForNewOrderCreateEvent = async () => {
        let newOrderListenConfig = event_names_config_1.default.getConfigForNewOrderCreatedSubscriber();
        await this.eventService.subscribeToQueue({
            queueName: newOrderListenConfig.queueName,
            consumerGroupName: newOrderListenConfig.consumerGroupName,
            consumerName: newOrderListenConfig.consumerName,
            maxNumberOfEntries: newOrderListenConfig.maxNumberOfEntries,
            messageHandler: this.newOrderCreatedEvent,
            saveFailedProcessesToDeadLetterQueue: {
                deadLetterQueueName: newOrderListenConfig.dlqQueueName,
                maxReprocessRetry: newOrderListenConfig.maxRetryCountBeforeDLQ,
                sizeStrategy: newOrderListenConfig.dlqSizeStrategy
            }
        });
    };
    listenForOrderEvents = async () => {
        await this.listenForNewOrderCreateEvent();
    };
};
OrderServiceConsumer = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(event_service_1.IIEventService)),
    __param(1, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __param(2, (0, tsyringe_1.inject)(order_service_1.IIOrderService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], OrderServiceConsumer);
exports.default = OrderServiceConsumer;
//# sourceMappingURL=order_service_consumer.js.map