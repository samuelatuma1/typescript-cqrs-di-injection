import { TimeUnit } from "../utiliities/time_unit";
export declare class EventQueueSizeStrategyRetention {
    duration: number;
    unit: TimeUnit;
    constructor(init: {
        duration: number;
        unit: TimeUnit;
    });
}
export declare class EventQueueSizeStrategyMaxLength {
    maxLength: number;
    constructor(init: {
        maxLength: number;
    });
}
export interface IMessageHandler {
    (message: any, messageId: string): Promise<boolean>;
}
export interface listenToQueueOptions {
    queueName: string;
    consumerGroupName: string;
    consumerName: string;
    maxNumberOfEntries: number;
    messageHandler: IMessageHandler;
    saveFailedProcessesToDeadLetterQueue?: {
        maxReprocessRetry: number;
        deadLetterQueueName: string;
        sizeStrategy?: EventQueueSizeStrategyRetention | EventQueueSizeStrategyMaxLength;
    };
}
