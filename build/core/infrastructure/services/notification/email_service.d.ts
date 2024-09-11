import IMailService from "../../../application/contract/services/notification/email_service";
import IApiService from "../../../application/contract/services/api/api_service";
import { IEmailJSConfig } from "../../../application/common/config/email_config";
import IEventTracer from "../../../application/contract/observability/event_tracer";
import { MailResponseDTO, SendEmailDTO, SendEmailToMultipleRecipientsDTO } from "../../../domain/model/notification/dto/send_email_dto";
export default class MailService implements IMailService {
    private readonly apiService;
    private readonly emailConfig;
    private readonly eventTracer;
    constructor(apiService: IApiService, emailConfig: IEmailJSConfig, eventTracer: IEventTracer);
    sendMail: (emailDTO: SendEmailDTO) => Promise<MailResponseDTO>;
    sendToMultipleRecipients: (emailsDTO: SendEmailToMultipleRecipientsDTO) => Promise<MailResponseDTO[]>;
}
