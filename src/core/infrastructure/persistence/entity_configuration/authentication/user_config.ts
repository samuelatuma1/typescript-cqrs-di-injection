import User from "core/domain/authentication/entity/user";
import { model, Schema, Types } from "mongoose";

var userSchema = new Schema<User>({
    createdAt: { type: Date, required: true },
    updatedAt : { type: Date, required: true },
    recordStatus: {type: String, required: true},

    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isactive: {type: Boolean, default: true},
    isadmin: {type: Boolean, default: false},
    permissions: [{type: Types.ObjectId, ref: 'UserPermission' }],
    roles: [{type: Types.ObjectId, ref: 'UserRole'}]
});

export const userModel  = model<User>("User", userSchema);