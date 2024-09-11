export default interface IOrderServiceConsumer {
    listenForNewOrderCreateEvent(): Promise<void>;
    listenForOrderEvents(): Promise<void>;
}
export declare const IIOrderServiceConsumer = "IOrderServiceConsumer";
