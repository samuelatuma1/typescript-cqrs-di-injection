import jwt from 'jsonwebtoken';

export default class Jwt {
    public static encode = (payload: {[key: string]: any}, expiresInSeconds: number, secret: string): string => {
        return jwt.sign(payload, secret, { expiresIn: expiresInSeconds});
    }

    public static decode = (token: string,  secret: string): any => {
        return jwt.verify(token, secret);
    }
}

let secret = "sbdvbd c dbdnb  dvndn dnnd n dndsggsdhegvvssv"
let token = Jwt.encode({name: "sam", age: 12}, 1, secret)

setTimeout(() => {
    let obj = Jwt.decode(token, secret);
    console.log({token, obj})

}, 2000)
