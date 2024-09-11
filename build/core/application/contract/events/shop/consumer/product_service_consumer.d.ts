export default interface IProductServiceConsumer {
    listenFoNewReviewCreatedEvent(): Promise<void>;
}
export declare const IIProductServiceConsumer = "IProductServiceConsumer";
