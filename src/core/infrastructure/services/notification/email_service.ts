import { inject, injectable } from "tsyringe";
import IMailService from "../../../application/contract/services/notification/email_service";
import IApiService, { IIApiService } from "../../../application/contract/services/api/api_service";
import { IEmailJSConfig, IIEmailJSConfig } from "../../../application/common/config/email_config";
import { ApiRequest } from "../../../domain/model/api_service/dto/api_request";
import { ApiRequestContentType, ApiRequestMethod } from "../../../domain/model/api_service/enum/api_request";
import IEventTracer, { IIEventTracer } from "../../../application/contract/observability/event_tracer";
import { MailResponseDTO, SendEmailDTO, SendEmailToMultipleRecipientsDTO } from "../../../domain/model/notification/dto/send_email_dto";
import { setTimeout } from "timers/promises";
import DateUtility from "../../../application/common/utilities/date_utility";

 interface ISendEmailJSDTO {
    service_id: string;
    template_id: string;
    user_id: string;
    accessToken: string;
    template_params: {
        to_name: string;
        from_name: string;
        message: string;
        title: string;
        reply_to: string
    };
}


@injectable()
export default class MailService implements IMailService {
    public constructor( 
        @inject(IIApiService) private readonly apiService: IApiService,
        @inject(IIEmailJSConfig) private readonly emailConfig: IEmailJSConfig,
        @inject(IIEventTracer) private readonly eventTracer: IEventTracer
    ){

    }
    sendMail = async (emailDTO: SendEmailDTO): Promise<MailResponseDTO> => {
        this.eventTracer.say("Send Mail")
        this.eventTracer.request = emailDTO;

        let messageBody: ISendEmailJSDTO = {
            service_id: this.emailConfig.service_id,
            template_id: this.emailConfig.template_id,
            user_id: this.emailConfig.user_id,
            accessToken: this.emailConfig.access_token,
            template_params: {
                to_name: emailDTO.recipient.to_name,
                from_name:emailDTO.from_name,
                message: emailDTO.message,
                title: emailDTO.title,
                reply_to: emailDTO.recipient.to_email,
            }
        }
        let request: ApiRequest<ISendEmailJSDTO> = new ApiRequest<ISendEmailJSDTO>({
                url: this.emailConfig.url,
                method: ApiRequestMethod.POST,
                headers: {
                contentType: ApiRequestContentType.JSON,
                responseType: ApiRequestContentType.TEXT,
                },
                body: messageBody
        })
        try{
            this.eventTracer.say(`Sending email`)
            await this.apiService.apiRequest<ISendEmailJSDTO, string>(request)

            this.eventTracer.isSuccessWithMessage(`Email sent successfully`);
            return new MailResponseDTO({
                recipient: emailDTO.recipient,
                isSent: true
            })
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`)
            console.log("##################")
            console.log("##################")
            console.log({ex})
            console.log(ex)
            console.log("##################")
            console.log("##################")
            return new MailResponseDTO({
                recipient: emailDTO.recipient,
                isSent: false
            })
        }
    }

    sendToMultipleRecipients = async (emailsDTO: SendEmailToMultipleRecipientsDTO): Promise<MailResponseDTO[]> => {
        let emailResponses: MailResponseDTO[] = []
        try{
            this.eventTracer.say(`sending mail to multiple recipients`)
            this.eventTracer.request = emailsDTO
            for(let email of emailsDTO.recipients){
                let emailResponse = await this.sendMail(new SendEmailDTO({...emailsDTO, recipient: email}))
                emailResponses.push(emailResponse)
                await DateUtility.delay(1) // To avoid rate limit
            }
            this.eventTracer.isSuccessWithResponseAndMessage(emailResponses);
            console.log({emailResponses, data: emailResponses.map(d => d.recipient)})
            return emailResponses
        }catch(ex){
            console.log("##################")
            console.log("##################")
            console.log({ex})
            console.log(ex)
            console.log("##################")
            console.log("##################")
            this.eventTracer.isExceptionWithMessage(`${ex}`)
            return emailResponses;
        }
    }
}
