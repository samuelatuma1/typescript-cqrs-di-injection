import { ObjectId, Types } from "mongoose";
import BaseEntity from "../common/entity/base_entity";

export default class UserPermission extends BaseEntity<Types.ObjectId>{
    public name: string;
    public desc: string = "";

    public constructor(name: string, desc: string = ""){
        var id = new Types.ObjectId();
        super(id);
        this.name = name;
        this.desc = desc;
    }
}