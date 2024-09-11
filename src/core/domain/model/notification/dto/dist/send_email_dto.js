"use strict";
exports.__esModule = true;
exports.MailResponseDTO = exports.SendEmailToMultipleRecipientsDTO = exports.SendEmailDTO = exports.EmailRecipientDTO = exports.EmailMessageType = void 0;
var EmailMessageType;
(function (EmailMessageType) {
    EmailMessageType["HTML"] = "HTML";
    EmailMessageType["TEXT"] = "TEXT";
})(EmailMessageType = exports.EmailMessageType || (exports.EmailMessageType = {}));
var EmailRecipientDTO = /** @class */ (function () {
    function EmailRecipientDTO() {
        this.to_name = '';
    }
    return EmailRecipientDTO;
}());
exports.EmailRecipientDTO = EmailRecipientDTO;
var SendEmailDTO = /** @class */ (function () {
    function SendEmailDTO(init) {
        var _a;
        this.recipient = init.recipient;
        this.from_name = init.from_name;
        this.message = init.message;
        this.messageType = (_a = init.messageType) !== null && _a !== void 0 ? _a : EmailMessageType.HTML;
        this.title = init.title;
    }
    return SendEmailDTO;
}());
exports.SendEmailDTO = SendEmailDTO;
var SendEmailToMultipleRecipientsDTO = /** @class */ (function () {
    function SendEmailToMultipleRecipientsDTO(init) {
        var _a;
        this.recipients = init.recipients;
        this.from_name = init.from_name;
        this.message = init.message;
        this.title = init.title;
        this.messageType = (_a = init.messageType) !== null && _a !== void 0 ? _a : EmailMessageType.HTML;
    }
    return SendEmailToMultipleRecipientsDTO;
}());
exports.SendEmailToMultipleRecipientsDTO = SendEmailToMultipleRecipientsDTO;
var MailResponseDTO = /** @class */ (function () {
    function MailResponseDTO(init) {
        this.recipient = init.recipient;
        this.isSent = init.isSent;
    }
    return MailResponseDTO;
}());
exports.MailResponseDTO = MailResponseDTO;
