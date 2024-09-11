export enum EmailMessageType {
    HTML = "HTML",
    TEXT = "TEXT"
}

export class EmailRecipientDTO {
    to_email: string;
    to_name: string = ''
}
export class SendEmailDTO {
    recipient: EmailRecipientDTO
    from_name: string;
    title: string;
    message: string;
    messageType: EmailMessageType
    public constructor(init: {
        recipient: EmailRecipientDTO;
        title: string;
        from_name: string;
        message: string;
        messageType: EmailMessageType
    }){
        this.recipient = init.recipient;
        this.from_name = init.from_name;
        this.message = init.message;
        this.messageType = init.messageType ?? EmailMessageType.HTML;
        this.title = init.title
    }

}


export class SendEmailToMultipleRecipientsDTO {
    recipients: EmailRecipientDTO[]
    from_name: string;
    message: string;
    title: string;
    messageType: EmailMessageType
    public constructor(init: {
        recipients: EmailRecipientDTO[];
        from_name: string;
        message: string;
        title: string;
        messageType: EmailMessageType
    }){
        this.recipients = init.recipients;
        this.from_name = init.from_name;
        this.message = init.message;
        this.title = init.title
        this.messageType = init.messageType ?? EmailMessageType.HTML
    }

}

export class MailResponseDTO {
    recipient: EmailRecipientDTO;
    isSent: boolean;
    public constructor(init: {recipient: EmailRecipientDTO, isSent: boolean} ){
        this.recipient = init.recipient;
        this.isSent = init.isSent
    }
}