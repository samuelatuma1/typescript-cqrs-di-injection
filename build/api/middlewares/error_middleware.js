"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const base_exception_1 = __importDefault(require("../../core/application/common/exceptions/base_exception"));
const error_model_1 = __importDefault(require("../models/error_model"));
const ErrorMiddleware = (ex, request, response, next) => {
    const errorModel = new error_model_1.default();
    let errorStatusCode = 400;
    switch (ex.name) {
        default:
            errorModel.message = ex.message;
            errorModel.errors = {};
    }
    if (ex instanceof base_exception_1.default) {
        errorModel.errors = ex._errors;
    }
    return response.status(errorStatusCode).json(errorModel);
};
exports.ErrorMiddleware = ErrorMiddleware;
//# sourceMappingURL=error_middleware.js.map