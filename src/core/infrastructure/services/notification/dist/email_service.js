"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var tsyringe_1 = require("tsyringe");
var api_service_1 = require("../../../application/contract/services/api/api_service");
var email_config_1 = require("../../../application/common/config/email_config");
var api_request_1 = require("../../../domain/model/api_service/dto/api_request");
var api_request_2 = require("../../../domain/model/api_service/enum/api_request");
var event_tracer_1 = require("../../../application/contract/observability/event_tracer");
var send_email_dto_1 = require("../../../domain/model/notification/dto/send_email_dto");
var date_utility_1 = require("../../../application/common/utilities/date_utility");
var MailService = /** @class */ (function () {
    function MailService(apiService, emailConfig, eventTracer) {
        var _this = this;
        this.apiService = apiService;
        this.emailConfig = emailConfig;
        this.eventTracer = eventTracer;
        this.sendMail = function (emailDTO) { return __awaiter(_this, void 0, Promise, function () {
            var messageBody, request, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.eventTracer.say("Send Mail");
                        this.eventTracer.request = emailDTO;
                        messageBody = {
                            service_id: this.emailConfig.service_id,
                            template_id: this.emailConfig.template_id,
                            user_id: this.emailConfig.user_id,
                            accessToken: this.emailConfig.access_token,
                            template_params: {
                                to_name: emailDTO.recipient.to_name,
                                from_name: emailDTO.from_name,
                                message: emailDTO.message,
                                title: emailDTO.title,
                                reply_to: emailDTO.recipient.to_email
                            }
                        };
                        request = new api_request_1.ApiRequest({
                            url: this.emailConfig.url,
                            method: api_request_2.ApiRequestMethod.POST,
                            headers: {
                                contentType: api_request_2.ApiRequestContentType.JSON,
                                responseType: api_request_2.ApiRequestContentType.TEXT
                            },
                            body: messageBody
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.eventTracer.say("Sending email");
                        return [4 /*yield*/, this.apiService.apiRequest(request)];
                    case 2:
                        _a.sent();
                        this.eventTracer.isSuccessWithMessage("Email sent successfully");
                        return [2 /*return*/, new send_email_dto_1.MailResponseDTO({
                                recipient: emailDTO.recipient,
                                isSent: true
                            })];
                    case 3:
                        ex_1 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_1);
                        console.log("##################");
                        console.log("##################");
                        console.log({ ex: ex_1 });
                        console.log(ex_1);
                        console.log("##################");
                        console.log("##################");
                        return [2 /*return*/, new send_email_dto_1.MailResponseDTO({
                                recipient: emailDTO.recipient,
                                isSent: false
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.sendToMultipleRecipients = function (emailsDTO) { return __awaiter(_this, void 0, Promise, function () {
            var emailResponses, _i, _a, email, emailResponse, ex_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        emailResponses = [];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 7, , 8]);
                        this.eventTracer.say("sending mail to multiple recipients");
                        this.eventTracer.request = emailsDTO;
                        _i = 0, _a = emailsDTO.recipients;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        email = _a[_i];
                        return [4 /*yield*/, this.sendMail(new send_email_dto_1.SendEmailDTO(__assign(__assign({}, emailsDTO), { recipient: email })))];
                    case 3:
                        emailResponse = _b.sent();
                        emailResponses.push(emailResponse);
                        return [4 /*yield*/, date_utility_1["default"].delay(1)]; // To avoid rate limit
                    case 4:
                        _b.sent(); // To avoid rate limit
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6:
                        this.eventTracer.isSuccessWithResponseAndMessage(emailResponses);
                        console.log({ emailResponses: emailResponses, data: emailResponses.map(function (d) { return d.recipient; }) });
                        return [2 /*return*/, emailResponses];
                    case 7:
                        ex_2 = _b.sent();
                        console.log("##################");
                        console.log("##################");
                        console.log({ ex: ex_2 });
                        console.log(ex_2);
                        console.log("##################");
                        console.log("##################");
                        this.eventTracer.isExceptionWithMessage("" + ex_2);
                        return [2 /*return*/, emailResponses];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
    }
    MailService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(api_service_1.IIApiService)),
        __param(1, tsyringe_1.inject(email_config_1.IIEmailJSConfig)),
        __param(2, tsyringe_1.inject(event_tracer_1.IIEventTracer))
    ], MailService);
    return MailService;
}());
exports["default"] = MailService;
