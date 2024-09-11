export declare enum EmailMessageType {
    HTML = "HTML",
    TEXT = "TEXT"
}
export declare class EmailRecipientDTO {
    to_email: string;
    to_name: string;
}
export declare class SendEmailDTO {
    recipient: EmailRecipientDTO;
    from_name: string;
    title: string;
    message: string;
    messageType: EmailMessageType;
    constructor(init: {
        recipient: EmailRecipientDTO;
        title: string;
        from_name: string;
        message: string;
        messageType: EmailMessageType;
    });
}
export declare class SendEmailToMultipleRecipientsDTO {
    recipients: EmailRecipientDTO[];
    from_name: string;
    message: string;
    title: string;
    messageType: EmailMessageType;
    constructor(init: {
        recipients: EmailRecipientDTO[];
        from_name: string;
        message: string;
        title: string;
        messageType: EmailMessageType;
    });
}
export declare class MailResponseDTO {
    recipient: EmailRecipientDTO;
    isSent: boolean;
    constructor(init: {
        recipient: EmailRecipientDTO;
        isSent: boolean;
    });
}
