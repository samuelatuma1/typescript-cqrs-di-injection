import IEventTracer, { IIEventTracer } from "../../../application/contract/observability/event_tracer";
import { IBillboardService } from "../../../application/contract/services/shop/billboard_service";
import { inject, injectable } from "tsyringe";
import IBillboardRepository, { IIBillboardRepository } from "../../../application/contract/data_access/shop/billboard_repository";
import Billboard from "../../../domain/shop/entity/bill_board";
import { Types } from "mongoose";
import ObjectUtility from "../../../application/common/utilities/object_utility";
import IFileService, { IIFileService } from "../../../application/contract/services/files/file_service";
import NotFoundException from "../../../application/common/exceptions/not_found_exception";
import OutOfRangeException from "../../../application/common/exceptions/out_of_range_exception";
import { CreateBillboardRequest, SearchBillboardRequest, UpdateBillboardRequest } from "../../../domain/shop/dto/requests/billboard_requests";
import { CreateBillboardValidator } from "./validations/billboard_validation";
import ValidationException from "../../../application/common/exceptions/validation_exception";


@injectable()
export default class BillboardService implements IBillboardService{
    private maxActiveBillBoard: number = 3;
    public constructor(
        @inject(IIEventTracer) private readonly eventTracer: IEventTracer,
        @inject(IIBillboardRepository) private readonly billboardRepository: IBillboardRepository,
        @inject(IIFileService) private readonly fileService: IFileService
    ){

    }

    public createBillBoard = async ( createBillboardRequest: CreateBillboardRequest) : Promise<Billboard> => {
       try{
            // if billboard isActive
            const validationErrors = (new CreateBillboardValidator()).validate(createBillboardRequest);
            if(ObjectUtility.objectSize(validationErrors)){
                throw new ValidationException(`Invalid create billboard request`, validationErrors);
            }
            this.eventTracer.request = createBillboardRequest;
            this.eventTracer.say("Billboard: Create Billboard");
            if(createBillboardRequest.img){
                createBillboardRequest.img = await this.fileService.uploadFile(createBillboardRequest.img);
            }
            let billBoard = new Billboard({...createBillboardRequest, isActive: false});

            let response = await this.billboardRepository.addAsync(billBoard);

            this.eventTracer.isSuccessWithResponseAndMessage(response);
            return response;
            // save billboard 
       }
       catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
       }
    }

    public updateBillBoard = async (id: string | Types.ObjectId, update: UpdateBillboardRequest): Promise<Billboard> => {
        try{
            this.eventTracer.say(`UpdateBillboard with id: ${id}`);
            
            let billBoardId = new Types.ObjectId(id);
            let billBoard = await this.billboardRepository.getByIdAsync(billBoardId);
            if(!billBoard){
                throw new NotFoundException(`Billboard with id ${id} not found`)
                // delete ex
            }
            let cleanedUpdate = ObjectUtility.removeNullOrUndefinedValuesFromObject(update);
            this.eventTracer.request = cleanedUpdate;
            
            if(!billBoard.isActive && cleanedUpdate.isActive ){ // we are trying to activate billboard, but we need only maxActiveBillBoard active at a time
                let activeBillBoardsCount = (await this.billboardRepository.getAsync({isActive: true})).length;
                if(activeBillBoardsCount >= this.maxActiveBillBoard){
                    throw new OutOfRangeException(`Maximum number of active billboards reached`);
                }
            }
            if(cleanedUpdate.img){ // we want to delete existing billboard image 
            
                await this.fileService.deleteFile(billBoard.img.public_id)

                cleanedUpdate.img = await this.fileService.uploadFile(cleanedUpdate.img)
            }

            await this.billboardRepository.updateByIdAsync(billBoardId, cleanedUpdate);

            let response = await this.billboardRepository.getByIdAsync(billBoardId);
            this.eventTracer.isSuccessWithResponseAndMessage(response);
            return response
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    }

    public deleteBillboard = async (id: string | Types.ObjectId): Promise<Billboard> => {
        let billboard = await this.billboardRepository.getByIdAsync(new Types.ObjectId(id));
        
        if(billboard){ // we want to delete existing billboard image 
            await this.fileService.deleteFile(billboard?.img?.public_id)
            await this.billboardRepository.deleteAsync(billboard, true);
        }

        return billboard;
    }

    public getActiveBillboards = async (): Promise<Billboard[]> => {
        return await this.billboardRepository.getAsync({isActive: true})
    }

    public getBillboard = async (id: Types.ObjectId | string): Promise<Billboard | null> => {
        id = new Types.ObjectId(id);
        return await this.billboardRepository.getByIdAsync(id);
    }

    public search = async (searchBillboardRequest: SearchBillboardRequest) : Promise<Billboard[]> => {
        const cleanedSearch = ObjectUtility.removeNullOrUndefinedValuesFromObject(searchBillboardRequest);
        const nextedSearch: {[key in keyof Partial<Billboard>]: object} = {};
        if(cleanedSearch.desc){ // case insensitive desc search
            nextedSearch.desc = { $regex: cleanedSearch.desc, $options: "i"}
        }
        if(Object.hasOwn(cleanedSearch, 'isActive')){
            if(typeof(cleanedSearch.isActive) === "boolean" ){
    
            }
            else{

                switch(cleanedSearch.isActive.toLowerCase()){
                    case 'true':
                        cleanedSearch.isActive = true;
                        break;
                    default:
                        cleanedSearch.isActive = false;
                        break;
                }
            }
        }
        let query = {...cleanedSearch, ...nextedSearch}
        console.log({query})
        return await this.billboardRepository.getAsync(query)
    }
}