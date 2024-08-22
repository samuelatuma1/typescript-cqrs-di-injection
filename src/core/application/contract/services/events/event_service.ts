import { listenToStreamOptions } from "../../../../domain/model/events/subscribe_event_options";

export default interface IEventService {
    addMessage (streamName: string, message: any): Promise<string | null> ;
    subscribe(options: listenToStreamOptions): Promise<void>;
}

export const IIEventService = 'IEventService';