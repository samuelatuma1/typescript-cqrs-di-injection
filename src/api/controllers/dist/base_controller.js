"use strict";
exports.__esModule = true;
var upload_file_1 = require("../../core/domain/common/model/upload_file");
var BaseController = /** @class */ (function () {
    function BaseController() {
        this.convertReqFileToUploadFile = function (req) {
            try {
                return new upload_file_1["default"]({ secure_url: req.file.path });
            }
            catch (ex) {
                console.log("An exception occured while converting Req file to upload file: " + ex + " ");
                return null;
            }
        };
        this.convertReqFilesToUploadFiles = function (req, fieldName) {
            var _a;
            if (fieldName === void 0) { fieldName = null; }
            var uploadFiles = [];
            try {
                var files = req.files;
                if (Array.isArray(files)) {
                    uploadFiles = files.map(function (file) { return new upload_file_1["default"]({ secure_url: file.path }); });
                }
                else {
                    uploadFiles = (_a = files[fieldName]) === null || _a === void 0 ? void 0 : _a.map(function (file) { return new upload_file_1["default"]({ secure_url: file.path }); });
                }
                return uploadFiles;
            }
            catch (ex) {
                console.log("An exception occured while converting Req files to upload files: " + ex + " ");
                return uploadFiles;
            }
        };
    }
    return BaseController;
}());
exports["default"] = BaseController;
