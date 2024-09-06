"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const time_unit_1 = require("../../../domain/model/utiliities/time_unit");
class DateUtility {
    static getUTCNow = () => {
        return new Date(new Date().toISOString());
    };
    static getMillisecondsInTime = (duration, timeUnit) => {
        switch (timeUnit) {
            case time_unit_1.TimeUnit.seconds:
                return duration * 1000;
            case time_unit_1.TimeUnit.minutes:
                return duration * 1000 * 60;
            case time_unit_1.TimeUnit.hours:
                return duration * 1000 * 60 * 60;
            case time_unit_1.TimeUnit.days:
                return duration * 1000 * 60 * 60 * 24;
        }
        return duration;
    };
    static getUnixTimeInMilliseconds = () => {
        let date = new Date();
        return date.getTime();
    };
}
exports.default = DateUtility;
//# sourceMappingURL=date_utility.js.map