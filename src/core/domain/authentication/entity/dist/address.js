"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.City = exports.State = exports.Country = void 0;
var base_entity_1 = require("../../../domain/common/entity/base_entity");
var mongoose_1 = require("mongoose");
var Country = /** @class */ (function (_super) {
    __extends(Country, _super);
    function Country(init) {
        var _this = _super.call(this, new mongoose_1.Types.ObjectId()) || this;
        _this.name = init.name;
        _this.code = init.code;
        return _this;
    }
    return Country;
}(base_entity_1["default"]));
exports.Country = Country;
var State = /** @class */ (function (_super) {
    __extends(State, _super);
    function State(init) {
        var _this = _super.call(this, new mongoose_1.Types.ObjectId()) || this;
        _this.name = init.name;
        _this.code = init.code;
        _this.countryCode = init.countryCode;
        return _this;
    }
    return State;
}(base_entity_1["default"]));
exports.State = State;
var City = /** @class */ (function (_super) {
    __extends(City, _super);
    function City(init) {
        var _this = _super.call(this, new mongoose_1.Types.ObjectId()) || this;
        _this.name = init.name;
        _this.code = init.code;
        _this.state = init.state;
        return _this;
    }
    return City;
}(base_entity_1["default"]));
exports.City = City;
var Address = /** @class */ (function (_super) {
    __extends(Address, _super);
    function Address() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.extraDetails = "";
        _this.phone = "";
        return _this;
    }
    return Address;
}(base_entity_1["default"]));
exports["default"] = Address;
