"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Jwt = /** @class */ (function () {
    function Jwt() {
    }
    Jwt.encode = function (payload, expiresInSeconds, secret) {
        return jsonwebtoken_1["default"].sign(payload, secret, { expiresIn: expiresInSeconds });
    };
    Jwt.decode = function (token, secret) {
        return jsonwebtoken_1["default"].verify(token, secret);
    };
    return Jwt;
}());
exports["default"] = Jwt;
var secret = "sbdvbd c dbdnb  dvndn dnnd n dndsggsdhegvvssv";
var token = Jwt.encode({ name: "sam", age: 12 }, 1, secret);
setTimeout(function () {
    var obj = Jwt.decode(token, secret);
    console.log({ token: token, obj: obj });
}, 2000);
