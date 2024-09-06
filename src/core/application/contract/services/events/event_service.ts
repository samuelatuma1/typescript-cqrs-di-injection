import { EventQueueSizeStrategyMaxLength, EventQueueSizeStrategyRetention, listenToQueueOptions as listenToQueueOptions } from "../../../../domain/model/events/subscribe_event_options";

export default interface IEventService {
    publishToQueue (queueName: string, message: any, options?: EventQueueSizeStrategyRetention | EventQueueSizeStrategyMaxLength): Promise<string | null> ;
    subscribeToQueue(options: listenToQueueOptions): Promise<void>;
}

export const IIEventService = 'IEventService';