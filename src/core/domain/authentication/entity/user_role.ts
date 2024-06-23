import { Types } from "mongoose";
import BaseEntity from "../../common/entity/base_entity";
import UserPermission from "./user_permission";

export default class UserRole extends BaseEntity<Types.ObjectId>{
    public name: string;
    public desc: string;

    public permissions: Types.ObjectId[] | UserPermission[] = [];

    public constructor(name: string, desc: string = "", permissions: Types.ObjectId[] | UserPermission[] = []){
        const id = new Types.ObjectId();
        super(id);
        this.name = name;
        this.desc = desc;
        this.permissions = [];
    }
}