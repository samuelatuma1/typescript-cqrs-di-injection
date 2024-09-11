import ReviewCreatedEventDTO from "../../../../domain/model/events/review_created_event_dto";
import { CreateProductReview } from "../../../../domain/shop/dto/requests/review_requests";
import Review from "../../../../domain/shop/entity/review";
export default interface IProductLogic {
    createReviewForProduct(createProductReview: CreateProductReview): Promise<Review>;
    handleReviewCreatedEvent(reviewCreatedEventDTO: ReviewCreatedEventDTO): Promise<boolean>;
}
export declare const IIProductLogic = "IProductLogic";
