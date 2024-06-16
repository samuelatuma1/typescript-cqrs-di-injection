import { ObjectId } from "mongoose";
import BaseEntity from "../common/entity/base_entity";

export default class UserRole extends BaseEntity<ObjectId>{
    public name!: string;
    public desc: string = "";
    
}