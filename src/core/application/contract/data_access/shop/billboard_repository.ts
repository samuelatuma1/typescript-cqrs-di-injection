import Billboard from "../../../../domain/shop/entity/bill_board";
import IBaseRepository from "../common/base_repository";
import { Types } from "mongoose";

export default interface IBillboardRepository  extends IBaseRepository<Billboard, Types.ObjectId>{}

export const IIBillboardRepository = "IBillboardRepository";