import { BillboardType } from "../../../../domain/shop/enum/billboard_type";
import { CreateBillboardRequest } from "../../../../domain/shop/dto/requests/billboard_requests";
import { Validator } from "fluentvalidation-ts";

export class CreateBillboardValidator extends Validator<CreateBillboardRequest> {
    public constructor(){
        super();

        this.ruleFor('title')
            .notEmpty()
            .notNull()
            .withMessage("Please input a title")
            
            this.ruleFor('billboardType')
            .notEmpty()
            .notNull()
            .withMessage("Please provide billboard type")
            .must( (x: string) => this.isVAalidBillBoardType(x))
            .withMessage("Invalid billboard type");

        this.ruleFor('billboardRef')
            .notNull()
            .must(x => x.toString().length > 0)

        
    }

    private isVAalidBillBoardType = (createBillboardReq: string): boolean => {
        return Object.values(BillboardType).includes(createBillboardReq as BillboardType)
    }
}