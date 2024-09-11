import IOrderServiceConsumer from "../../../core/application/contract/events/shop/consumer/order_service_consumer";
export default class OrderServiceEventManager {
    private readonly orderServiceConsumer;
    constructor(orderServiceConsumer: IOrderServiceConsumer);
    consumeCreateOrderService: () => Promise<void>;
}
export declare const orderServiceEventManager: OrderServiceEventManager;
