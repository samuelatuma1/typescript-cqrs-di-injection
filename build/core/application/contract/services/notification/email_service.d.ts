import { MailResponseDTO, SendEmailDTO, SendEmailToMultipleRecipientsDTO } from "../../../../domain/model/notification/dto/send_email_dto";
export default interface IMailService {
    sendMail(emailDTO: SendEmailDTO): Promise<MailResponseDTO>;
    sendToMultipleRecipients(emailsDTO: SendEmailToMultipleRecipientsDTO): Promise<MailResponseDTO[]>;
}
export declare const IIMailService = "IMailService";
