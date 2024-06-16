import BaseEntity from "../common/entity/base_entity";
export default class User extends BaseEntity<string> {
    name?: string;
    email: string;
    password: string;
}
