export declare class CreateCartItemRequest {
    product: string;
    qty: number;
}
export declare class CreateCartRequest {
    cartItems: CreateCartItemRequest[];
    user: string;
}
