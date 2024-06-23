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
var tsyringe_1 = require("tsyringe");
var category_repository_1 = require("../../../../core/application/contract/data_access/shop/category_repository");
var event_tracer_1 = require("../../../../core/application/contract/observability/event_tracer");
var duplicate_exception_1 = require("../../../../core/application/common/exceptions/duplicate_exception");
var category_1 = require("../../../../core/domain/shop/category");
var filter_1 = require("../../../../core/domain/shop/filter");
var CreateFilterRequest = /** @class */ (function () {
    function CreateFilterRequest() {
        this.categoryId = null;
    }
    return CreateFilterRequest;
}());
var CreateCategoryRequest = /** @class */ (function () {
    function CreateCategoryRequest() {
        this.img = null;
        this.parentCategory = null;
        this.filters = [];
    }
    return CreateCategoryRequest;
}());
var CategoryService = /** @class */ (function () {
    function CategoryService(eventTracer, categoryRepository) {
        var _this = this;
        this.eventTracer = eventTracer;
        this.categoryRepository = categoryRepository;
        this.convertCreateCategoryRequestToCategory = function (request) {
            var filters = request.filters.map(function (filterRequest) { return new filter_1.Filter(filterRequest.name, filterRequest.categoryId, filterRequest.type, filterRequest.values); });
            return new category_1["default"](request.name, request.desc, request.img, request.parentCategory, filters);
        };
        this.validateNoCategoryCircularDependency = function (categoryId) { return __awaiter(_this, void 0, void 0, function () {
            var visitedIds, category, _a, categoryIdString;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        visitedIds = new Set();
                        if (categoryId instanceof category_1["default"]) {
                            visitedIds.add(categoryId._id.toJSON());
                            categoryId = categoryId.parentCategory;
                        }
                        if (!categoryId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.categoryRepository.getByIdAsync(categoryId)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = null;
                        _b.label = 3;
                    case 3:
                        category = _a;
                        _b.label = 4;
                    case 4:
                        if (!category) return [3 /*break*/, 6];
                        categoryIdString = category._id.toJSON();
                        if (visitedIds.has(categoryIdString)) {
                            throw new Error("Circular parent on category detected");
                        }
                        visitedIds.add(categoryIdString);
                        if (!category.parentCategory) {
                            return [3 /*break*/, 6];
                        }
                        return [4 /*yield*/, this.categoryRepository.getByIdAsync(category.parentCategory)];
                    case 5:
                        category = _b.sent();
                        return [3 /*break*/, 4];
                    case 6: return [2 /*return*/, true];
                }
            });
        }); };
        this.getCategoryParent = function (category) { return __awaiter(_this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!category.parentCategory) {
                            return [2 /*return*/, null];
                        }
                        else if (category.parentCategory instanceof category_1["default"]) {
                            return [2 /*return*/, category.parentCategory];
                        }
                        return [4 /*yield*/, this.categoryRepository.getByIdAsync(category.parentCategory)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.getAllParentFiltersForCategory = function (category) { return __awaiter(_this, void 0, Promise, function () {
            var parentFilters, categoryParent, _i, _a, filter;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        parentFilters = {};
                        return [4 /*yield*/, this.getCategoryParent(category)];
                    case 1:
                        categoryParent = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!categoryParent) return [3 /*break*/, 4];
                        for (_i = 0, _a = categoryParent.filters; _i < _a.length; _i++) {
                            filter = _a[_i];
                            parentFilters[filter.name] = filter;
                        }
                        return [4 /*yield*/, this.getCategoryParent(categoryParent)];
                    case 3:
                        categoryParent = _b.sent();
                        return [3 /*break*/, 2];
                    case 4: return [2 /*return*/, parentFilters];
                }
            });
        }); };
        this.cleanFiltersForCategory = function (category) { return __awaiter(_this, void 0, void 0, function () {
            var filterResponseList, parentFilters, _i, _a, filter;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        filterResponseList = [];
                        return [4 /*yield*/, this.getAllParentFiltersForCategory(category)];
                    case 1:
                        parentFilters = _b.sent();
                        // get all filter's from each parent's category save in dict with key filter name
                        // for each filter in category
                        for (_i = 0, _a = category.filters; _i < _a.length; _i++) {
                            filter = _a[_i];
                            if (!parentFilters.hasOwnProperty(filter.name)) {
                                filter.categoryId = category._id;
                                filterResponseList.push(filter);
                            }
                        }
                        return [2 /*return*/, filterResponseList];
                }
            });
        }); };
        this.createCategory = function (createCategoryRequest) { return __awaiter(_this, void 0, Promise, function () {
            var categoryWitUrlName, category, _a, savedCategory, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        // validate no other category have the same name
                        this.eventTracer.say("Creating category");
                        this.eventTracer.request = createCategoryRequest;
                        return [4 /*yield*/, this.categoryRepository.firstOrDefaultAsync({ urlName: createCategoryRequest.urlName })];
                    case 1:
                        categoryWitUrlName = _b.sent();
                        if (categoryWitUrlName) {
                            throw new duplicate_exception_1["default"]("Category with url name " + createCategoryRequest.urlName + " already exist");
                        }
                        if (!createCategoryRequest.parentCategory) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.validateNoCategoryCircularDependency(createCategoryRequest.parentCategory)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        this.eventTracer.say("Successfully validated");
                        category = this.convertCreateCategoryRequestToCategory(createCategoryRequest);
                        _a = category;
                        return [4 /*yield*/, this.cleanFiltersForCategory(category)];
                    case 4:
                        _a.filters = _b.sent();
                        return [4 /*yield*/, this.categoryRepository.addAsync(category)];
                    case 5:
                        savedCategory = _b.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(savedCategory);
                        return [2 /*return*/, savedCategory];
                    case 6:
                        ex_1 = _b.sent();
                        this.eventTracer.isErrorWithMessage("" + ex_1);
                        throw ex_1;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
    }
    CategoryService = __decorate([
        __param(0, tsyringe_1.inject(event_tracer_1.IIEventTracer)),
        __param(1, tsyringe_1.inject(category_repository_1.IICategoryRepository))
    ], CategoryService);
    return CategoryService;
}());
exports["default"] = CategoryService;
