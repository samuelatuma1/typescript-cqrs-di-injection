import BaseEntity from "../common/entity/base_entity";

export default class User extends BaseEntity<string>{
    public name?: string;
    public email!: string;
    public password!: string;

}