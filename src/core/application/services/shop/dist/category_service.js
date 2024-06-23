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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var tsyringe_1 = require("tsyringe");
var category_repository_1 = require("../../contract/data_access/shop/category_repository");
var event_tracer_1 = require("../../contract/observability/event_tracer");
var duplicate_exception_1 = require("../../common/exceptions/duplicate_exception");
var mongoose_1 = require("mongoose");
var category_1 = require("../../../domain/shop/entity/category");
var filter_1 = require("../../../domain/shop/entity/filter");
var file_service_1 = require("../../../application/contract/services/files/file_service");
var not_found_exception_1 = require("../../../application/common/exceptions/not_found_exception");
var object_utility_1 = require("../../../application/common/utilities/object_utility");
var CategoryService = /** @class */ (function () {
    function CategoryService(eventTracer, categoryRepository, fileService) {
        var _this = this;
        this.eventTracer = eventTracer;
        this.categoryRepository = categoryRepository;
        this.fileService = fileService;
        this.categoryImgUploadFolder = "BEAUTY_IMAGE";
        this.convertCreateCategoryRequestToCategory = function (request) {
            var filters = request.filters.map(function (filterRequest) { return new filter_1.Filter(filterRequest.name, filterRequest.categoryId, filterRequest.filterType, filterRequest.values); });
            var category = new category_1["default"]({ name: request.name, urlName: request.urlName, desc: request.desc, img: request.img, parentCategory: request.parentCategory });
            category.filters = filters;
            return category;
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
            var parent;
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
                    case 1:
                        parent = _a.sent();
                        return [2 /*return*/, parent];
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
        this.getAllFiltersForCategoryIncludingParents = function (category) { return __awaiter(_this, void 0, Promise, function () {
            var allFilters, categoryBeingProbed, _i, _a, filter;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        allFilters = {};
                        categoryBeingProbed = category;
                        _b.label = 1;
                    case 1:
                        if (!categoryBeingProbed) return [3 /*break*/, 3];
                        for (_i = 0, _a = categoryBeingProbed.filters; _i < _a.length; _i++) {
                            filter = _a[_i];
                            allFilters[filter.name] = filter;
                        }
                        return [4 /*yield*/, this.getCategoryParent(categoryBeingProbed)];
                    case 2:
                        categoryBeingProbed = _b.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/, allFilters];
                }
            });
        }); };
        this.keepOnlyCategoryFilters = function (category) { return __awaiter(_this, void 0, void 0, function () {
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
        this.getAllFiltersForCategoryIncludingParentsAsList = function (category) { return __awaiter(_this, void 0, Promise, function () {
            var filters, filterList, key, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllFiltersForCategoryIncludingParents(category)];
                    case 1:
                        filters = _a.sent();
                        filterList = [];
                        for (key in filters) {
                            value = filters[key];
                            filterList.push(value);
                        }
                        return [2 /*return*/, filterList];
                }
            });
        }); };
        this.getCategoryByIdOrThrowException = function (categoryId) { return __awaiter(_this, void 0, Promise, function () {
            var category;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.categoryRepository.getByIdAsync(categoryId)];
                    case 1:
                        category = _a.sent();
                        if (!category) {
                            throw new not_found_exception_1["default"]("Category with id " + categoryId + " not found");
                        }
                        return [2 /*return*/, category];
                }
            });
        }); };
        this.createCategory = function (createCategoryRequest) { return __awaiter(_this, void 0, Promise, function () {
            var categoryWitUrlName, category, _a, filters, savedCategory, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
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
                        this.eventTracer.say("Successfully converted request to Category");
                        this.eventTracer.request = category;
                        if (!createCategoryRequest.img) return [3 /*break*/, 5];
                        createCategoryRequest.img.folder = this.categoryImgUploadFolder;
                        _a = category;
                        return [4 /*yield*/, this.fileService.uploadFile(createCategoryRequest.img)];
                    case 4:
                        _a.img = _b.sent();
                        _b.label = 5;
                    case 5: return [4 /*yield*/, this.keepOnlyCategoryFilters(category)];
                    case 6:
                        filters = _b.sent();
                        category.filters = filters;
                        return [4 /*yield*/, this.categoryRepository.addAsync(category)];
                    case 7:
                        savedCategory = _b.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(savedCategory);
                        return [2 /*return*/, savedCategory];
                    case 8:
                        ex_1 = _b.sent();
                        this.eventTracer.isErrorWithMessage("" + ex_1);
                        throw ex_1;
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this.addFiltersToCategory = function (categoryId, filtersRequest) { return __awaiter(_this, void 0, Promise, function () {
            var category, existingFiltersDict_1, cleanedNewFilters, _i, filtersRequest_1, filterRequest, filterObj, mergedCategoryFilters, cleanedFilters, updatedCategory, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.eventTracer.say("Adding filters to category");
                        this.eventTracer.request = filtersRequest;
                        return [4 /*yield*/, this.getCategoryByIdOrThrowException(categoryId)];
                    case 1:
                        category = _a.sent();
                        existingFiltersDict_1 = {};
                        category.filters.forEach(function (filterRequest) {
                            existingFiltersDict_1[filterRequest.name] = filterRequest;
                        });
                        this.eventTracer.say("existing filter's length " + category.filters.length);
                        cleanedNewFilters = [];
                        for (_i = 0, filtersRequest_1 = filtersRequest; _i < filtersRequest_1.length; _i++) {
                            filterRequest = filtersRequest_1[_i];
                            if (!existingFiltersDict_1.hasOwnProperty(filterRequest.name)) { // If filter name not part of existing filters
                                filterObj = new filter_1.Filter({
                                    name: filterRequest.name, categoryId: category._id, filterType: filterRequest.filterType, values: filterRequest.values
                                });
                                // prevent duplicate filters
                                existingFiltersDict_1[filterObj.name] = filterObj;
                                cleanedNewFilters.push(filterObj);
                            }
                        }
                        mergedCategoryFilters = __spreadArrays(category.filters, cleanedNewFilters);
                        category.filters = mergedCategoryFilters;
                        return [4 /*yield*/, this.keepOnlyCategoryFilters(category)];
                    case 2:
                        cleanedFilters = _a.sent();
                        updatedCategory = category;
                        console.log({ cleaned: cleanedFilters.length, category: category.filters.length });
                        this.eventTracer.say("new filters added to category. Total length " + cleanedFilters.length);
                        return [4 /*yield*/, this.categoryRepository.updateByIdAsync(category._id, { filters: cleanedFilters })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.categoryRepository.getByIdAsync(category._id)];
                    case 4:
                        updatedCategory = _a.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(updatedCategory);
                        return [2 /*return*/, updatedCategory];
                    case 5:
                        ex_2 = _a.sent();
                        this.eventTracer.isErrorWithMessage("" + ex_2);
                        throw ex_2;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.deleteFilters = function (categoryId, filterIds) { return __awaiter(_this, void 0, Promise, function () {
            var category, filterIdPositionDict, idx, filter, _i, filterIds_1, filterId, filterIdString, idxPositionToDelete, updatedCategory, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.eventTracer.say("Deleting filters from category Id " + categoryId);
                        this.eventTracer.request = filterIds;
                        return [4 /*yield*/, this.getCategoryByIdOrThrowException(categoryId)];
                    case 1:
                        category = _a.sent();
                        this.eventTracer.say("getting all filters as a dict with id as key and idx position as value");
                        filterIdPositionDict = {};
                        for (idx = 0; idx < category.filters.length; idx++) {
                            filter = category.filters[idx];
                            filterIdPositionDict[filter._id.toJSON()] = idx;
                        }
                        for (_i = 0, filterIds_1 = filterIds; _i < filterIds_1.length; _i++) {
                            filterId = filterIds_1[_i];
                            filterIdString = filterId.toJSON();
                            if (filterIdPositionDict.hasOwnProperty(filterIdString)) {
                                idxPositionToDelete = filterIdPositionDict[filterIdString];
                                this.eventTracer.say("Deleting item at idx " + idxPositionToDelete);
                                category.filters.splice(idxPositionToDelete, 1);
                            }
                        }
                        this.eventTracer.say("Successfully deleted filters");
                        return [4 /*yield*/, this.categoryRepository.updateByIdAsync(category._id, { filters: category.filters })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.categoryRepository.getByIdAsync(category._id)];
                    case 3:
                        updatedCategory = _a.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(updatedCategory);
                        return [2 /*return*/, updatedCategory];
                    case 4:
                        ex_3 = _a.sent();
                        this.eventTracer.isErrorWithMessage("" + ex_3);
                        throw ex_3;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.updateFilter = function (categoryId, updateFilter) { return __awaiter(_this, void 0, Promise, function () {
            var category, updateFilterId, filters, updateAvailable, _loop_1, this_1, _i, filters_1, filter, state_1, updatedCategory, ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, this.getCategoryByIdOrThrowException(categoryId)];
                    case 1:
                        category = _a.sent();
                        updateFilterId = new mongoose_1.Types.ObjectId(updateFilter._id);
                        filters = category.filters;
                        updateAvailable = false;
                        _loop_1 = function (filter) {
                            var categoryFilterNamesExcludingCurrent, allParentsFilters;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this_1.eventTracer.say("filter: " + filter._id + ", update id: " + updateFilterId);
                                        if (!(updateFilterId.toJSON() === filter._id.toJSON())) return [3 /*break*/, 4];
                                        this_1.eventTracer.say("We found a match");
                                        return [4 /*yield*/, this_1.getAllParentFiltersForCategory(category)];
                                    case 1:
                                        _a.sent();
                                        if (!(updateFilter.name && updateFilter.name !== filter.name)) return [3 /*break*/, 3];
                                        categoryFilterNamesExcludingCurrent = category.filters.filter(function (catFilter) { return catFilter._id !== filter._id; }).map(function (catfilter) { return catfilter.name; });
                                        if (categoryFilterNamesExcludingCurrent.includes(updateFilter.name)) {
                                            throw new duplicate_exception_1["default"]("Category already have filter with name " + updateFilter.name);
                                        }
                                        return [4 /*yield*/, this_1.getAllParentFiltersForCategory(category)];
                                    case 2:
                                        allParentsFilters = _a.sent();
                                        if (allParentsFilters.hasOwnProperty(updateFilter.name)) {
                                            throw new duplicate_exception_1["default"]("Category Parent already have filter with name " + updateFilter.name);
                                        }
                                        filter.name = updateFilter.name;
                                        updateAvailable = true;
                                        _a.label = 3;
                                    case 3:
                                        if (updateFilter.filterType && updateFilter.filterType != filter.filterType) {
                                            filter.filterType = updateFilter.filterType;
                                            updateAvailable = true;
                                        }
                                        if (updateFilter.values && !object_utility_1["default"].areListsEqual(updateFilter.values, filter.values)) {
                                            filter.values = updateFilter.values;
                                            updateAvailable = true;
                                        }
                                        return [2 /*return*/, "break"];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, filters_1 = filters;
                        _a.label = 2;
                    case 2:
                        if (!(_i < filters_1.length)) return [3 /*break*/, 5];
                        filter = filters_1[_i];
                        return [5 /*yield**/, _loop_1(filter)];
                    case 3:
                        state_1 = _a.sent();
                        if (state_1 === "break")
                            return [3 /*break*/, 5];
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (!updateAvailable) return [3 /*break*/, 8];
                        this.eventTracer.say("some fields for filer updated");
                        return [4 /*yield*/, this.categoryRepository.updateByIdAsync(category._id, { filters: category.filters })];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.categoryRepository.getByIdAsync(category._id)];
                    case 7:
                        updatedCategory = _a.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(updatedCategory);
                        return [2 /*return*/, updatedCategory];
                    case 8:
                        this.eventTracer.isSuccessWithResponseAndMessage(category, "No update for filter");
                        return [2 /*return*/, category];
                    case 9:
                        ex_4 = _a.sent();
                        this.eventTracer.isErrorWithMessage("" + ex_4);
                        throw ex_4;
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.getCategoriesWithInheritedFilters = function (categoryIds) { return __awaiter(_this, void 0, Promise, function () {
            var categories;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.categoryRepository.contains({ _id: categoryIds.map(function (id) { return new mongoose_1.Types.ObjectId(id); }) })];
                    case 1:
                        categories = _a.sent();
                        categories.forEach(function (category) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = category;
                                        return [4 /*yield*/, this.getAllFiltersForCategoryIncludingParentsAsList(category)];
                                    case 1:
                                        _a.filters = _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/, categories];
                }
            });
        }); };
    }
    CategoryService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(event_tracer_1.IIEventTracer)),
        __param(1, tsyringe_1.inject(category_repository_1.IICategoryRepository)),
        __param(2, tsyringe_1.inject(file_service_1.IIFileService))
    ], CategoryService);
    return CategoryService;
}());
exports["default"] = CategoryService;
