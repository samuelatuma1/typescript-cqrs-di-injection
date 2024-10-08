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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var serialization_utility_1 = require("../../../application/common/utilities/serialization_utility");
var redis_config_1 = require("../../../application/common/config/redis_config");
var redis_1 = require("redis");
var tsyringe_1 = require("tsyringe");
var event_tracer_1 = require("../../../application/contract/observability/event_tracer");
var subscribe_event_options_1 = require("../../../domain/model/events/subscribe_event_options");
var date_utility_1 = require("../../../application/common/utilities/date_utility");
var RedisEventService = /** @class */ (function () {
    function RedisEventService(config, eventTracer) {
        var _this = this;
        this.config = config;
        this.eventTracer = eventTracer;
        this.redisClient = null;
        this.getRedisConnection = function () { return __awaiter(_this, void 0, void 0, function () {
            var redis, _a, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        if (!!this.redisClient) return [3 /*break*/, 2];
                        redis = redis_1.createClient({ url: this.config.REDIS_URL });
                        _a = this;
                        return [4 /*yield*/, redis.connect()];
                    case 1:
                        _a.redisClient = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.redisClient];
                    case 3:
                        ex_1 = _b.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_1);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        ///
        this.publishToQueue = function (queueName, message, options) { return __awaiter(_this, void 0, Promise, function () {
            var connection, dataPack, id, messageId, unixTimeinMilliseconds, computedMinId, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.getRedisConnection()];
                    case 1:
                        connection = _a.sent();
                        if (!connection) {
                            return [2 /*return*/, null];
                        }
                        dataPack = { data: serialization_utility_1["default"].serializeJson(message) };
                        console.log({ dataPack: dataPack });
                        id = '*';
                        return [4 /*yield*/, connection.xAdd(queueName, id, dataPack)];
                    case 2:
                        messageId = _a.sent();
                        if (options) {
                            console.log({ options: options });
                            if (options instanceof subscribe_event_options_1.EventQueueSizeStrategyMaxLength) {
                                connection.xTrim(queueName, "MAXLEN", options.maxLength); // No need to await this execution
                            }
                            else if (options instanceof subscribe_event_options_1.EventQueueSizeStrategyRetention) {
                                unixTimeinMilliseconds = date_utility_1["default"].getUnixTimeInMilliseconds();
                                computedMinId = unixTimeinMilliseconds - date_utility_1["default"].getMillisecondsInTime(options.duration, options.unit);
                                // let id = `${computedMinId}-0`
                                connection.xTrim(queueName, "MINID", computedMinId);
                            }
                        }
                        return [2 /*return*/, messageId];
                    case 3:
                        ex_2 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_2);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.subscribeToQueue = function (options) { return __awaiter(_this, void 0, Promise, function () {
            var connection, idInitialPosition, doesQueueExist, stream, dataArr, _i, dataArr_1, data, streamKeyName, _a, _b, message, callBack, retryCount, maxRetryCount, dlqName;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getRedisConnection()];
                    case 1:
                        connection = _c.sent();
                        if (!connection) {
                            return [2 /*return*/];
                        }
                        idInitialPosition = '0';
                        console.log({ options: options });
                        return [4 /*yield*/, connection.exists(options.queueName)];
                    case 2:
                        doesQueueExist = _c.sent();
                        console.log({ doesQueueExist: doesQueueExist, queueName: options.queueName });
                        if (!!doesQueueExist) return [3 /*break*/, 4];
                        this.eventTracer.say("Creating new Consumer group with name " + options.consumerGroupName + " for queue " + options.queueName);
                        return [4 /*yield*/, connection.xGroupCreate(options.queueName, options.consumerGroupName, idInitialPosition, { MKSTREAM: true })];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        stream = {
                            key: options.queueName,
                            id: '>'
                        };
                        _c.label = 5;
                    case 5:
                        if (!true) return [3 /*break*/, 19];
                        return [4 /*yield*/, connection.xReadGroup(redis_1.commandOptions({
                                isolated: true
                            }), options.consumerGroupName, options.consumerName, [
                                stream
                            ], {
                                COUNT: options.maxNumberOfEntries,
                                BLOCK: 5
                            })];
                    case 6:
                        dataArr = _c.sent();
                        if (!(dataArr && dataArr.length)) return [3 /*break*/, 18];
                        _i = 0, dataArr_1 = dataArr;
                        _c.label = 7;
                    case 7:
                        if (!(_i < dataArr_1.length)) return [3 /*break*/, 18];
                        data = dataArr_1[_i];
                        streamKeyName = data.name;
                        if (!(streamKeyName === options.queueName)) return [3 /*break*/, 17];
                        _a = 0, _b = data.messages;
                        _c.label = 8;
                    case 8:
                        if (!(_a < _b.length)) return [3 /*break*/, 17];
                        message = _b[_a];
                        return [4 /*yield*/, options.messageHandler(message.message, message.id)];
                    case 9:
                        callBack = _c.sent();
                        if (!!callBack) return [3 /*break*/, 14];
                        if (!options.saveFailedProcessesToDeadLetterQueue) return [3 /*break*/, 14];
                        retryCount = 1;
                        maxRetryCount = options.saveFailedProcessesToDeadLetterQueue.maxReprocessRetry;
                        _c.label = 10;
                    case 10:
                        if (!(!callBack && retryCount < maxRetryCount)) return [3 /*break*/, 12];
                        return [4 /*yield*/, options.messageHandler(message.message, message.id)];
                    case 11:
                        callBack = _c.sent();
                        retryCount++;
                        return [3 /*break*/, 10];
                    case 12:
                        if (!(retryCount >= maxRetryCount)) return [3 /*break*/, 14];
                        dlqName = options.saveFailedProcessesToDeadLetterQueue.deadLetterQueueName;
                        return [4 /*yield*/, this.publishToQueue(dlqName, message, options.saveFailedProcessesToDeadLetterQueue.sizeStrategy)];
                    case 13:
                        _c.sent();
                        _c.label = 14;
                    case 14: return [4 /*yield*/, connection.xAck(options.queueName, options.consumerGroupName, message.id)];
                    case 15:
                        _c.sent();
                        _c.label = 16;
                    case 16:
                        _a++;
                        return [3 /*break*/, 8];
                    case 17:
                        _i++;
                        return [3 /*break*/, 7];
                    case 18: return [3 /*break*/, 5];
                    case 19: return [2 /*return*/];
                }
            });
        }); };
    }
    RedisEventService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(redis_config_1.IIRedisConfig)),
        __param(1, tsyringe_1.inject(event_tracer_1.IIEventTracer))
    ], RedisEventService);
    return RedisEventService;
}());
exports["default"] = RedisEventService;
