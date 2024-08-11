export default class CreateUserRequest{
    public email!: string;
    public password!: string;
    public name: string = "";
}

export class SignInUserRequest {
    public email!: string;
    public password!: string;
};