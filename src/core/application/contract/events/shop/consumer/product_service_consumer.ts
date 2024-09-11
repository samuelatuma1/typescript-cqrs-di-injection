export default interface IProductServiceConsumer{
    listenFoNewReviewCreatedEvent(): Promise<void>
}

export const IIProductServiceConsumer = "IProductServiceConsumer"