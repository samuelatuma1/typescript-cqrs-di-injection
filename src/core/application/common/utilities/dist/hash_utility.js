"use strict";
exports.__esModule = true;
var crypto_1 = require("crypto");
var HashUtility = /** @class */ (function () {
    function HashUtility() {
    }
    HashUtility.hashStringWithSha512 = function (str, key) {
        var hmac = crypto_1.createHmac('sha512', key);
        return hmac.update(str).digest('hex').toString();
    };
    return HashUtility;
}());
exports["default"] = HashUtility;
