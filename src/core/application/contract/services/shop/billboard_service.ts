import { Types } from "mongoose";
import { CreateBillboardRequest, SearchBillboardRequest, UpdateBillboardRequest } from "../../../../domain/shop/dto/requests/billboard_requests";
import Billboard from "core/domain/shop/entity/bill_board";

export interface IBillboardService {
    createBillBoard  ( createBillboardRequest: CreateBillboardRequest) : Promise<Billboard> ;

    updateBillBoard(id: string | Types.ObjectId, update: UpdateBillboardRequest): Promise<Billboard>;

    deleteBillboard (id: string | Types.ObjectId): Promise<Billboard>;

    getActiveBillboards  (): Promise<Billboard[]>;

    getBillboard(id: Types.ObjectId | string): Promise<Billboard | null>;

    search (searchBillboardRequest: SearchBillboardRequest) : Promise<Billboard[]>
}

export const IIBillboardService = "IBillboardService"; 