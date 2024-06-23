"use strict";
exports.__esModule = true;
var UploadFile = /** @class */ (function () {
    function UploadFile(resource_typeOrInit, secure_url, public_id, folder) {
        if (resource_typeOrInit === void 0) { resource_typeOrInit = ""; }
        if (secure_url === void 0) { secure_url = ""; }
        if (public_id === void 0) { public_id = ""; }
        if (folder === void 0) { folder = ""; }
        var _a, _b, _c, _d;
        this.resource_type = "";
        this.secure_url = "";
        this.public_id = "";
        this.folder = "";
        this.name = "";
        if (typeof resource_typeOrInit === 'string') {
            this.resource_type = resource_typeOrInit;
            this.secure_url = secure_url;
            this.public_id = public_id;
            this.folder = folder;
        }
        else {
            this.resource_type = (_a = resource_typeOrInit.resource_type) !== null && _a !== void 0 ? _a : '';
            this.secure_url = (_b = resource_typeOrInit.secure_url) !== null && _b !== void 0 ? _b : '';
            ;
            this.public_id = (_c = resource_typeOrInit.public_id) !== null && _c !== void 0 ? _c : '';
            ;
            this.folder = (_d = resource_typeOrInit.folder) !== null && _d !== void 0 ? _d : '';
            ;
        }
    }
    return UploadFile;
}());
exports["default"] = UploadFile;
