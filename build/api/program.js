"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iocContainer = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
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
const role_repository_1 = require("../core/application/contract/data_access/authentication/role_repository");
const user_role_repository_1 = __importDefault(require("../core/infrastructure/persistence/data_access/authentication/user_role_repository"));
const service_config_1 = require("../core/application/common/config/service_config");
const user_repository_1 = require("../core/application/contract/data_access/authentication/user_repository");
const user_repository_2 = __importDefault(require("../core/infrastructure/persistence/data_access/authentication/user_repository"));
const cloudinary_config_1 = require("../core/application/common/config/cloudinary_config");
const file_service_1 = require("../core/application/contract/services/files/file_service");
const file_service_2 = __importDefault(require("../core/infrastructure/services/files/file_service"));
const category_repository_1 = require("../core/application/contract/data_access/shop/category_repository");
const category_repository_2 = __importDefault(require("../core/infrastructure/persistence/data_access/shop/category_repository"));
const category_service_1 = __importDefault(require("../core/application/services/shop/category_service"));
const category_service_2 = require("../core/application/contract/services/shop/category_service");
const product_repository_1 = require("../core/application/contract/data_access/shop/product_repository");
const product_repository_2 = __importDefault(require("../core/infrastructure/persistence/data_access/shop/product_repository"));
const product_service_1 = require("../core/application/contract/services/shop/product_service");
const product_service_2 = __importDefault(require("../core/application/services/shop/product_service"));
const discount_repository_1 = require("../core/application/contract/data_access/shop/discount_repository");
const discount_repository_2 = __importDefault(require("../core/infrastructure/persistence/data_access/shop/discount_repository"));
const discount_service_1 = require("../core/application/contract/services/shop/discount_service");
const discount_service_2 = __importDefault(require("../core/application/services/shop/discount_service"));
const order_service_1 = require("../core/application/contract/services/shop/order_service");
const order_service_2 = __importDefault(require("../core/application/services/shop/order_service"));
const cart_repository_1 = require("../core/application/contract/data_access/shop/cart_repository");
const cart_repository_2 = __importDefault(require("../core/infrastructure/persistence/data_access/shop/cart_repository"));
const address_repository_1 = require("../core/application/contract/data_access/authentication/address_repository");
const address_reposiotry_1 = __importDefault(require("../core/infrastructure/persistence/data_access/authentication/address_reposiotry"));
const city_repository_1 = require("../core/application/contract/data_access/authentication/city_repository");
const city_repository_2 = __importDefault(require("../core/infrastructure/persistence/data_access/authentication/city_repository"));
const state_repository_1 = require("../core/application/contract/data_access/authentication/state_repository");
const state_repository_2 = __importDefault(require("../core/infrastructure/persistence/data_access/authentication/state_repository"));
const address_service_1 = require("../core/application/contract/services/authentication/address_service");
const address_service_2 = __importDefault(require("../core/application/services/authentication/address_service"));
const country_repository_1 = require("../core/application/contract/data_access/authentication/country_repository");
const country_repository_2 = __importDefault(require("../core/infrastructure/persistence/data_access/authentication/country_repository"));
const order_repository_1 = require("../core/application/contract/data_access/shop/order_repository");
const order_repository_2 = __importDefault(require("../core/infrastructure/persistence/data_access/shop/order_repository"));
const billboard_repository_1 = require("../core/application/contract/data_access/shop/billboard_repository");
const billboard_repository_2 = __importDefault(require("../core/infrastructure/persistence/data_access/shop/billboard_repository"));
const billboard_service_1 = require("../core/application/contract/services/shop/billboard_service");
const billboard_service_2 = __importDefault(require("../core/application/services/shop/billboard_service"));
const special_offer_repository_1 = require("../core/application/contract/data_access/shop/special_offer_repository");
const special_offer_repository_2 = __importDefault(require("../core/infrastructure/persistence/data_access/shop/special_offer_repository"));
const jwt_service_1 = require("../core/application/contract/services/authentication/jwt_service");
const jwt_service_2 = __importDefault(require("../core/infrastructure/services/authentication/jwt_service"));
const redis_config_1 = require("../core/application/common/config/redis_config");
const cache_service_1 = require("../core/application/contract/services/cache/cache_service");
const redis_cache_service_1 = require("../core/infrastructure/services/cache/redis_cache_service");
const event_service_1 = require("../core/application/contract/services/events/event_service");
const events_service_1 = __importDefault(require("../core/infrastructure/services/events/events_service"));
const catalogue_service_1 = require("../core/application/contract/services/shop/catalogue_service");
const catalogue_service_2 = __importDefault(require("../core/application/services/shop/catalogue_service"));
const catalogue_repository_1 = require("../core/application/contract/data_access/shop/catalogue_repository");
const catalogue_repository_2 = __importDefault(require("../core/infrastructure/persistence/data_access/shop/catalogue_repository"));
const brand_service_1 = require("../core/application/contract/services/shop/brand_service");
const brand_service_2 = __importDefault(require("../core/application/services/shop/brand_service"));
const brand_repository_1 = require("../core/application/contract/data_access/shop/brand_repository");
const brand_repository_2 = __importDefault(require("../core/infrastructure/persistence/data_access/shop/brand_repository"));
const brand_logic_1 = require("../core/application/contract/logic/shop/brand_logic");
const brand_logic_2 = __importDefault(require("../core/application/logic/shop/brand_logic"));
const category_logic_1 = require("../core/application/contract/logic/shop/category_logic");
const category_logic_2 = __importDefault(require("../core/application/logic/shop/category_logic"));
const order_service_consumer_1 = require("../core/application/contract/services/events/shop/consumer/order_service_consumer");
const order_service_consumer_2 = __importDefault(require("../core/application/services/shop/events/consumer/order_service_consumer"));
const order_service_producer_1 = require("../core/application/contract/services/events/shop/producer/order_service_producer");
const order_service_producer_2 = __importDefault(require("../core/application/services/shop/events/producer/order_service_producer"));
dotenv_1.default.config();
let env = process.env;
var serviceConfig = {
    hashkey: env.hashkey ?? '',
    jwtsecret: env.jwtsecret ?? ''
};
var cloudinaryConfig = {
    CLOUD_NAME: env.CLOUD_NAME,
    API_KEY: env.API_KEY,
    API_SECRET: env.API_SECRET
};
var redisConfig = {
    REDIS_URL: env.REDIS_URL ?? ''
};
tsyringe_1.container.register(logger_1.IILogger, {
    useClass: logger_2.default
});
tsyringe_1.container.register(event_tracer_1.IIEventTracer, {
    useClass: event_tracer_2.default
});
tsyringe_1.container.register(permission_repository_1.IIUserPermissionRepository, {
    useClass: user_permission_repository_1.default
});
tsyringe_1.container.register(user_repository_1.IIUserRepository, {
    useClass: user_repository_2.default
});
tsyringe_1.container.register(role_repository_1.IIRoleRepository, {
    useClass: user_role_repository_1.default
});
tsyringe_1.container.register(category_repository_1.IICategoryRepository, {
    useClass: category_repository_2.default
});
tsyringe_1.container.register(user_service_1.IIUserService, {
    useClass: user_service_2.default
});
tsyringe_1.container.register(product_repository_1.IIProductRepository, {
    useClass: product_repository_2.default
});
tsyringe_1.container.register(discount_repository_1.IIDiscountRepository, {
    useClass: discount_repository_2.default
});
tsyringe_1.container.register(cart_repository_1.IICartRepository, {
    useClass: cart_repository_2.default
});
tsyringe_1.container.register(order_repository_1.IIOrderRepository, {
    useClass: order_repository_2.default
});
tsyringe_1.container.register(state_repository_1.IIStateRepository, {
    useClass: state_repository_2.default
});
tsyringe_1.container.register(city_repository_1.IICityRepository, {
    useClass: city_repository_2.default
});
tsyringe_1.container.register(address_repository_1.IIAddressRepository, {
    useClass: address_reposiotry_1.default
});
tsyringe_1.container.register(country_repository_1.IICountryRepository, {
    useClass: country_repository_2.default
});
tsyringe_1.container.register(billboard_repository_1.IIBillboardRepository, {
    useClass: billboard_repository_2.default
});
tsyringe_1.container.register(special_offer_repository_1.IISpecialOfferRepository, {
    useClass: special_offer_repository_2.default
});
tsyringe_1.container.register(catalogue_repository_1.IICatalogueRepository, {
    useClass: catalogue_repository_2.default
});
tsyringe_1.container.register(category_service_2.IICategoryService, {
    useClass: category_service_1.default
});
tsyringe_1.container.register(product_service_1.IIProductService, {
    useClass: product_service_2.default
});
tsyringe_1.container.register(discount_service_1.IIDiscountService, {
    useClass: discount_service_2.default
});
tsyringe_1.container.register(order_service_1.IIOrderService, {
    useClass: order_service_2.default
});
tsyringe_1.container.register(address_service_1.IIAddressService, {
    useClass: address_service_2.default
});
tsyringe_1.container.register(billboard_service_1.IIBillboardService, {
    useClass: billboard_service_2.default
});
tsyringe_1.container.register(catalogue_service_1.IICatalogueService, {
    useClass: catalogue_service_2.default
});
tsyringe_1.container.register(service_config_1.IIServiceConfig, {
    useValue: serviceConfig
});
tsyringe_1.container.register(cloudinary_config_1.IICloudinaryConfig, {
    useValue: cloudinaryConfig
});
tsyringe_1.container.register(redis_config_1.IIRedisConfig, {
    useValue: redisConfig
});
tsyringe_1.container.register(file_service_1.IIFileService, {
    useClass: file_service_2.default
});
tsyringe_1.container.register(jwt_service_1.IIJwtService, {
    useClass: jwt_service_2.default
});
tsyringe_1.container.register(cache_service_1.IICacheService, {
    useClass: redis_cache_service_1.RedisCache
});
tsyringe_1.container.register(event_service_1.IIEventService, {
    useClass: events_service_1.default
});
tsyringe_1.container.register(brand_service_1.IIBrandService, {
    useClass: brand_service_2.default
});
tsyringe_1.container.register(brand_repository_1.IIBrandRepository, {
    useClass: brand_repository_2.default
});
tsyringe_1.container.register(brand_logic_1.IIBrandLogic, {
    useClass: brand_logic_2.default
});
tsyringe_1.container.register(category_logic_1.IICategoryLogic, {
    useClass: category_logic_2.default
});
tsyringe_1.container.register(order_service_consumer_1.IIOrderServiceConsumer, {
    useClass: order_service_consumer_2.default
});
tsyringe_1.container.register(order_service_producer_1.IIOrderServiceProducer, {
    useClass: order_service_producer_2.default
});
//# sourceMappingURL=program.js.map