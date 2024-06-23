import { Types } from "mongoose";

export default class AddPermissionToUserRequest{
    public userId: Types.ObjectId;
    public permissions: string[] = [];

    public constructor(userId: string | Types.ObjectId, permissions: string[]){
        this.userId = new Types.ObjectId(userId);
        this.permissions = permissions;
    }
}