import { Types } from "mongoose";

export default class CreateRoleResponse {
    public name: string;
    public desc: string = ""
    public _id: Types.ObjectId | null;
    public constructor(name: string, id: Types.ObjectId | null= null, desc: string = ""){
        this.name = name;
        this._id = id;
        this.desc = desc;
    }
}