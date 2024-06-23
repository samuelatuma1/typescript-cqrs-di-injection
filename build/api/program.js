"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iocContainer = void 0;
const tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "iocContainer", { enumerable: true, get: function () { return tsyringe_1.container; } });
const logger_1 = require("../core/application/contract/observability/logger");
const logger_2 = __importDefault(require("../core/infrastructure/observability/logger"));
const event_tracer_1 = require("../core/application/contract/observability/event_tracer");
const event_tracer_2 = __importDefault(require("../core/infrastructure/observability/event_tracer"));
const permission_repository_1 = require("../core/application/contract/data_access/authentication/permission_repository");
const user_permission_repository_1 = __importDefault(require("../core/infrastructure/persistence/data_access/authentication/user_permission_repository"));
const user_service_1 = require("../core/application/contract/services/authentication/user_service");
const user_service_2 = __importDefault(require("../core/application/services/authentication/user_service"));
const role_repository_1 = require("core/application/contract/data_access/authentication/role_repository");
const user_role_repository_1 = __importDefault(require("core/infrastructure/persistence/data_access/authentication/user_role_repository"));
tsyringe_1.container.register(logger_1.IILogger, {
    useClass: logger_2.default
});
tsyringe_1.container.register(event_tracer_1.IIEventTracer, {
    useClass: event_tracer_2.default
});
tsyringe_1.container.register(permission_repository_1.IIUserPermissionRepository, {
    useClass: user_permission_repository_1.default
});
tsyringe_1.container.register(role_repository_1.IIRoleRepository, {
    useClass: user_role_repository_1.default
});
tsyringe_1.container.register(user_service_1.IIUserService, {
    useClass: user_service_2.default
});
//# sourceMappingURL=program.js.map