import { Types } from "mongoose";
import BaseEntity from "../../common/entity/base_entity";
import UserRole from "./user_role";
import UserPermission from "./user_permission";
import Address from "./address";
import { UserStatus } from "../enum/user_status";



export default class User extends BaseEntity<Types.ObjectId>{
    public name?: string;
    public email!: string;
    public password!: string;
    public isactive: boolean = true;
    public isadmin: boolean = false;
    public roles: Types.ObjectId[] | UserRole[] = []
    public status: UserStatus | string = UserStatus.PENDING_VERIFICATION
    public address: Types.ObjectId | Address | null = null
    public permissions: Types.ObjectId[] | UserPermission[] = []

    public constructor(
        email: string, password: string , name: string = '', permissions: Types.ObjectId[] | UserPermission[] = [], roles: Types.ObjectId[] | UserRole[] = [],
        status: UserStatus = UserStatus.PENDING_VERIFICATION
    ){
        const id = new Types.ObjectId();
        super(id);
        this.email = email;
        this.name = name,
        this.password = password;
        
        this.permissions = permissions;
        this.roles = roles;
        this.address = null;
        this.status = status;
    }

}