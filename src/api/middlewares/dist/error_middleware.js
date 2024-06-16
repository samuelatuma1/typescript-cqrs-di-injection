"use strict";
exports.__esModule = true;
exports.ErrorMiddleware = void 0;
var error_model_1 = require("../models/error_model");
exports.ErrorMiddleware = function (ex, request, response, next) {
    var errorModel = new error_model_1["default"]();
    var errorStatusCode = 400;
    switch (ex.name) {
        default:
            errorModel.message = ex.message;
            errorModel.errors = {};
    }
    return response.status(errorStatusCode).json(errorModel);
};
