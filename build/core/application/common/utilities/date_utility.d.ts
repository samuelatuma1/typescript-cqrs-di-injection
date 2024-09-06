import { TimeUnit } from "../../../domain/model/utiliities/time_unit";
export default class DateUtility {
    static getUTCNow: () => Date;
    static getMillisecondsInTime: (duration: number, timeUnit: TimeUnit) => number;
    static getUnixTimeInMilliseconds: () => number;
}
