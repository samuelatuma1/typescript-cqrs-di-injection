export default interface IOrderServiceConsumer {
    listenForNewOrderCreateEvent (): Promise<void> 
    listenForOrderEvents(): Promise<void>

}

export const IIOrderServiceConsumer = "IOrderServiceConsumer";