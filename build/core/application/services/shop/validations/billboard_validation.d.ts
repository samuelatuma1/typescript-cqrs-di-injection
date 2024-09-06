import { CreateBillboardRequest } from "../../../../domain/shop/dto/requests/billboard_requests";
import { Validator } from "fluentvalidation-ts";
export declare class CreateBillboardValidator extends Validator<CreateBillboardRequest> {
    constructor();
    private isVAalidBillBoardType;
}
