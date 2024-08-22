export interface IMessageHandler {
    (message: any, messageId: string): Promise<boolean>;
}
export interface listenToStreamOptions {
    streamName: string;
    consumerGroupName: string;
    consumerName: string;
    maxNumberOfEntries: number;
    messageHandler: IMessageHandler;
}
