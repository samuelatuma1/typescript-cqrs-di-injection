"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var event_tracer_1 = require("../../../application/contract/observability/event_tracer");
var tsyringe_1 = require("tsyringe");
var billboard_repository_1 = require("../../../application/contract/data_access/shop/billboard_repository");
var bill_board_1 = require("../../../domain/shop/entity/bill_board");
var mongoose_1 = require("mongoose");
var object_utility_1 = require("../../../application/common/utilities/object_utility");
var file_service_1 = require("../../../application/contract/services/files/file_service");
var not_found_exception_1 = require("../../../application/common/exceptions/not_found_exception");
var out_of_range_exception_1 = require("../../../application/common/exceptions/out_of_range_exception");
var billboard_validation_1 = require("./validations/billboard_validation");
var validation_exception_1 = require("../../../application/common/exceptions/validation_exception");
var BillboardService = /** @class */ (function () {
    function BillboardService(eventTracer, billboardRepository, fileService) {
        var _this = this;
        this.eventTracer = eventTracer;
        this.billboardRepository = billboardRepository;
        this.fileService = fileService;
        this.maxActiveBillBoard = 3;
        this.createBillBoard = function (createBillboardRequest) { return __awaiter(_this, void 0, Promise, function () {
            var validationErrors, _a, billBoard, response, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        validationErrors = (new billboard_validation_1.CreateBillboardValidator()).validate(createBillboardRequest);
                        if (object_utility_1["default"].objectSize(validationErrors)) {
                            throw new validation_exception_1["default"]("Invalid create billboard request", validationErrors);
                        }
                        this.eventTracer.request = createBillboardRequest;
                        this.eventTracer.say("Billboard: Create Billboard");
                        if (!createBillboardRequest.img) return [3 /*break*/, 2];
                        _a = createBillboardRequest;
                        return [4 /*yield*/, this.fileService.uploadFile(createBillboardRequest.img)];
                    case 1:
                        _a.img = _b.sent();
                        _b.label = 2;
                    case 2:
                        billBoard = new bill_board_1["default"](__assign(__assign({}, createBillboardRequest), { isActive: false }));
                        return [4 /*yield*/, this.billboardRepository.addAsync(billBoard)];
                    case 3:
                        response = _b.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(response);
                        return [2 /*return*/, response];
                    case 4:
                        ex_1 = _b.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_1);
                        throw ex_1;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.updateBillBoard = function (id, update) { return __awaiter(_this, void 0, Promise, function () {
            var billBoardId, billBoard, cleanedUpdate, activeBillBoardsCount, _a, response, ex_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        this.eventTracer.say("UpdateBillboard with id: " + id);
                        billBoardId = new mongoose_1.Types.ObjectId(id);
                        return [4 /*yield*/, this.billboardRepository.getByIdAsync(billBoardId)];
                    case 1:
                        billBoard = _b.sent();
                        if (!billBoard) {
                            throw new not_found_exception_1["default"]("Billboard with id " + id + " not found");
                            // delete ex
                        }
                        cleanedUpdate = object_utility_1["default"].removeNullOrUndefinedValuesFromObject(update);
                        this.eventTracer.request = cleanedUpdate;
                        if (!(!billBoard.isActive && cleanedUpdate.isActive)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.billboardRepository.getAsync({ isActive: true })];
                    case 2:
                        activeBillBoardsCount = (_b.sent()).length;
                        if (activeBillBoardsCount >= this.maxActiveBillBoard) {
                            throw new out_of_range_exception_1["default"]("Maximum number of active billboards reached");
                        }
                        _b.label = 3;
                    case 3:
                        if (!cleanedUpdate.img) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.fileService.deleteFile(billBoard.img.public_id)];
                    case 4:
                        _b.sent();
                        _a = cleanedUpdate;
                        return [4 /*yield*/, this.fileService.uploadFile(cleanedUpdate.img)];
                    case 5:
                        _a.img = _b.sent();
                        _b.label = 6;
                    case 6: return [4 /*yield*/, this.billboardRepository.updateByIdAsync(billBoardId, cleanedUpdate)];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, this.billboardRepository.getByIdAsync(billBoardId)];
                    case 8:
                        response = _b.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(response);
                        return [2 /*return*/, response];
                    case 9:
                        ex_2 = _b.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_2);
                        throw ex_2;
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.deleteBillboard = function (id) { return __awaiter(_this, void 0, Promise, function () {
            var billboard;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.billboardRepository.getByIdAsync(new mongoose_1.Types.ObjectId(id))];
                    case 1:
                        billboard = _b.sent();
                        if (!billboard) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.fileService.deleteFile((_a = billboard === null || billboard === void 0 ? void 0 : billboard.img) === null || _a === void 0 ? void 0 : _a.public_id)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.billboardRepository.deleteAsync(billboard, true)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, billboard];
                }
            });
        }); };
        this.getActiveBillboards = function () { return __awaiter(_this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.billboardRepository.getAsync({ isActive: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.getBillboard = function (id) { return __awaiter(_this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = new mongoose_1.Types.ObjectId(id);
                        return [4 /*yield*/, this.billboardRepository.getByIdAsync(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.search = function (searchBillboardRequest) { return __awaiter(_this, void 0, Promise, function () {
            var cleanedSearch, nextedSearch, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cleanedSearch = object_utility_1["default"].removeNullOrUndefinedValuesFromObject(searchBillboardRequest);
                        nextedSearch = {};
                        if (cleanedSearch.desc) { // case insensitive desc search
                            nextedSearch.desc = { $regex: cleanedSearch.desc, $options: "i" };
                        }
                        if (Object.hasOwn(cleanedSearch, 'isActive')) {
                            if (typeof (cleanedSearch.isActive) === "boolean") {
                            }
                            else {
                                switch (cleanedSearch.isActive.toLowerCase()) {
                                    case 'true':
                                        cleanedSearch.isActive = true;
                                        break;
                                    default:
                                        cleanedSearch.isActive = false;
                                        break;
                                }
                            }
                        }
                        query = __assign(__assign({}, cleanedSearch), nextedSearch);
                        console.log({ query: query });
                        return [4 /*yield*/, this.billboardRepository.getAsync(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
    }
    BillboardService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(event_tracer_1.IIEventTracer)),
        __param(1, tsyringe_1.inject(billboard_repository_1.IIBillboardRepository)),
        __param(2, tsyringe_1.inject(file_service_1.IIFileService))
    ], BillboardService);
    return BillboardService;
}());
exports["default"] = BillboardService;
