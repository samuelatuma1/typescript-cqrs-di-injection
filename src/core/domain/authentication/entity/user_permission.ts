import { ObjectId, Types } from "mongoose";
import BaseEntity from "../../common/entity/base_entity";

interface UserPermissionInit {
    name: string;
    desc?: string
}
export default class UserPermission extends BaseEntity<Types.ObjectId>{
    public name: string;
    public desc: string = "";

    constructor(name: string, desc: string);
    constructor(init: UserPermissionInit)
    public constructor(nameOrInit: string | UserPermissionInit = '', desc: string = ""){
        const id = new Types.ObjectId();
        super(id);
        if(typeof nameOrInit === 'string'){
            this.name = nameOrInit;
            this.desc = desc;
        }
        else{
            this.name = nameOrInit.name;
            this.desc = nameOrInit.desc;
        }
    }
}