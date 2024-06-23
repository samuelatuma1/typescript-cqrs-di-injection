"use strict";
exports.__esModule = true;
exports.CreateCategoryRequest = exports.UpdateFilterRequest = exports.CreateFilterRequest = void 0;
var CreateFilterRequest = /** @class */ (function () {
    function CreateFilterRequest() {
        this.categoryId = null;
    }
    return CreateFilterRequest;
}());
exports.CreateFilterRequest = CreateFilterRequest;
var UpdateFilterRequest = /** @class */ (function () {
    function UpdateFilterRequest() {
    }
    return UpdateFilterRequest;
}());
exports.UpdateFilterRequest = UpdateFilterRequest;
var CreateCategoryRequest = /** @class */ (function () {
    function CreateCategoryRequest() {
        this.img = null;
        this.parentCategory = null;
        this.filters = [];
    }
    return CreateCategoryRequest;
}());
exports.CreateCategoryRequest = CreateCategoryRequest;
