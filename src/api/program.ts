import dotenv from 'dotenv'
import {container, inject, injectable} from "tsyringe";
import { IILogger } from "../core/application/contract/observability/logger";
import Logger from "../core/infrastructure/observability/logger";
import { IIEventTracer } from "../core/application/contract/observability/event_tracer";
import EventTracer from "../core/infrastructure/observability/event_tracer";
import { IIUserPermissionRepository } from "../core/application/contract/data_access/authentication/permission_repository";
import UserPermissionRepository from "../core/infrastructure/persistence/data_access/authentication/user_permission_repository";
import { IIUserService } from "../core/application/contract/services/authentication/user_service";
import UserService from "../core/application/services/authentication/user_service";
import { IIRoleRepository } from "../core/application/contract/data_access/authentication/role_repository";
import UserRoleRepository from "../core/infrastructure/persistence/data_access/authentication/user_role_repository";
import IServiceConfig, { IIServiceConfig } from "../core/application/common/config/service_config";
import { IIUserRepository } from "../core/application/contract/data_access/authentication/user_repository";
import UserRepository from "../core/infrastructure/persistence/data_access/authentication/user_repository";
import ICloudinaryConfig, { IICloudinaryConfig } from "../core/application/common/config/cloudinary_config";
import { IIFileService } from "../core/application/contract/services/files/file_service";
import CloudinaryService from "../core/infrastructure/services/files/file_service";
import { IICategoryRepository } from "../core/application/contract/data_access/shop/category_repository";
import CategoryRepository from "../core/infrastructure/persistence/data_access/shop/category_repository";
import CategoryService from "../core/application/services/shop/category_service";
import { IICategoryService } from "../core/application/contract/services/shop/category_service";
import { IIProductRepository } from "../core/application/contract/data_access/shop/product_repository";
import ProductRepository from "../core/infrastructure/persistence/data_access/shop/product_repository";
import { IIProductService } from "../core/application/contract/services/shop/product_service";
import ProductService from '../core/application/services/shop/product_service';

dotenv.config();

let env = process.env;
var  serviceConfig : IServiceConfig = {
  hashkey: env.hashkey ?? ''
}

var cloudinaryConfig : ICloudinaryConfig = {
  CLOUD_NAME: env.CLOUD_NAME,
  API_KEY: env.API_KEY,
  API_SECRET: env.API_SECRET
}
container.register(IILogger, {
    useClass: Logger
  })

container.register(IIEventTracer, {
    useClass: EventTracer
  })

container.register(IIUserPermissionRepository, {
  useClass: UserPermissionRepository
})

container.register(IIUserRepository, {
  useClass: UserRepository
})

container.register(IIRoleRepository, {
  useClass: UserRoleRepository
})

container.register(IICategoryRepository,  {
  useClass: CategoryRepository
})
container.register(IIUserService, {
  useClass: UserService
})

container.register(IIProductRepository, {
  useClass: ProductRepository
})

container.register(IICategoryService, {
  useClass: CategoryService
})

container.register(IIProductService, {
  useClass: ProductService
})
container.register(IIServiceConfig, {
  useValue: serviceConfig
})

container.register(IICloudinaryConfig, {
  useValue: cloudinaryConfig
})

container.register(IIFileService, {
  useClass: CloudinaryService
})

export {container as iocContainer}