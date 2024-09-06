"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ApiRequest = /** @class */ (function () {
    function ApiRequest() {
    }
    return ApiRequest;
}());
console.log(Buffer.from("7239275c098b47b28ad805c7ed5afeac:3cdbda2cded34e128249ba3485eeb84d").toString('base64'));
function getTickets(query) {
    return __awaiter(this, void 0, void 0, function () {
        "/api/1.1/json/tickets/";
        var baseUrl, res, resp, ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    baseUrl = "https://flutterwave.happyfox.com/api/1.1/json/tickets/?size=" + query.size + "&page=" + query.page + "&category=" + 453;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch(baseUrl, {
                            headers: {
                                Authorization: "Basic " + Buffer.from("7239275c098b47b28ad805c7ed5afeac:3cdbda2cded34e128249ba3485eeb84d").toString('base64'),
                                'Content-Type': 'application/json'
                            },
                            method: 'GET'
                        })];
                case 2:
                    res = _a.sent();
                    if (!res.ok) return [3 /*break*/, 4];
                    console.log("Success");
                    return [4 /*yield*/, res.json()];
                case 3:
                    resp = _a.sent();
                    console.log("########################################");
                    console.log("########################################");
                    console.log(resp.data);
                    console.log("########################################");
                    console.log("########################################");
                    return [2 /*return*/, resp];
                case 4:
                    console.log("Error");
                    return [4 /*yield*/, res.json()];
                case 5: return [2 /*return*/, _a.sent()];
                case 6:
                    ex_1 = _a.sent();
                    console.log(ex_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
;
var HappyFox = /** @class */ (function () {
    function HappyFox() {
        var _this = this;
        this.getTickets = function () { return __awaiter(_this, void 0, void 0, function () {
            var tickets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getTickets({ size: 10, page: 1 })];
                    case 1:
                        tickets = _a.sent();
                        console.log({ tickets: tickets });
                        return [2 /*return*/];
                }
            });
        }); };
        this.createTicket = function (form) { return __awaiter(_this, void 0, Promise, function () {
            var baseUrl, res, resp, errResp, _i, _a, _b, key, val, ex_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        baseUrl = "https://flutterwave.happyfox.com/api/1.1/json/tickets";
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, fetch(baseUrl, {
                                headers: {
                                    Authorization: "Basic " + Buffer.from("7239275c098b47b28ad805c7ed5afeac:3cdbda2cded34e128249ba3485eeb84d").toString('base64'),
                                    'Content-Type': 'application/json'
                                },
                                method: 'POST',
                                body: JSON.stringify(form)
                            })];
                    case 2:
                        res = _c.sent();
                        if (!res.ok) return [3 /*break*/, 4];
                        console.log("Success");
                        return [4 /*yield*/, res.json()];
                    case 3:
                        resp = _c.sent();
                        console.log("########################################");
                        console.log("########################################");
                        console.log(resp.data);
                        console.log("########################################");
                        console.log("########################################");
                        return [2 /*return*/, resp];
                    case 4:
                        console.log("Error");
                        return [4 /*yield*/, res.json()];
                    case 5:
                        errResp = _c.sent();
                        for (_i = 0, _a = Object.entries(errResp.error); _i < _a.length; _i++) {
                            _b = _a[_i], key = _b[0], val = _b[1];
                            console.log({ key: key, val: val });
                        }
                        console.log({ errResp: errResp.error });
                        return [4 /*yield*/, res.json()];
                    case 6: return [2 /*return*/, _c.sent()];
                    case 7:
                        ex_2 = _c.sent();
                        console.log(ex_2);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
    }
    return HappyFox;
}());
var happyFox = new HappyFox();
// happyFox.getTickets();
happyFox.createTicket({
    name: "Test create ticket in Incident Outage - 1",
    email: "samuel.atuma@flutterwavego.com",
    phone: "+23470000000",
    subject: "Test create ticket in Incident Outage - Subject",
    text: "Test create ticket in Incident Outage - Body",
    category: "453",
    "t-cf-409": "1M:00S",
    "t-cf-407": "Test Incident",
    "t-cf-406": new Date("2024-08-26"),
    "t-cf-435": "Incident",
    "t-cf-506": "Samuel",
    "t-cf-405": ["GHANA"]
});
