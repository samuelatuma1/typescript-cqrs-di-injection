"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const api_service_1 = require("../../../application/contract/services/api/api_service");
const email_config_1 = require("../../../application/common/config/email_config");
const api_request_1 = require("../../../domain/model/api_service/dto/api_request");
const api_request_2 = require("../../../domain/model/api_service/enum/api_request");
const event_tracer_1 = require("../../../application/contract/observability/event_tracer");
const send_email_dto_1 = require("../../../domain/model/notification/dto/send_email_dto");
const date_utility_1 = __importDefault(require("../../../application/common/utilities/date_utility"));
let MailService = class MailService {
    apiService;
    emailConfig;
    eventTracer;
    constructor(apiService, emailConfig, eventTracer) {
        this.apiService = apiService;
        this.emailConfig = emailConfig;
        this.eventTracer = eventTracer;
    }
    sendMail = async (emailDTO) => {
        this.eventTracer.say("Send Mail");
        this.eventTracer.request = emailDTO;
        let messageBody = {
            service_id: this.emailConfig.service_id,
            template_id: this.emailConfig.template_id,
            user_id: this.emailConfig.user_id,
            accessToken: this.emailConfig.access_token,
            template_params: {
                to_name: emailDTO.recipient.to_name,
                from_name: emailDTO.from_name,
                message: emailDTO.message,
                title: emailDTO.title,
                reply_to: emailDTO.recipient.to_email,
            }
        };
        let request = new api_request_1.ApiRequest({
            url: this.emailConfig.url,
            method: api_request_2.ApiRequestMethod.POST,
            headers: {
                contentType: api_request_2.ApiRequestContentType.JSON,
                responseType: api_request_2.ApiRequestContentType.TEXT,
            },
            body: messageBody
        });
        try {
            this.eventTracer.say(`Sending email`);
            await this.apiService.apiRequest(request);
            this.eventTracer.isSuccessWithMessage(`Email sent successfully`);
            return new send_email_dto_1.MailResponseDTO({
                recipient: emailDTO.recipient,
                isSent: true
            });
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            console.log("##################");
            console.log("##################");
            console.log({ ex });
            console.log(ex);
            console.log("##################");
            console.log("##################");
            return new send_email_dto_1.MailResponseDTO({
                recipient: emailDTO.recipient,
                isSent: false
            });
        }
    };
    sendToMultipleRecipients = async (emailsDTO) => {
        let emailResponses = [];
        try {
            this.eventTracer.say(`sending mail to multiple recipients`);
            this.eventTracer.request = emailsDTO;
            for (let email of emailsDTO.recipients) {
                let emailResponse = await this.sendMail(new send_email_dto_1.SendEmailDTO({ ...emailsDTO, recipient: email }));
                emailResponses.push(emailResponse);
                await date_utility_1.default.delay(1); // To avoid rate limit
            }
            this.eventTracer.isSuccessWithResponseAndMessage(emailResponses);
            console.log({ emailResponses, data: emailResponses.map(d => d.recipient) });
            return emailResponses;
        }
        catch (ex) {
            console.log("##################");
            console.log("##################");
            console.log({ ex });
            console.log(ex);
            console.log("##################");
            console.log("##################");
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            return emailResponses;
        }
    };
};
MailService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(api_service_1.IIApiService)),
    __param(1, (0, tsyringe_1.inject)(email_config_1.IIEmailJSConfig)),
    __param(2, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __metadata("design:paramtypes", [Object, Object, Object])
], MailService);
exports.default = MailService;
//# sourceMappingURL=email_service.js.map