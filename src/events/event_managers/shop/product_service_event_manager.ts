import IProductServiceConsumer, { IIProductServiceConsumer } from "../../../core/application/contract/events/shop/consumer/product_service_consumer";
import { iocContainer } from "../../../api/program";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ProductServiceEventManager {
    public constructor(@inject(IIProductServiceConsumer) private readonly productServiceConsumer: IProductServiceConsumer){

    }

    public consumeCreateReviewService = async () => {
        console.log(`Consuming create order service`)
        await this.productServiceConsumer.listenFoNewReviewCreatedEvent();
    }
}


export const productServiceEventManager = iocContainer.resolve(ProductServiceEventManager);