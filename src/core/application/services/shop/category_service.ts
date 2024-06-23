import { inject, injectable } from "tsyringe";
import ICategoryService from "../../contract/services/shop/category_service";
import ICategoryRepository, { IICategoryRepository } from "../../contract/data_access/shop/category_repository";
import IEventTracer, { IIEventTracer } from "../../contract/observability/event_tracer";
import DuplicateException from "../../common/exceptions/duplicate_exception";
import { Types } from "mongoose";
import Category from "../../../domain/shop/entity/category";
import { Filter } from "../../../domain/shop/entity/filter";
import IFileService, { IIFileService } from "../../../application/contract/services/files/file_service";
import { CreateCategoryRequest, CreateFilterRequest, UpdateFilterRequest } from "../../../domain/shop/dto/requests/category_requests";
import NotFoundException from "../../../application/common/exceptions/not_found_exception";
import ObjectUtility from "../../../application/common/utilities/object_utility";


@injectable()
export default class CategoryService implements ICategoryService{
    categoryImgUploadFolder: string = "BEAUTY_IMAGE"
    public constructor(
        @inject(IIEventTracer) private readonly eventTracer: IEventTracer,
        @inject(IICategoryRepository) private readonly categoryRepository: ICategoryRepository,
        @inject(IIFileService) private readonly fileService: IFileService
    ){

    }

    convertCreateCategoryRequestToCategory = (request: CreateCategoryRequest): Category => {
        const filters = request.filters.map(filterRequest => new Filter(filterRequest.name, filterRequest.categoryId, filterRequest.filterType, filterRequest.values))
        var category = new Category({name: request.name, urlName: request.urlName, desc: request.desc, img: request.img, parentCategory: request.parentCategory});
        category.filters = filters;
        return category;
    }

    validateNoCategoryCircularDependency = async (categoryId: Category | Types.ObjectId) => {
        const visitedIds: Set<string> = new Set<string>(); 
        if (categoryId instanceof Category){
            visitedIds.add(categoryId._id.toJSON())
            categoryId = categoryId.parentCategory as Types.ObjectId | null;
        }
        let category: Category | null = categoryId ? await this.categoryRepository.getByIdAsync(categoryId) : null;
        while(category){
            const categoryIdString = category._id.toJSON()
            if(visitedIds.has(categoryIdString)){
                throw new Error(`Circular parent on category detected`);
            }
            visitedIds.add(categoryIdString);
            if(!category.parentCategory){
                break;
            }
            category = await this.categoryRepository.getByIdAsync(category.parentCategory as Types.ObjectId);
        }
        return true;
    }
    getCategoryParent = async (category: Category): Promise<Category | null> => {
        if(!category.parentCategory){
            return null;
        }
        else if(category.parentCategory instanceof Category){
            
            return category.parentCategory;
        }
        let parent =  await this.categoryRepository.getByIdAsync(category.parentCategory);
        return parent
    }
    getAllParentFiltersForCategory = async (category: Category): Promise<{[key: string]: Filter}> => {
        let parentFilters: {[key: string]: Filter} = {}
        let categoryParent = await this.getCategoryParent(category);
        while (categoryParent){
            for(let filter of categoryParent.filters){
                parentFilters[filter.name] = filter
            }
            categoryParent = await this.getCategoryParent(categoryParent);
        }
        return parentFilters
    }

    getAllFiltersForCategoryIncludingParents = async (category: Category): Promise<{[key: string]: Filter}> => {
        let allFilters: {[key: string]: Filter} = {}
    
        let categoryBeingProbed = category;
        while (categoryBeingProbed){
            for(let filter of categoryBeingProbed.filters){
                allFilters[filter.name] = filter
            }
            categoryBeingProbed = await this.getCategoryParent(categoryBeingProbed);
        }
        return allFilters
    }
    private keepOnlyCategoryFilters = async (category: Category) => {
        // instantiate filter response list
        let filterResponseList: Filter[] = []
        let parentFilters: {[key: string]: Filter} = await this.getAllParentFiltersForCategory(category);
        // get all filter's from each parent's category save in dict with key filter name
        // for each filter in category
        for(let filter of category.filters){
            if(!parentFilters.hasOwnProperty(filter.name)){
                filter.categoryId = category._id;
                filterResponseList.push(filter);
            }
        }
        return filterResponseList;
    }

