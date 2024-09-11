import Review from "../../../../domain/shop/entity/review";
import { BaseRepository } from "../../../../infrastructure/persistence/data_access/common/base_repository";
import { Types } from "mongoose";

export default interface IReviewRepository extends BaseRepository<Review, Types.ObjectId>{

}

export const IIReviewRepository ='IReviewRepository';