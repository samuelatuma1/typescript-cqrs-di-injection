"use strict";
exports.__esModule = true;
exports.ErrorMiddleware = void 0;
var base_exception_1 = require("../../core/application/common/exceptions/base_exception");
var error_model_1 = require("../models/error_model");
exports.ErrorMiddleware = function (ex, request, response, next) {
    var errorModel = new error_model_1["default"]();
    var errorStatusCode = 400;
    switch (ex.name) {
        default:
            errorModel.message = ex.message;
            errorModel.errors = {};
    }
    if (ex instanceof base_exception_1["default"]) {
        errorModel.errors = ex._errors;
    }
    return response.status(errorStatusCode).json(errorModel);
};
