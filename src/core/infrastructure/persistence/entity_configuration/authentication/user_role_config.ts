import { model, Schema, Types } from "mongoose";
import UserRole from "core/domain/authentication/entity/user_role";

var roleSchema = new Schema<UserRole>({
    createdAt: { type: Date, required: true },
    updatedAt : { type: Date, required: true },
    recordStatus: {type: String, required: true},

    name: {type: String, required: true},
    desc: {type: String, default: ""},
    permissions: [{type: Types.ObjectId, ref: 'UserPermission' }]
});

export const userRoleModel  = model<UserRole>("UserRole", roleSchema);