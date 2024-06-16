import { inject, injectable } from "tsyringe";
import IEventTracer from "../../application/contract/observability/event_tracer";
import ILogger, { IILogger } from "../../application/contract/observability/logger";
import RandomUtility from "../../application/common/utilities/random_utility";
import DateUtility from "../../application/common/utilities/date_utility";

@injectable()
export default class EventTracer implements IEventTracer{
    eventId: string;
    request: object | null;
    response: object | null;
    start: Date;
    end: Date;
    timeline: {[key: string]: string};
    verdict: string;
    counter: number;
    public constructor(@inject(IILogger) private readonly logger: ILogger){
        this.eventId = RandomUtility.newGuid();
        this.request = null;
        this.start = DateUtility.getUTCNow();
        this.end = DateUtility.getUTCNow();
        this.timeline = {};
        this.verdict = "PENDING"
        this.counter = 0;
        this.response = null;
    }
    private addMessageToTimeline(message: string){
        this.timeline[this.counter] = message;
        this.counter++;
    }
    private getEventTracerObject = (): {[key: string]: any} => {
        this.end = DateUtility.getUTCNow();
        return {
            
            eventid: this.eventId,
            request: this.request,
            start: this.start,
            end: this.end,
            timeline: this.timeline,
            verdict: this.verdict,
            counter: this.counter,
            response: this.response,
            duration: this.end.getTime() - this.start.getTime()
        }
    }
    say(message: string): void {
        this.addMessageToTimeline(message);
    }
    isException = (): void => {
        this.verdict = "Exception";
        this.logger.logException(this.eventId, this.getEventTracerObject());
        
    }
    isSuccess(): void {
        this.verdict = "Success";
        this.logger.logInfo(this.eventId, this.getEventTracerObject());
    }
    isError(): void {
        this.verdict = "Error";
        this.logger.logWarning(this.eventId, this.getEventTracerObject());
    }

    isExceptionWithMessage(message: string): void {
        this.addMessageToTimeline(message);
        this.isException();
    }
    isSuccessWithMessage(message: string): void {
        this.addMessageToTimeline(message);
        this.isSuccess();
    }
    isErrorWithMessage(message: string): void {
        this.addMessageToTimeline(message);
        this.isError();
    }

}