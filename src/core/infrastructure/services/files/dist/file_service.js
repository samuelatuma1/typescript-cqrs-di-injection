"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var cloudinary_config_1 = require("../../../../core/application/common/config/cloudinary_config");
var event_tracer_1 = require("../../../../core/application/contract/observability/event_tracer");
var tsyringe_1 = require("tsyringe");
var cloudinary_1 = require("cloudinary");
var upload_file_1 = require("../../../../core/domain/common/model/upload_file");
var fs_1 = require("fs");
var path_1 = require("path");
var CloudinaryService = /** @class */ (function () {
    function CloudinaryService(cloudinaryConfig, eventTracer) {
        var _this = this;
        this.cloudinaryConfig = cloudinaryConfig;
        this.eventTracer = eventTracer;
        this.uploadFile = function (file) { return __awaiter(_this, void 0, Promise, function () {
            var kwargs, response, ex_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        kwargs = {};
                        this.eventTracer.say("Creating file in Folder: " + file.folder + " with name " + ((_a = file.name) !== null && _a !== void 0 ? _a : file.secure_url));
                        this.eventTracer.request = file;
                        if (file.resource_type)
                            kwargs.resource_type = file.resource_type;
                        if (file.folder)
                            kwargs.folder = file.folder;
                        if (file.public_id)
                            kwargs.public_id = file.public_id;
                        return [4 /*yield*/, cloudinary_1.v2.uploader.upload(file.secure_url, kwargs)];
                    case 1:
                        response = _b.sent();
                        this.eventTracer.response = response;
                        this.eventTracer.isSuccessWithMessage("Successfully created file");
                        this.deleteFileFromDisk(file.secure_url); // No need to await deleting, just delete
                        if (response && response.public_id) {
                            return [2 /*return*/, new upload_file_1["default"](response.resource_type, response.secure_url, response.public_id, response.folder)];
                        }
                        return [2 /*return*/, null];
                    case 2:
                        ex_1 = _b.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_1);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.uploadMultipleFiles = function (files) { return __awaiter(_this, void 0, Promise, function () {
            var allFilesToUpload, results, uploadedFiles, _i, results_1, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        allFilesToUpload = files.map(function (file) { return _this.uploadFile(file); });
                        return [4 /*yield*/, Promise.allSettled(allFilesToUpload)];
                    case 1:
                        results = _a.sent();
                        uploadedFiles = [];
                        for (_i = 0, results_1 = results; _i < results_1.length; _i++) {
                            result = results_1[_i];
                            if (result.status === "fulfilled" && result.value) {
                                uploadedFiles.push(result.value);
                            }
                            else if (result.status === "rejected") {
                                this.eventTracer.isExceptionWithMessage("Failed to upload file: " + result.reason);
                            }
                        }
                        return [2 /*return*/, uploadedFiles];
                }
            });
        }); };
        this.deleteFile = function (publicId) { return __awaiter(_this, void 0, Promise, function () {
            var response, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.eventTracer.say("\"Deleting file with public id " + publicId);
                        return [4 /*yield*/, cloudinary_1.v2.uploader.destroy(publicId)];
                    case 1:
                        response = _a.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(response, "Successfully deleted");
                        return [3 /*break*/, 3];
                    case 2:
                        ex_2 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_2);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteFileFromDisk = function (url) { return __awaiter(_this, void 0, void 0, function () {
            var deleted, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs_1.promises.unlink(path_1["default"].join(process.cwd(), url))];
                    case 1:
                        deleted = _a.sent();
                        console.log({ deleted: deleted });
                        return [3 /*break*/, 3];
                    case 2:
                        ex_3 = _a.sent();
                        console.error("file in path " + url + " not deleted with error: " + ex_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        cloudinary_1.v2.config({
            cloud_name: cloudinaryConfig.CLOUD_NAME,
            api_key: cloudinaryConfig.API_KEY,
            api_secret: cloudinaryConfig.API_SECRET,
            secure: true
        });
        this.eventTracer = eventTracer;
    }
    CloudinaryService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(cloudinary_config_1.IICloudinaryConfig)),
        __param(1, tsyringe_1.inject(event_tracer_1.IIEventTracer))
    ], CloudinaryService);
    return CloudinaryService;
}());
exports["default"] = CloudinaryService;
