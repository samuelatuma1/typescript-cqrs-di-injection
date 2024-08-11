import { Types } from "mongoose";
import UploadFile from "../../../../domain/common/model/upload_file";
import { BillboardType } from "../../enum/billboard_type";

export class CreateBillboardRequest {
    data<T>(data: any) {
      throw new Error("Method not implemented.");
    }
    public img: UploadFile;
    public title: string;
    public desc: string;
    public billboardRef: string | Types.ObjectId;
    // public isActive: boolean;
    public billboardType: BillboardType;
    public filters: {[key: string]: string} | null;
}
export class UpdateBillboardRequest {
    public img?: UploadFile;
    public title?: string;
    public desc?: string;
    public isActive?: boolean;
    public billboardType?: BillboardType;
    public filters?: {[key: string]: string} | null;
}

export class SearchBillboardRequest {
    public title?: string;
    public desc?: string;
    public isActive?: boolean | string;
    public billboardType?: BillboardType;
}