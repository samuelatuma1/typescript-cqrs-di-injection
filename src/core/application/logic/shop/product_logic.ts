import NotFoundException from "../../../application/common/exceptions/not_found_exception"
import IProductService, { IIProductService } from "../../../application/contract/services/shop/product_service"
import Review from "../../../domain/shop/entity/review"
import { Types } from "mongoose"
import { inject, injectable } from "tsyringe"
import IEventTracer, { IIEventTracer } from "../../../application/contract/observability/event_tracer"
import { CreateProductReview } from "../../../domain/shop/dto/requests/review_requests"
import CreateReviewValidation from "./validations/createreview_validation"
import ObjectUtility from "../../../application/common/utilities/object_utility"
import ValidationException from "../../../application/common/exceptions/validation_exception"
import IReviewRepository, { IIReviewRepository } from "../../../application/contract/data_access/shop/review_repository"
import DateUtility from "../../../application/common/utilities/date_utility"
import IProductLogic from "../../../application/contract/logic/shop/product_logic"
import IProductServiceProducer, { IIProductServiceProducer } from "../../contract/events/shop/producer/product_service_producer"
import ReviewCreatedEventDTO from "../../../domain/model/events/review_created_event_dto"
import IUserService, { IIUserService } from "../../../application/contract/services/authentication/user_service"
import IMailService, { IIMailService } from "../../../application/contract/services/notification/email_service"
import { EmailMessageType, SendEmailToMultipleRecipientsDTO } from "../../../domain/model/notification/dto/send_email_dto"
import User from "../../../domain/authentication/entity/user"





@injectable()
export default class ProductLogic implements IProductLogic {
    public constructor(
        @inject(IIProductService) private readonly productService: IProductService,
        @inject(IIEventTracer) private readonly eventTracer: IEventTracer,
        @inject(IIReviewRepository) private readonly reviewRepository: IReviewRepository,
        @inject(IIProductServiceProducer) private readonly productServiceProducer: IProductServiceProducer,
        @inject(IIUserService) private readonly userService: IUserService,
        @inject(IIMailService) private readonly mailService: IMailService
    ){

    }
    

    private convertCreateProductReviewToReview = (createProductReview: CreateProductReview): Review => {
        return new Review({
            ...createProductReview,
            productId: new Types.ObjectId(createProductReview.productId),
            reviewedAt: DateUtility.getUTCNow(),
        })
    }
    public createReviewForProduct = async (createProductReview: CreateProductReview): Promise<Review> => {
        try{
            this.eventTracer.request = createProductReview;
            this.eventTracer.say(`Create Review Product For Product`)
            let validationErrors = (new CreateReviewValidation()).validate(createProductReview)
            if(ObjectUtility.objectSize(validationErrors)){
                throw new ValidationException(`Invalid Create Review`, validationErrors)
            }
            
            // get the product associated with the review
            let product = await this.productService.getProduct(new Types.ObjectId(createProductReview.productId))
            if(!product){
                throw new NotFoundException(`Product with id ${createProductReview.productId} not found`)
            }
            this.eventTracer.say(`Product found`)
            let review = this.convertCreateProductReviewToReview(createProductReview)
            this.eventTracer.say(`review converted`)
            console.log({review})

            let savedReview =  await this.reviewRepository.addAsync(review)
            this.eventTracer.say(`review saved`)
            this.eventTracer.say('Sending to Review Created Queue')
            const reviewCreatedEventDTO = new ReviewCreatedEventDTO({
                reviewId: savedReview._id,
                createdAt: DateUtility.getUTCNow()
            })
            let publishReviewCreatedEvent = await this.productServiceProducer.publishReviewCreated(reviewCreatedEventDTO);
            if(publishReviewCreatedEvent){
                this.eventTracer.say(`Successfully published Review Created Event with id ${publishReviewCreatedEvent}`)
            } else{
                this.eventTracer.say(`WARNING: Failed to publish Review Created Event with id`)
            }
            this.eventTracer.isSuccessWithResponseAndMessage(savedReview)
            return savedReview;
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`)
            throw ex;
        }
    }

    handleReviewCreatedEvent = async (reviewCreatedEventDTO: ReviewCreatedEventDTO): Promise<boolean> => {
       try{
        this.eventTracer.say("HANDLING REVIEW CREATED")
       this.eventTracer.request = reviewCreatedEventDTO;
        // Notify all appropriate admins a review has been created
        // get review
        let review = await this.reviewRepository.getByIdAsync(new Types.ObjectId(reviewCreatedEventDTO.reviewId), {reviewedBy: true});
        let product = await this.productService.getProduct(review.productId);
        let reviewedBy: User = null
        
        if(review.reviewedBy instanceof User){
            reviewedBy = review.reviewedBy
        }
        
        let userPermissionsToNotify = ["createproduct", "updateproduct"]
        let userRolesToNotify = ["productmanager"]
        let usersToNotify = await this.userService.getUsersWithRolesOrPermissions({permissions: userPermissionsToNotify, roles: userRolesToNotify})
        if(usersToNotify.length){
            let emailRecipients = usersToNotify.map(user => ({
                to_email: user.email,
                to_name: user.name ?? ""
            }))
            let recipitentsMail = new SendEmailToMultipleRecipientsDTO({
                recipients: emailRecipients,
                from_name: "Notification Department",
                title: `New review with topic ${review.title} for product ${product.name}`,
                message: `User with name: ${reviewedBy?.name ?? "unknown"} rated  ${product.name} ${review.rating} stars`,
                messageType: EmailMessageType.HTML
            })

            let mailResponses = await this.mailService.sendToMultipleRecipients(recipitentsMail);
            this.eventTracer.isSuccessWithResponseAndMessage(mailResponses);
            return true
        }
        this.eventTracer.isSuccessWithMessage("No user found to notify")
        return true;
       }
       catch(ex){
        this.eventTracer.isExceptionWithMessage(`${ex}`)
        return false;
       }
    }
}