import IReviewRepository from "../../../../application/contract/data_access/shop/review_repository";
import { BaseRepository } from "../common/base_repository";
import { Types } from "mongoose";
import Review from "../../../../domain/shop/entity/review";
import { reviewModel } from "../../entity_configuration/shop/review_config";

export default class ReviewRepository extends BaseRepository<Review, Types.ObjectId> implements IReviewRepository{
    public constructor(){
        super(reviewModel)
    }
}