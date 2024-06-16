"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var tsyringe_1 = require("tsyringe");
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.logInfo = function (eventId, data) {
        console.log({ eventId: eventId, data: data });
    };
    Logger.prototype.logError = function (eventId, data) {
        console.error({ eventId: eventId, data: data });
    };
    Logger.prototype.logException = function (eventId, data) {
        console.error({ eventId: eventId, data: data });
    };
    Logger.prototype.logWarning = function (eventId, data) {
        console.error({ eventId: eventId, data: data });
    };
    Logger = __decorate([
        tsyringe_1.injectable()
    ], Logger);
    return Logger;
}());
exports["default"] = Logger;
