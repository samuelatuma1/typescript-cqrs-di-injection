"use strict";
exports.__esModule = true;
exports.ApiRequest = void 0;
var api_request_1 = require("../enum/api_request");
var ApiRequest = /** @class */ (function () {
    function ApiRequest(init) {
        this.method = api_request_1.ApiRequestMethod.GET;
        this.method = init.method;
        this.url = init.url;
        this.headers = init.headers;
        this.body = init.body;
    }
    return ApiRequest;
}());
exports.ApiRequest = ApiRequest;
