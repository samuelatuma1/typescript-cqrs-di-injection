import ICloudinaryConfig, { IICloudinaryConfig } from "core/application/common/config/cloudinary_config";
import { inject, injectable } from "tsyringe";
import {v2 as cloudinary, UploadApiResponse} from 'cloudinary';
import IEventTracer, { IIEventTracer } from "../../observability/event_tracer";
import UploadFile from "core/domain/common/model/upload_file";

import { promises as fs } from "fs";
import path from "path";
export default interface IFileService {
    uploadFile( file: UploadFile, folder?: string | null , resourceType?: string , fileName?: string): Promise<UploadFile>;
    uploadMultipleFiles(files: UploadFile[]): Promise<UploadFile[]>
    deleteFile(publicId: string): Promise<void>;
}

export const IIFileService = 'IFileService'
