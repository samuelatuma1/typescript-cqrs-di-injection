import IProductServiceConsumer from "../../../core/application/contract/events/shop/consumer/product_service_consumer";
export default class ProductServiceEventManager {
    private readonly productServiceConsumer;
    constructor(productServiceConsumer: IProductServiceConsumer);
    consumeCreateReviewService: () => Promise<void>;
}
export declare const productServiceEventManager: ProductServiceEventManager;
