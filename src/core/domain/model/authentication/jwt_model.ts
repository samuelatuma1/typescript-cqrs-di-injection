export class AccessTokenPayload {
    email: string;
    roles: string[];
    permissions: string[];
    isAdmin: boolean;
}

export class RefreshTokenPayload {
    email: string
}