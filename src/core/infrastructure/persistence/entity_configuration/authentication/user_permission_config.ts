import { model, Schema } from "mongoose";
import UserPermission from "../../../../domain/authentication/user_permission";

var permissionSchema = new Schema<UserPermission>({
    createdAt: { type: Date, required: true },
    updatedAt : { type: Date, required: true },
    recordStatus: {type: String, required: true},

    name: {type: String, required: true},
    desc: {type: String, default: ""}
});

export const userPermissionModel  = model<UserPermission>("UserPermission", permissionSchema);