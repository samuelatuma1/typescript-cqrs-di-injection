import { TimeUnit } from "../utiliities/time_unit";

export class EventQueueSizeStrategyRetention {
  public duration: number;
  public unit : TimeUnit

  public constructor(init: {duration: number, unit: TimeUnit}){
    this.duration = init.duration;
    this.unit = init.unit;
  }
}
export class EventQueueSizeStrategyMaxLength{
  public maxLength: number

  public constructor(init: {maxLength: number}){
    this.maxLength = init.maxLength;
  }
}
export interface IMessageHandler {
    (message: any, messageId: string): Promise<boolean>;
  }

export interface listenToQueueOptions {
    queueName: string;
    consumerGroupName: string;
    consumerName: string;
    maxNumberOfEntries: number;
    messageHandler: IMessageHandler;
    
    saveFailedProcessesToDeadLetterQueue?: {
      maxReprocessRetry: number,
      deadLetterQueueName: string,
      sizeStrategy?: EventQueueSizeStrategyRetention | EventQueueSizeStrategyMaxLength
    }
}