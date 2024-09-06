"use strict";
exports.__esModule = true;
var time_unit_1 = require("../../../domain/model/utiliities/time_unit");
var DateUtility = /** @class */ (function () {
    function DateUtility() {
    }
    DateUtility.getUTCNow = function () {
        return new Date(new Date().toISOString());
    };
    DateUtility.getMillisecondsInTime = function (duration, timeUnit) {
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
    DateUtility.getUnixTimeInMilliseconds = function () {
        var date = new Date();
        return date.getTime();
    };
    return DateUtility;
}());
exports["default"] = DateUtility;