     private getAllFiltersForCategoryIncludingParentsAsList = async (category: Category): Promise<Filter[]> => {
        let filters = await this.getAllFiltersForCategoryIncludingParents(category);
        let filterList : Filter[] = []
        for(let key in filters){
            let value = filters[key];
            filterList.push(value);
        }

        return filterList;
    }
    private getCategoryByIdOrThrowException = async (categoryId: Types.ObjectId): Promise<Category> =>{
        let category = await this.categoryRepository.getByIdAsync(categoryId);
        if(!category){
            throw new NotFoundException(`Category with id ${categoryId} not found`)
        }

        return category;
    }
    public createCategory = async (createCategoryRequest: CreateCategoryRequest): Promise<Category> => {
       try{
         // validate no other category have the same name
         this.eventTracer.say(`Creating category`);
         this.eventTracer.request = createCategoryRequest;
         let categoryWitUrlName = await this.categoryRepository.firstOrDefaultAsync({urlName: createCategoryRequest.urlName});
         if(categoryWitUrlName){
             throw new DuplicateException(`Category with url name ${createCategoryRequest.urlName} already exist`);
         }
         if(createCategoryRequest.parentCategory){
             await this.validateNoCategoryCircularDependency(createCategoryRequest.parentCategory);
         }
         this.eventTracer.say(`Successfully validated`);
         
         let category = this.convertCreateCategoryRequestToCategory(createCategoryRequest);
         this.eventTracer.say("Successfully converted request to Category")
         this.eventTracer.request = category
         if(createCategoryRequest.img){
            createCategoryRequest.img.folder = this.categoryImgUploadFolder;
            category.img = await this.fileService.uploadFile(createCategoryRequest.img);
         }
         
         let filters = await this.keepOnlyCategoryFilters(category)
         category.filters = filters
         const savedCategory = await this.categoryRepository.addAsync(category);
 
         this.eventTracer.isSuccessWithResponseAndMessage(savedCategory);
 
         return savedCategory;
         // save
       }

       catch(ex){
        this.eventTracer.isErrorWithMessage(`${ex}`)
        throw ex;
       }
    }

    public addFiltersToCategory = async (categoryId: Types.ObjectId, filtersRequest: CreateFilterRequest[]): Promise<Category> => {
        try{
            this.eventTracer.say(`Adding filters to category`)
            this.eventTracer.request = filtersRequest;
            let category = await this.getCategoryByIdOrThrowException(categoryId);
            let existingFiltersDict: {[key: string]: Filter} = {};
            category.filters.forEach(filterRequest => {
                existingFiltersDict[filterRequest.name] = filterRequest;
            });
            this.eventTracer.say(`existing filter's length ${category.filters.length}`);
            let cleanedNewFilters: Filter[] = [];
            for(let filterRequest of filtersRequest){
                if(!existingFiltersDict.hasOwnProperty(filterRequest.name)){ // If filter name not part of existing filters
                    let filterObj = new Filter({
                        name: filterRequest.name, categoryId: category._id, filterType: filterRequest.filterType, values: filterRequest.values});
                    // prevent duplicate filters
                    existingFiltersDict[filterObj.name] = filterObj;
                    cleanedNewFilters.push(filterObj);
                }
            }
            
            let mergedCategoryFilters: Filter[] = [...category.filters, ...cleanedNewFilters];
            category.filters = mergedCategoryFilters
            let cleanedFilters = await this.keepOnlyCategoryFilters(category);
            let updatedCategory: Category = category;
            console.log({cleaned: cleanedFilters.length, category: category.filters.length})
            
            this.eventTracer.say(`new filters added to category. Total length ${cleanedFilters.length}`)
            await this.categoryRepository.updateByIdAsync(category._id, {filters: cleanedFilters})
            updatedCategory =await this.categoryRepository.getByIdAsync(category._id);
            
            this.eventTracer.isSuccessWithResponseAndMessage(updatedCategory)

            return updatedCategory;
        }
        catch(ex){
            this.eventTracer.isErrorWithMessage(`${ex}`)
            throw ex;
        }
    }

