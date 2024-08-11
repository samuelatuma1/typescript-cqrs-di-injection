export class SignInUserResponse {
    email: string;
    roles: string[];
    permissions: string[];
    isAdmin: boolean;
    accessTokenExpiryInSeconds: number;
    refreshTokenExpiryInSeconds: number;
    accessToken: string;
    refreshToken: string

}