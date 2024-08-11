import ICloudinaryConfig, { IICloudinaryConfig } from "../../../../core/application/common/config/cloudinary_config";
import IEventTracer, { IIEventTracer } from "../../../../core/application/contract/observability/event_tracer";
import IFileService from "../../../../core/application/contract/services/files/file_service";
import { inject, injectable } from "tsyringe";
import {v2 as cloudinary, UploadApiResponse} from 'cloudinary'
import UploadFile from "../../../../core/domain/common/model/upload_file";
import { promises as fs } from "fs";
import path from "path";
import SerializationUtility from "../../../application/common/utilities/serialization_utility";

@injectable()
export default class CloudinaryService implements IFileService{
    public constructor(
        @inject(IICloudinaryConfig) private readonly cloudinaryConfig: ICloudinaryConfig,
        @inject(IIEventTracer) private readonly eventTracer: IEventTracer){
        cloudinary.config({
            cloud_name: cloudinaryConfig.CLOUD_NAME,
            api_key: cloudinaryConfig.API_KEY,
            api_secret: cloudinaryConfig.API_SECRET,
            secure: true
          });
        this.eventTracer = eventTracer
    }
    uploadFile= async (file: UploadFile ): Promise<UploadFile> => {
        try{
            let kwargs: {[key: string]: string} = {}
            this.eventTracer.say(`Creating file in Folder: ${file.folder} with name ${file.name ?? file.secure_url}`)
            this.eventTracer.request = file
            
            if (file.resource_type)
                kwargs.resource_type = file.resource_type
            if (file.folder)
                kwargs.folder = file.folder;
            if (file.public_id)
                kwargs.public_id = file.public_id

            const response: UploadApiResponse = await cloudinary.uploader.upload(file.secure_url, kwargs)

            this.eventTracer.response = response
            this.eventTracer.isSuccessWithMessage("Successfully created file")

            this.deleteFileFromDisk(file.secure_url); // No need to await deleting, just delete

            if (response && response.public_id){
                return new UploadFile(response.resource_type, response.secure_url, response.public_id, response.folder)
            }

            return null;
        }
        catch(ex){
            let errormsg = "";
            try{
                this.eventTracer.say(`Deleting disk file`)
                this.deleteFileFromDisk(file.secure_url); // No need to await deleting, just delete
                errormsg = SerializationUtility.serializeJson(ex)
            }
            catch(exc){
                this.eventTracer.say(`EXC : ${exc}`);
            }
            this.eventTracer.isExceptionWithMessage(`EXCEPTION: ${errormsg ?? ex}`);
            return null;
        }
    }   

    uploadMultipleFiles = async (files: UploadFile[]): Promise<UploadFile[]> => {
        let allFilesToUpload = files.map(file => this.uploadFile(file));
        
        let results = await Promise.allSettled(allFilesToUpload);
        let uploadedFiles: UploadFile[] = [];
        for (let result of results) {
            if (result.status === "fulfilled" && result.value) {
                uploadedFiles.push(result.value);
            } else if (result.status === "rejected") {
                this.eventTracer.isExceptionWithMessage(`Failed to upload file: ${result.reason}`);
            }
        }

        return uploadedFiles;
    }



    deleteFile= async (publicId: string): Promise<void> => {
        try{
            if(!publicId){
                return null;
            }
            this.eventTracer.say(`"Deleting file with public id ${publicId}`)
            
            const response = await cloudinary.uploader.destroy(publicId)
            this.eventTracer.isSuccessWithResponseAndMessage(response, "Successfully deleted")
        }
        catch(ex){
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            return null;
        }
    }
    
    deleteFileFromDisk = async (url: string) => {
        try{
            let deleted = await fs.unlink(path.join(process.cwd(), url))
            console.log({deleted})
        }
        catch(ex){
            
            console.error(`file in path ${url} not deleted with error: ${ex}`)
        }
    }
}