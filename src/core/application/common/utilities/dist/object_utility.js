"use strict";
exports.__esModule = true;
var ObjectUtility = /** @class */ (function () {
    function ObjectUtility() {
    }
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