    public deleteFilters = async (categoryId: Types.ObjectId, filterIds: Types.ObjectId[]): Promise<Category> => {
        try{
            this.eventTracer.say(`Deleting filters from category Id ${categoryId}`)
            this.eventTracer.request = filterIds;
            let category = await this.getCategoryByIdOrThrowException(categoryId);

            this.eventTracer.say(`getting all filters as a dict with id as key and idx position as value`);
            let filterIdPositionDict: {[key: string]: number} = {}
            for(let idx = 0; idx < category.filters.length; idx++){
                const filter = category.filters[idx];
                filterIdPositionDict[filter._id.toJSON()] = idx
            }
            for(let filterId of filterIds){
                const filterIdString = filterId.toJSON()
                if(filterIdPositionDict.hasOwnProperty(filterIdString)){
                    const idxPositionToDelete = filterIdPositionDict[filterIdString]
                    this.eventTracer.say(`Deleting item at idx ${idxPositionToDelete}`)
                    category.filters.splice(idxPositionToDelete, 1)
                }
            }
            this.eventTracer.say(`Successfully deleted filters`)
            await this.categoryRepository.updateByIdAsync(category._id, {filters: category.filters});

            let updatedCategory = await this.categoryRepository.getByIdAsync(category._id);
                
            this.eventTracer.isSuccessWithResponseAndMessage(updatedCategory)

            return updatedCategory;
        }
        catch(ex){
            this.eventTracer.isErrorWithMessage(`${ex}`)
            throw ex;
        }
    }

    
    public updateFilter = async (categoryId: Types.ObjectId, updateFilter: UpdateFilterRequest) : Promise<Category> => {
        // get category
        try{
            const category = await this.getCategoryByIdOrThrowException(categoryId);
            const updateFilterId = new Types.ObjectId(updateFilter._id);
            let filters: Filter[] = category.filters;
            let updateAvailable: boolean = false;

            for(let filter of filters){
                this.eventTracer.say(`filter: ${filter._id}, update id: ${updateFilterId}`)
                if(updateFilterId.toJSON() === filter._id.toJSON()){
                    this.eventTracer.say(`We found a match`)
                    await this.getAllParentFiltersForCategory(category)
                    if(updateFilter.name && updateFilter.name !== filter.name){ // if update filter is trying to update name
                        let categoryFilterNamesExcludingCurrent = category.filters.filter(catFilter => catFilter._id !== filter._id).map(catfilter => catfilter.name)
                        if(categoryFilterNamesExcludingCurrent.includes(updateFilter.name)){
                            throw new DuplicateException(`Category already have filter with name ${updateFilter.name}`);
                        }
                        let allParentsFilters = await this.getAllParentFiltersForCategory(category);
                        if(allParentsFilters.hasOwnProperty(updateFilter.name)){
                            throw new DuplicateException(`Category Parent already have filter with name ${updateFilter.name}`);
                        }
                        filter.name = updateFilter.name;
                        updateAvailable = true;
                    }
                    if(updateFilter.filterType && updateFilter.filterType != filter.filterType ){
                        filter.filterType = updateFilter.filterType;
                        updateAvailable = true;
                    }
                    if(updateFilter.values && !ObjectUtility.areListsEqual(updateFilter.values, filter.values)){
                        filter.values = updateFilter.values;
                        updateAvailable = true;
                    }

                    break;
                }
            }
            if(updateAvailable){
                this.eventTracer.say(`some fields for filer updated`);
                await this.categoryRepository.updateByIdAsync(category._id, {filters: category.filters})
                let updatedCategory = await this.categoryRepository.getByIdAsync(category._id);
                this.eventTracer.isSuccessWithResponseAndMessage(updatedCategory);
                return updatedCategory;
            }
            this.eventTracer.isSuccessWithResponseAndMessage(category, `No update for filter`)
            return category
        }
        catch(ex){
            this.eventTracer.isErrorWithMessage(`${ex}`)
            throw ex;
        }
    }
   
    public getCategoriesWithInheritedFilters = async (categoryIds: string[] | Types.ObjectId[]): Promise<Category[]> => {
        let categories = await this.categoryRepository.contains({_id: categoryIds.map(id => new Types.ObjectId(id))});
        categories.forEach(async (category) => {
            category.filters =  await this.getAllFiltersForCategoryIncludingParentsAsList(category);
        })
        return categories;
    }
}