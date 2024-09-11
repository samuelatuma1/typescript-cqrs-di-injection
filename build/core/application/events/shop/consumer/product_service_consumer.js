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
const serialization_utility_1 = __importDefault(require("../../../common/utilities/serialization_utility"));
const event_service_1 = require("../../../contract/events/event_service");
const tsyringe_1 = require("tsyringe");
const event_tracer_1 = require("../../../contract/observability/event_tracer");
const event_names_config_1 = __importDefault(require("../../../common/config/event_names_config"));
const product_logic_1 = require("../../../contract/logic/shop/product_logic");
let ProductServiceConsumer = class ProductServiceConsumer {
    eventService;
    eventTracer;
    productLogic;
    constructor(eventService, eventTracer, productLogic) {
        this.eventService = eventService;
        this.eventTracer = eventTracer;
        this.productLogic = productLogic;
    }
    newReviewCreatedEvent = async (message, messageId) => {
        try {
            // deconstruct message
            this.eventTracer.say(`NewReviewCreatedEvent for id: ${messageId}`);
            this.eventTracer.request = message;
            message = message;
            console.log({ message });
            let reviewCreatedEventDTO = serialization_utility_1.default.deserializeJson(message.data);
            let isReviewCreatedEventHandled = await this.productLogic.handleReviewCreatedEvent(reviewCreatedEventDTO);
            this.eventTracer.isSuccessWithMessage(`Event handler returned ${isReviewCreatedEventHandled}`);
            return isReviewCreatedEventHandled;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            return false;
        }
    };
    listenFoNewReviewCreatedEvent = async () => {
        let newReviewListenConfig = event_names_config_1.default.getConfigForNewReviewCreatedSubscriber();
        await this.eventService.subscribeToQueue({
            queueName: newReviewListenConfig.queueName,
            consumerGroupName: newReviewListenConfig.consumerGroupName,
            consumerName: newReviewListenConfig.consumerName,
            maxNumberOfEntries: newReviewListenConfig.maxNumberOfEntries,
            messageHandler: this.newReviewCreatedEvent,
            saveFailedProcessesToDeadLetterQueue: {
                deadLetterQueueName: newReviewListenConfig.dlqQueueName,
                maxReprocessRetry: newReviewListenConfig.maxRetryCountBeforeDLQ,
                sizeStrategy: newReviewListenConfig.dlqSizeStrategy
            }
        });
    };
};
ProductServiceConsumer = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(event_service_1.IIEventService)),
    __param(1, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __param(2, (0, tsyringe_1.inject)(product_logic_1.IIProductLogic)),
    __metadata("design:paramtypes", [Object, Object, Object])
], ProductServiceConsumer);
exports.default = ProductServiceConsumer;
//# sourceMappingURL=product_service_consumer.js.map