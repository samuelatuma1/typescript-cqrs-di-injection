import IJwtService from '../../../application/contract/services/authentication/jwt_service';
import jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';

@injectable()
export default class JwtService implements IJwtService{
    public  encode = (payload: {[key: string]: any}, expiresInSeconds: number, secret: string): string => {
        return jwt.sign(payload, secret, { expiresIn: expiresInSeconds});
    }

    public  decode<T>(token: string,  secret: string): T {
        console.log({token})
        return jwt.verify(token, secret) as T;
    }
}