"use strict";
exports.__esModule = true;
var SerializationUtility = /** @class */ (function () {
    function SerializationUtility() {
    }
    SerializationUtility.deserializeJson = function (data) {
        console.log({ data: data });
        try {
            return JSON.parse(data);
        }
        catch (ex) {
            console.log(ex);
            return null;
        }
    };
    SerializationUtility.serializeJson = function (data) {
        try {
            return JSON.stringify(data);
        }
        catch (ex) {
            console.log(ex);
            return null;
        }
    };
    return SerializationUtility;
}());
exports["default"] = SerializationUtility;
