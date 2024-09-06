import { TimeUnit } from "../../../domain/model/utiliities/time_unit";

export default class DateUtility{
    static getUTCNow = (): Date => {
        return new Date(new Date().toISOString());
    }

    static getMillisecondsInTime = (duration: number, timeUnit: TimeUnit): number => {
        switch (timeUnit){
            case TimeUnit.seconds:
                return duration * 1000;
            case TimeUnit.minutes:
                return duration * 1000 * 60;
            case TimeUnit.hours:
                return duration * 1000 * 60 * 60;
            case TimeUnit.days:
                return duration * 1000 * 60 * 60 * 24
            
        }

        return duration;
    }

    static getUnixTimeInMilliseconds = (): number => {
        let date = new Date();

        return date.getTime();
    }
}