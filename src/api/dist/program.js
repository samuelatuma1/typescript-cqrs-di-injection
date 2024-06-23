"use strict";
exports.__esModule = true;
exports.iocContainer = void 0;
var tsyringe_1 = require("tsyringe");
exports.iocContainer = tsyringe_1.container;
var logger_1 = require("../core/application/contract/observability/logger");
var logger_2 = require("../core/infrastructure/observability/logger");
var event_tracer_1 = require("../core/application/contract/observability/event_tracer");
var event_tracer_2 = require("../core/infrastructure/observability/event_tracer");
var permission_repository_1 = require("../core/application/contract/data_access/authentication/permission_repository");
var user_permission_repository_1 = require("../core/infrastructure/persistence/data_access/authentication/user_permission_repository");
var user_service_1 = require("../core/application/contract/services/authentication/user_service");
var user_service_2 = require("../core/application/services/authentication/user_service");
var role_repository_1 = require("core/application/contract/data_access/authentication/role_repository");
var user_role_repository_1 = require("core/infrastructure/persistence/data_access/authentication/user_role_repository");
tsyringe_1.container.register(logger_1.IILogger, {
    useClass: logger_2["default"]
});
tsyringe_1.container.register(event_tracer_1.IIEventTracer, {
    useClass: event_tracer_2["default"]
});
tsyringe_1.container.register(permission_repository_1.IIUserPermissionRepository, {
    useClass: user_permission_repository_1["default"]
});
tsyringe_1.container.register(role_repository_1.IIRoleRepository, {
    useClass: user_role_repository_1["default"]
});
tsyringe_1.container.register(user_service_1.IIUserService, {
    useClass: user_service_2["default"]
});
