import UploadFile from '../../core/domain/common/model/upload_file';
import {Request} from 'express';
export default class BaseController {
    protected convertReqFileToUploadFile = (req: Request): UploadFile => {
        try{
            return new UploadFile({secure_url: req.file.path})
        }
        catch(ex){
            console.log(`An exception occured while converting Req file to upload file: ${ex} `)
            return null;
        }
    }

    protected convertReqFilesToUploadFiles = (req: Request, fieldName: string | null= null): UploadFile[] => {
        console.log("Na here we dey", req.files)
        let uploadFiles: UploadFile[] = [];
        try{
            let files = req.files;
            if(Array.isArray(files)){
                uploadFiles = files.map(file => new UploadFile({secure_url: file.path}))
            } else {
                uploadFiles = files[fieldName]?.map(file => new UploadFile({secure_url: file.path}))
            }
            return uploadFiles;
        }
        catch(ex){
            console.log(`An exception occured while converting Req files to upload files: ${ex} `)
            return uploadFiles;
        }
    }
}