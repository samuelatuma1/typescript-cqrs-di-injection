"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
var tsyringe_1 = require("tsyringe");
var logger_1 = require("../../application/contract/observability/logger");
var random_utility_1 = require("../../application/common/utilities/random_utility");
var date_utility_1 = require("../../application/common/utilities/date_utility");
var EventTracer = /** @class */ (function () {
    function EventTracer(logger) {
        var _this = this;
        this.logger = logger;
        this.getEventTracerObject = function () {
            _this.end = date_utility_1["default"].getUTCNow();
            return {
                eventid: _this.eventId,
                request: _this.request,
                start: _this.start,
                end: _this.end,
                timeline: _this.timeline,
                verdict: _this.verdict,
                counter: _this.counter,
                response: _this.response,
                duration: _this.end.getTime() - _this.start.getTime()
            };
        };
        this.isException = function () {
            _this.verdict = "Exception";
            _this.logger.logException(_this.eventId, _this.getEventTracerObject());
        };
        this.eventId = random_utility_1["default"].newGuid();
        this.request = null;
        this.start = date_utility_1["default"].getUTCNow();
        this.end = date_utility_1["default"].getUTCNow();
        this.timeline = {};
        this.verdict = "PENDING";
        this.counter = 0;
        this.response = null;
    }
    EventTracer.prototype.addMessageToTimeline = function (message) {
        this.timeline[this.counter] = message;
        this.counter++;
    };
    EventTracer.prototype.say = function (message) {
        this.addMessageToTimeline(message);
    };
    EventTracer.prototype.isSuccess = function () {
        this.verdict = "Success";
        this.logger.logInfo(this.eventId, this.getEventTracerObject());
    };
    EventTracer.prototype.isError = function () {
        this.verdict = "Error";
        this.logger.logWarning(this.eventId, this.getEventTracerObject());
    };
    EventTracer.prototype.isExceptionWithMessage = function (message) {
        this.addMessageToTimeline(message);
        this.isException();
    };
    EventTracer.prototype.isSuccessWithMessage = function (message) {
        this.addMessageToTimeline(message);
        this.isSuccess();
    };
    EventTracer.prototype.isErrorWithMessage = function (message) {
        this.addMessageToTimeline(message);
        this.isError();
    };
    EventTracer = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(logger_1.IILogger))
    ], EventTracer);
    return EventTracer;
}());
exports["default"] = EventTracer;
