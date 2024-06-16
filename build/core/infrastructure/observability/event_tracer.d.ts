import IEventTracer from "../../application/contract/observability/event_tracer";
import ILogger from "../../application/contract/observability/logger";
export default class EventTracer implements IEventTracer {
    private readonly logger;
    eventId: string;
    request: object | null;
    response: object | null;
    start: Date;
    end: Date;
    timeline: {
        [key: string]: string;
    };
    verdict: string;
    counter: number;
    constructor(logger: ILogger);
    private addMessageToTimeline;
    private getEventTracerObject;
    say(message: string): void;
    isException: () => void;
    isSuccess(): void;
    isError(): void;
    isExceptionWithMessage(message: string): void;
    isSuccessWithMessage(message: string): void;
    isErrorWithMessage(message: string): void;
}
