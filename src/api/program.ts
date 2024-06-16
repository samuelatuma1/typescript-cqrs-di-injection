import {container, inject, injectable} from "tsyringe";
import { IILogger } from "../core/application/contract/observability/logger";
import Logger from "../core/infrastructure/observability/logger";
import { IIEventTracer } from "../core/application/contract/observability/event_tracer";
import EventTracer from "../core/infrastructure/observability/event_tracer";
import { IIUserPermissionRepository } from "../core/application/contract/data_access/authentication/permission_repository";
import UserPermissionRepository from "../core/infrastructure/persistence/data_access/authentication/user_permission_repository";
import { IIUserService } from "../core/application/contract/services/authentication/user_service";
import UserService from "../core/application/services/authentication/user_service";

container.register(IILogger, {
    useClass: Logger
  })

container.register(IIEventTracer, {
    useClass: EventTracer
  })

  container.register(IIUserPermissionRepository, {
    useClass: UserPermissionRepository
  })
  
  container.register(IIUserService, {
    useClass: UserService
  })

export {container as iocContainer}