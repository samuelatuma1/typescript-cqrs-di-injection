import UploadFile from "../../../../domain/common/model/upload_file";
export default interface IFileService {
    uploadFile(file: UploadFile, folder?: string | null, resourceType?: string, fileName?: string): Promise<UploadFile>;
    uploadMultipleFiles(files: UploadFile[]): Promise<UploadFile[]>;
    deleteFile(publicId: string): Promise<void>;
}
export declare const IIFileService = "IFileService";
