import ReviewCreatedEventDTO from "../../../../../domain/model/events/review_created_event_dto";
export default interface IProductServiceProducer {
    publishReviewCreated(reviewCreatedEventDTO: ReviewCreatedEventDTO): Promise<string | null>;
}
export declare const IIProductServiceProducer = "IProductServiceProducer";
