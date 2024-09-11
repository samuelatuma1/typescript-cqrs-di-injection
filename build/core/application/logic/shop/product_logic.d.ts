import IProductService from "../../../application/contract/services/shop/product_service";
import Review from "../../../domain/shop/entity/review";
import IEventTracer from "../../../application/contract/observability/event_tracer";
import { CreateProductReview } from "../../../domain/shop/dto/requests/review_requests";
import IReviewRepository from "../../../application/contract/data_access/shop/review_repository";
import IProductLogic from "../../../application/contract/logic/shop/product_logic";
import IProductServiceProducer from "../../contract/events/shop/producer/product_service_producer";
import ReviewCreatedEventDTO from "../../../domain/model/events/review_created_event_dto";
import IUserService from "../../../application/contract/services/authentication/user_service";
import IMailService from "../../../application/contract/services/notification/email_service";
export default class ProductLogic implements IProductLogic {
    private readonly productService;
    private readonly eventTracer;
    private readonly reviewRepository;
    private readonly productServiceProducer;
    private readonly userService;
    private readonly mailService;
    constructor(productService: IProductService, eventTracer: IEventTracer, reviewRepository: IReviewRepository, productServiceProducer: IProductServiceProducer, userService: IUserService, mailService: IMailService);
    private convertCreateProductReviewToReview;
    createReviewForProduct: (createProductReview: CreateProductReview) => Promise<Review>;
    handleReviewCreatedEvent: (reviewCreatedEventDTO: ReviewCreatedEventDTO) => Promise<boolean>;
}
