import { iocContainer } from "../../../api/program";
import IOrderServiceConsumer, { IIOrderServiceConsumer } from "../../../core/application/contract/events/shop/consumer/order_service_consumer";
import { inject, injectable } from "tsyringe";

@injectable()
export default class OrderServiceEventManager {
    public constructor(@inject(IIOrderServiceConsumer) private readonly orderServiceConsumer: IOrderServiceConsumer){

    }

    public consumeCreateOrderService = async () => {
        console.log(`Consuming create order service`)
        await this.orderServiceConsumer.listenForNewOrderCreateEvent();
    }
}


export const orderServiceEventManager = iocContainer.resolve(OrderServiceEventManager);