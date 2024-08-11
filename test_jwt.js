let jwt = require('jsonwebtoken')
class Jwt {
    static encode = (payload, expiresInSeconds, secret) => {
        return jwt.sign(payload, secret, { expiresIn: expiresInSeconds});
    }

    static decode = (token,  secret) => {
        return jwt.verify(token, secret);
    }
}

let secret = "sbdvbd c dbdnb  dvndn dnnd n dndsggsdhegvvssv"
let token = Jwt.encode({name: "sam", age: 12}, 1200, secret)

let obj = Jwt.decode(token, secret);

console.log({token, obj})