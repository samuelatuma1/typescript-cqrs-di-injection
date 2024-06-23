import { Types } from "mongoose";

export default class AddRolesToUserRequest{
    public userId: Types.ObjectId;
    public roles: string[] = [];

    public constructor(userId: string | Types.ObjectId, roles: string[]){
        this.userId = new Types.ObjectId(userId);
        this.roles = roles;
    }
}