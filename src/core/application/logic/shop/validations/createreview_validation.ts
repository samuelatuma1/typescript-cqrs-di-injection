import { Types } from "mongoose";
import { CreateProductReview } from "../../../../domain/shop/dto/requests/review_requests";
import { Validator } from "fluentvalidation-ts";

export default class CreateReviewValidation extends Validator<CreateProductReview>{
    public constructor(){
        super()

        this.ruleFor('rating').notNull().lessThan(6).withMessage(`Rating must nut exceed 5`);
        this.ruleFor('wouldRecommend').notNull();
        this.ruleFor('title').notEmpty().notNull();
        this.ruleFor('body').notEmpty().notNull();
        this.ruleFor('productId').notNull().must((id: string | Types.ObjectId) => {
            try{
                id = new Types.ObjectId(id)
                return true
            }
            catch(ex){
                return false
            }
        }).withMessage('Please use a valid productId')
        
    }
}