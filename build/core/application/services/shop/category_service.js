"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const category_repository_1 = require("../../contract/data_access/shop/category_repository");
const event_tracer_1 = require("../../contract/observability/event_tracer");
const duplicate_exception_1 = __importDefault(require("../../common/exceptions/duplicate_exception"));
const mongoose_1 = require("mongoose");
const category_1 = __importDefault(require("../../../domain/shop/entity/category"));
const filter_1 = require("../../../domain/shop/entity/filter");
const file_service_1 = require("../../../application/contract/services/files/file_service");
const not_found_exception_1 = __importDefault(require("../../../application/common/exceptions/not_found_exception"));
const object_utility_1 = __importDefault(require("../../../application/common/utilities/object_utility"));
let CategoryService = class CategoryService {
    eventTracer;
    categoryRepository;
    fileService;
    categoryImgUploadFolder = "BEAUTY_IMAGE";
    constructor(eventTracer, categoryRepository, fileService) {
        this.eventTracer = eventTracer;
        this.categoryRepository = categoryRepository;
        this.fileService = fileService;
    }
    convertCreateCategoryRequestToCategory = (request) => {
        const filters = request.filters.map(filterRequest => new filter_1.Filter(filterRequest.name, filterRequest.categoryId, filterRequest.filterType, filterRequest.values));
        var category = new category_1.default({ name: request.name, urlName: request.urlName, desc: request.desc, img: request.img, parentCategory: request.parentCategory });
        category.filters = filters;
        return category;
    };
    validateNoCategoryCircularDependency = async (categoryId) => {
        const visitedIds = new Set();
        if (categoryId instanceof category_1.default) {
            visitedIds.add(categoryId._id.toJSON());
            categoryId = categoryId.parentCategory;
        }
        let category = categoryId ? await this.categoryRepository.getByIdAsync(categoryId) : null;
        while (category) {
            const categoryIdString = category._id.toJSON();
            if (visitedIds.has(categoryIdString)) {
                throw new Error(`Circular parent on category detected`);
            }
            visitedIds.add(categoryIdString);
            if (!category.parentCategory) {
                break;
            }
            category = await this.categoryRepository.getByIdAsync(category.parentCategory);
        }
        return true;
    };
    getCategoryParent = async (category) => {
        if (!category.parentCategory) {
            return null;
        }
        else if (category.parentCategory instanceof category_1.default) {
            return category.parentCategory;
        }
        let parent = await this.categoryRepository.getByIdAsync(category.parentCategory);
        return parent;
    };
    getAllParentFiltersForCategory = async (category) => {
        let parentFilters = {};
        let categoryParent = await this.getCategoryParent(category);
        while (categoryParent) {
            for (let filter of categoryParent.filters) {
                parentFilters[filter.name] = filter;
            }
            categoryParent = await this.getCategoryParent(categoryParent);
        }
        return parentFilters;
    };
    getAllFiltersForCategoryIncludingParents = async (category) => {
        let allFilters = {};
        let categoryBeingProbed = category;
        while (categoryBeingProbed) {
            for (let filter of categoryBeingProbed.filters) {
                allFilters[filter.name] = filter;
            }
            categoryBeingProbed = await this.getCategoryParent(categoryBeingProbed);
        }
        return allFilters;
    };
    keepOnlyCategoryFilters = async (category) => {
        // instantiate filter response list
        let filterResponseList = [];
        let parentFilters = await this.getAllParentFiltersForCategory(category);
        // get all filter's from each parent's category save in dict with key filter name
        // for each filter in category
        for (let filter of category.filters) {
            if (!parentFilters.hasOwnProperty(filter.name)) {
                filter.categoryId = category._id;
                filterResponseList.push(filter);
            }
        }
        return filterResponseList;
    };
    getAllFiltersForCategoryIncludingParentsAsList = async (category) => {
        let filters = await this.getAllFiltersForCategoryIncludingParents(category);
        let filterList = [];
        for (let key in filters) {
            let value = filters[key];
            filterList.push(value);
        }
        return filterList;
    };
    getCategoryByIdOrThrowException = async (categoryId) => {
        let category = await this.categoryRepository.getByIdAsync(categoryId);
        if (!category) {
            throw new not_found_exception_1.default(`Category with id ${categoryId} not found`);
        }
        return category;
    };
    createCategory = async (createCategoryRequest) => {
        try {
            // validate no other category have the same name
            this.eventTracer.say(`Creating category`);
            this.eventTracer.request = createCategoryRequest;
            let categoryWitUrlName = await this.categoryRepository.firstOrDefaultAsync({ urlName: createCategoryRequest.urlName });
            if (categoryWitUrlName) {
                throw new duplicate_exception_1.default(`Category with url name ${createCategoryRequest.urlName} already exist`);
            }
            if (createCategoryRequest.parentCategory) {
                await this.validateNoCategoryCircularDependency(createCategoryRequest.parentCategory);
            }
            this.eventTracer.say(`Successfully validated`);
            let category = this.convertCreateCategoryRequestToCategory(createCategoryRequest);
            this.eventTracer.say("Successfully converted request to Category");
            this.eventTracer.request = category;
            if (createCategoryRequest.img) {
                createCategoryRequest.img.folder = this.categoryImgUploadFolder;
                category.img = await this.fileService.uploadFile(createCategoryRequest.img);
            }
            let filters = await this.keepOnlyCategoryFilters(category);
            category.filters = filters;
            const savedCategory = await this.categoryRepository.addAsync(category);
            this.eventTracer.isSuccessWithResponseAndMessage(savedCategory);
            return savedCategory;
            // save
        }
        catch (ex) {
            this.eventTracer.isErrorWithMessage(`${ex}`);
            throw ex;
        }
    };
    addFiltersToCategory = async (categoryId, filtersRequest) => {
        try {
            this.eventTracer.say(`Adding filters to category`);
            this.eventTracer.request = filtersRequest;
            let category = await this.getCategoryByIdOrThrowException(categoryId);
            let existingFiltersDict = {};
            category.filters.forEach(filterRequest => {
                existingFiltersDict[filterRequest.name] = filterRequest;
            });
            this.eventTracer.say(`existing filter's length ${category.filters.length}`);
            let cleanedNewFilters = [];
            for (let filterRequest of filtersRequest) {
                if (!existingFiltersDict.hasOwnProperty(filterRequest.name)) { // If filter name not part of existing filters
                    let filterObj = new filter_1.Filter({
                        name: filterRequest.name, categoryId: category._id, filterType: filterRequest.filterType, values: filterRequest.values
                    });
                    // prevent duplicate filters
                    existingFiltersDict[filterObj.name] = filterObj;
                    cleanedNewFilters.push(filterObj);
                }
            }
            let mergedCategoryFilters = [...category.filters, ...cleanedNewFilters];
            category.filters = mergedCategoryFilters;
            let cleanedFilters = await this.keepOnlyCategoryFilters(category);
            let updatedCategory = category;
            console.log({ cleaned: cleanedFilters.length, category: category.filters.length });
            this.eventTracer.say(`new filters added to category. Total length ${cleanedFilters.length}`);
            await this.categoryRepository.updateByIdAsync(category._id, { filters: cleanedFilters });
            updatedCategory = await this.categoryRepository.getByIdAsync(category._id);
            this.eventTracer.isSuccessWithResponseAndMessage(updatedCategory);
            return updatedCategory;
        }
        catch (ex) {
            this.eventTracer.isErrorWithMessage(`${ex}`);
            throw ex;
        }
    };
    deleteFilters = async (categoryId, filterIds) => {
        try {
            this.eventTracer.say(`Deleting filters from category Id ${categoryId}`);
            this.eventTracer.request = filterIds;
            let category = await this.getCategoryByIdOrThrowException(categoryId);
            this.eventTracer.say(`getting all filters as a dict with id as key and idx position as value`);
            let filterIdPositionDict = {};
            for (let idx = 0; idx < category.filters.length; idx++) {
                const filter = category.filters[idx];
                filterIdPositionDict[filter._id.toJSON()] = idx;
            }
            for (let filterId of filterIds) {
                const filterIdString = filterId.toJSON();
                if (filterIdPositionDict.hasOwnProperty(filterIdString)) {
                    const idxPositionToDelete = filterIdPositionDict[filterIdString];
                    this.eventTracer.say(`Deleting item at idx ${idxPositionToDelete}`);
                    category.filters.splice(idxPositionToDelete, 1);
                }
            }
            this.eventTracer.say(`Successfully deleted filters`);
            await this.categoryRepository.updateByIdAsync(category._id, { filters: category.filters });
            let updatedCategory = await this.categoryRepository.getByIdAsync(category._id);
            this.eventTracer.isSuccessWithResponseAndMessage(updatedCategory);
            return updatedCategory;
        }
        catch (ex) {
            this.eventTracer.isErrorWithMessage(`${ex}`);
            throw ex;
        }
    };
    updateFilter = async (categoryId, updateFilter) => {
        // get category
        try {
            const category = await this.getCategoryByIdOrThrowException(categoryId);
            const updateFilterId = new mongoose_1.Types.ObjectId(updateFilter._id);
            let filters = category.filters;
            let updateAvailable = false;
            for (let filter of filters) {
                this.eventTracer.say(`filter: ${filter._id}, update id: ${updateFilterId}`);
                if (updateFilterId.toJSON() === filter._id.toJSON()) {
                    this.eventTracer.say(`We found a match`);
                    await this.getAllParentFiltersForCategory(category);
                    if (updateFilter.name && updateFilter.name !== filter.name) { // if update filter is trying to update name
                        let categoryFilterNamesExcludingCurrent = category.filters.filter(catFilter => catFilter._id !== filter._id).map(catfilter => catfilter.name);
                        if (categoryFilterNamesExcludingCurrent.includes(updateFilter.name)) {
                            throw new duplicate_exception_1.default(`Category already have filter with name ${updateFilter.name}`);
                        }
                        let allParentsFilters = await this.getAllParentFiltersForCategory(category);
                        if (allParentsFilters.hasOwnProperty(updateFilter.name)) {
                            throw new duplicate_exception_1.default(`Category Parent already have filter with name ${updateFilter.name}`);
                        }
                        filter.name = updateFilter.name;
                        updateAvailable = true;
                    }
                    if (updateFilter.filterType && updateFilter.filterType != filter.filterType) {
                        filter.filterType = updateFilter.filterType;
                        updateAvailable = true;
                    }
                    if (updateFilter.values && !object_utility_1.default.areListsEqual(updateFilter.values, filter.values)) {
                        filter.values = updateFilter.values;
                        updateAvailable = true;
                    }
                    break;
                }
            }
            if (updateAvailable) {
                this.eventTracer.say(`some fields for filer updated`);
                await this.categoryRepository.updateByIdAsync(category._id, { filters: category.filters });
                let updatedCategory = await this.categoryRepository.getByIdAsync(category._id);
                this.eventTracer.isSuccessWithResponseAndMessage(updatedCategory);
                return updatedCategory;
            }
            this.eventTracer.isSuccessWithResponseAndMessage(category, `No update for filter`);
            return category;
        }
        catch (ex) {
            this.eventTracer.isErrorWithMessage(`${ex}`);
            throw ex;
        }
    };
    getCategoriesByIds = async (categoryIds, includeInheritedFilters = false) => {
        let categories = await this.categoryRepository.contains({ _id: categoryIds.map(id => new mongoose_1.Types.ObjectId(id)) });
        if (includeInheritedFilters) {
            categories.forEach(async (category) => {
                category.filters = await this.getAllFiltersForCategoryIncludingParentsAsList(category);
            });
        }
        return categories;
    };
    getCategoryEnriched = async (categoryId, joins) => {
        try {
            this.eventTracer.say(`Get Category for: ${categoryId}`);
            this.eventTracer.say(`Include fields ${joins}`);
            let includes = {};
            if (joins.hasOwnProperty('parentCategory')) {
                this.eventTracer.say('Including Parent Categories');
                includes.parentCategory = true;
            }
            let savedCategory = await this.categoryRepository.getByIdAsync(new mongoose_1.Types.ObjectId(categoryId), includes);
            if (!savedCategory) {
                throw new not_found_exception_1.default(`Category with id ${categoryId} not found`);
            }
            if (joins.hasOwnProperty('subCategories')) {
                this.eventTracer.say('Including SubCategories');
                savedCategory.subCategories = await this.categoryRepository.getAsync({ parentCategory: savedCategory._id });
                console.log({ subCat: savedCategory.subCategories });
            }
            if (joins.hasOwnProperty('filters')) {
                this.eventTracer.say('Including Parent filters');
                savedCategory.filters = await this.getAllFiltersForCategoryIncludingParentsAsList(savedCategory);
            }
            this.eventTracer.isSuccessWithResponseAndMessage(savedCategory);
            return savedCategory;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
};
CategoryService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __param(1, (0, tsyringe_1.inject)(category_repository_1.IICategoryRepository)),
    __param(2, (0, tsyringe_1.inject)(file_service_1.IIFileService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], CategoryService);
exports.default = CategoryService;
//# sourceMappingURL=category_service.js.map