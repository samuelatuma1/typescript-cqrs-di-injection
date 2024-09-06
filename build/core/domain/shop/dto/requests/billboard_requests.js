"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchBillboardRequest = exports.UpdateBillboardRequest = exports.CreateBillboardRequest = void 0;
class CreateBillboardRequest {
    data(data) {
        throw new Error("Method not implemented.");
    }
    img;
    title;
    desc;
    billboardRef;
    // public isActive: boolean;
    billboardType;
    filters;
}
exports.CreateBillboardRequest = CreateBillboardRequest;
class UpdateBillboardRequest {
    img;
    title;
    desc;
    isActive;
    billboardType;
    filters;
}
exports.UpdateBillboardRequest = UpdateBillboardRequest;
class SearchBillboardRequest {
    title;
    desc;
    isActive;
    billboardType;
}
exports.SearchBillboardRequest = SearchBillboardRequest;
//# sourceMappingURL=billboard_requests.js.map