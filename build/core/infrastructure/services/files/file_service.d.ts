import ICloudinaryConfig from "../../../../core/application/common/config/cloudinary_config";
import IEventTracer from "../../../../core/application/contract/observability/event_tracer";
import IFileService from "../../../../core/application/contract/services/files/file_service";
import UploadFile from "../../../../core/domain/common/model/upload_file";
export default class CloudinaryService implements IFileService {
    private readonly cloudinaryConfig;
    private readonly eventTracer;
    constructor(cloudinaryConfig: ICloudinaryConfig, eventTracer: IEventTracer);
    uploadFile: (file: UploadFile) => Promise<UploadFile>;
    uploadMultipleFiles: (files: UploadFile[]) => Promise<UploadFile[]>;
    deleteFile: (publicId: string) => Promise<void>;
    deleteFileFromDisk: (url: string) => Promise<void>;
}
