"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailResponseDTO = exports.SendEmailToMultipleRecipientsDTO = exports.SendEmailDTO = exports.EmailRecipientDTO = exports.EmailMessageType = void 0;
var EmailMessageType;
(function (EmailMessageType) {
    EmailMessageType["HTML"] = "HTML";
    EmailMessageType["TEXT"] = "TEXT";
})(EmailMessageType || (exports.EmailMessageType = EmailMessageType = {}));
class EmailRecipientDTO {
    to_email;
    to_name = '';
}
exports.EmailRecipientDTO = EmailRecipientDTO;
class SendEmailDTO {
    recipient;
    from_name;
    title;
    message;
    messageType;
    constructor(init) {
        this.recipient = init.recipient;
        this.from_name = init.from_name;
        this.message = init.message;
        this.messageType = init.messageType ?? EmailMessageType.HTML;
        this.title = init.title;
    }
}
exports.SendEmailDTO = SendEmailDTO;
class SendEmailToMultipleRecipientsDTO {
    recipients;
    from_name;
    message;
    title;
    messageType;
    constructor(init) {
        this.recipients = init.recipients;
        this.from_name = init.from_name;
        this.message = init.message;
        this.title = init.title;
        this.messageType = init.messageType ?? EmailMessageType.HTML;
    }
}
exports.SendEmailToMultipleRecipientsDTO = SendEmailToMultipleRecipientsDTO;
class MailResponseDTO {
    recipient;
    isSent;
    constructor(init) {
        this.recipient = init.recipient;
        this.isSent = init.isSent;
    }
}
exports.MailResponseDTO = MailResponseDTO;
//# sourceMappingURL=send_email_dto.js.map