"use strict";
exports.__esModule = true;
exports.ApiRequestMethod = exports.ApiRequestContentType = void 0;
var ApiRequestContentType;
(function (ApiRequestContentType) {
    ApiRequestContentType["JSON"] = "application/json";
    ApiRequestContentType["PDF"] = "application/pdf";
    ApiRequestContentType["FORM_DATA"] = "multipart/form-data";
    ApiRequestContentType["TEXT"] = "text/plain";
})(ApiRequestContentType = exports.ApiRequestContentType || (exports.ApiRequestContentType = {}));
var ApiRequestMethod;
(function (ApiRequestMethod) {
    ApiRequestMethod["GET"] = "GET";
    ApiRequestMethod["POST"] = "POST";
    ApiRequestMethod["PUT"] = "PUT";
    ApiRequestMethod["DELETE"] = "DELETE";
})(ApiRequestMethod = exports.ApiRequestMethod || (exports.ApiRequestMethod = {}));
