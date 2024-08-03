"use strict";
exports.__esModule = true;
var serialization_utility_1 = require("./serialization_utility");
var ObjectUtility = /** @class */ (function () {
    function ObjectUtility() {
    }
    ObjectUtility.removeNullOrUndefinedValuesFromObject = function (obj) {
        var response = {};
        for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (value === null || value === undefined) {
            }
            else {
                response[key] = value;
            }
        }
        return response;
    };
    ObjectUtility.updateAwithB = function (a, b) {
        var c = serialization_utility_1["default"].serializeJson(a);
        var d = serialization_utility_1["default"].deserializeJson(c);
        for (var _i = 0, _a = Object.entries(b); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            d[key] = value;
        }
        return d;
    };
    ObjectUtility.areListsEqual = function (list1, list2) {
        if (list1.length !== list2.length)
            return false;
        for (var idx = 0; idx < list1.length; idx++) {
            var itemAtIdx1 = list1[idx];
            var itemAtIdx2 = list2[idx];
            if (itemAtIdx1 !== itemAtIdx2) {
                return false;
            }
        }
        return true;
    };
    ObjectUtility.objectSize = function (obj) {
        return Object.keys(obj).length;
    };
    return ObjectUtility;
}());
exports["default"] = ObjectUtility;
