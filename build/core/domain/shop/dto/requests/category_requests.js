"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryRequest = exports.UpdateFilterRequest = exports.CreateFilterRequest = void 0;
class CreateFilterRequest {
    name;
    filterType;
    values;
    categoryId = null;
}
exports.CreateFilterRequest = CreateFilterRequest;
class UpdateFilterRequest {
    _id;
    name;
    filterType;
    values;
}
exports.UpdateFilterRequest = UpdateFilterRequest;
class CreateCategoryRequest {
    name;
    desc;
    urlName;
    img = null;
    parentCategory = null;
    filters = [];
}
exports.CreateCategoryRequest = CreateCategoryRequest;
//# sourceMappingURL=category_requests.js.map