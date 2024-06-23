import { Types } from "mongoose"

export default class CreatePermissionResponseDTO{
    public name: string = "";
    public _id?: Types.ObjectId;
    public desc?: string = "";

    public constructor(id?: Types.ObjectId, name: string = "", desc: string = ""){
        this._id = id;
        this.name = name;
        this.desc = desc;
    }
}