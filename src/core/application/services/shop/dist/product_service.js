"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var product_requests_1 = require("../../../domain/shop/dto/requests/product_requests");
var tsyringe_1 = require("tsyringe");
var event_tracer_1 = require("../../../application/contract/observability/event_tracer");
var category_service_1 = require("../../../application/contract/services/shop/category_service");
var object_utility_1 = require("../../../application/common/utilities/object_utility");
var filter_for_product_1 = require("../../../domain/shop/entity/filter_for_product");
var product_1 = require("../../../domain/shop/entity/product");
var mongoose_1 = require("mongoose");
var product_inventory_1 = require("../../../domain/shop/entity/product_inventory");
var product_repository_1 = require("../../../application/contract/data_access/shop/product_repository");
var file_service_1 = require("../../../application/contract/services/files/file_service");
var not_found_exception_1 = require("../../../application/common/exceptions/not_found_exception");
var product_response_1 = require("../../../domain/shop/dto/responses/product_response");
var discount_service_1 = require("../../../application/contract/services/shop/discount_service");
var discount_1 = require("../../../domain/shop/entity/discount");
var date_utility_1 = require("../../../application/common/utilities/date_utility");
var validation_exception_1 = require("../../../application/common/exceptions/validation_exception");
var serialization_utility_1 = require("../../../application/common/utilities/serialization_utility");
var pagination_result_1 = require("../../../domain/authentication/dto/results/pagination_result");
var cart_1 = require("../../../domain/shop/entity/cart");
var item_status_1 = require("../../../domain/shop/enum/item_status");
var cart_request_1 = require("../../../domain/shop/dto/requests/cart_request");
var ProductService = /** @class */ (function () {
    function ProductService(eventTracer, categoryService, productRepository, discountService, fileService) {
        var _this = this;
        this.eventTracer = eventTracer;
        this.categoryService = categoryService;
        this.productRepository = productRepository;
        this.discountService = discountService;
        this.fileService = fileService;
        this.ProductMainImageFolder = "BEAUTY_PRODUCT_MAIN";
        this.ProductOtherMediaFolder = "BEAUTY_PRODUCT_OTHERS";
        this.getProductByIdOrRaiseException = function (productId, joins) { return __awaiter(_this, void 0, Promise, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productId = new mongoose_1.Types.ObjectId(productId);
                        return [4 /*yield*/, this.productRepository.getByIdAsync(productId, joins)];
                    case 1:
                        product = _a.sent();
                        if (!product)
                            throw new not_found_exception_1["default"]("Product with id " + productId + " not found");
                        return [2 /*return*/, product];
                }
            });
        }); };
        this.convertCreateProductRequestToProduct = function (createProductRequest, filtersForProductMap) {
            var _a, _b, _c, _d, _e, _f;
            return new product_1["default"]({
                name: createProductRequest.name,
                desc: (_a = createProductRequest.desc) !== null && _a !== void 0 ? _a : "",
                mainImg: (_b = createProductRequest.mainImg) !== null && _b !== void 0 ? _b : null,
                otherMedia: (_c = createProductRequest.otherMedia) !== null && _c !== void 0 ? _c : [],
                inventory: (_d = createProductRequest.inventory) !== null && _d !== void 0 ? _d : new product_inventory_1.ProductInventory(),
                price: createProductRequest.price,
                currency: createProductRequest.currency,
                filters: filtersForProductMap,
                categories: (_f = (_e = createProductRequest.categories) === null || _e === void 0 ? void 0 : _e.map(function (cat) { return new mongoose_1.Types.ObjectId(cat); })) !== null && _f !== void 0 ? _f : [],
                extras: createProductRequest.extras,
                isPack: createProductRequest.isPack
            });
        };
        this.getAllCategoryFiltersForProduct = function (categoriesIds) { return __awaiter(_this, void 0, Promise, function () {
            var allCategories, allCategoriesFiltersDict, _i, allCategories_1, category, filters, _a, filters_1, filter;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        allCategories = [];
                        allCategoriesFiltersDict = {};
                        if (!(categoriesIds === null || categoriesIds === void 0 ? void 0 : categoriesIds.length)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.categoryService.getCategoriesByIds(categoriesIds, true)];
                    case 1:
                        allCategories = _b.sent();
                        for (_i = 0, allCategories_1 = allCategories; _i < allCategories_1.length; _i++) {
                            category = allCategories_1[_i];
                            filters = category.filters;
                            for (_a = 0, filters_1 = filters; _a < filters_1.length; _a++) {
                                filter = filters_1[_a];
                                allCategoriesFiltersDict[filter._id.toJSON()] = filter;
                            }
                        }
                        _b.label = 2;
                    case 2: return [2 /*return*/, allCategoriesFiltersDict];
                }
            });
        }); };
        this.validateAndSetFiltersForProduct = function (categoriesIds, filters) { return __awaiter(_this, void 0, Promise, function () {
            var allCategoriesFiltersDict, filtersForProductMap, _i, _a, _b, key, filterForProduct, filterDetails, productFilter;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getAllCategoryFiltersForProduct(categoriesIds)];
                    case 1:
                        allCategoriesFiltersDict = _c.sent();
                        filtersForProductMap = new Map();
                        if (object_utility_1["default"].objectSize(filters)) {
                            for (_i = 0, _a = Object.entries(filters); _i < _a.length; _i++) {
                                _b = _a[_i], key = _b[0], filterForProduct = _b[1];
                                if (allCategoriesFiltersDict.hasOwnProperty(key)) {
                                    this.eventTracer.say("Creating filter for filterId : " + key);
                                    filterDetails = allCategoriesFiltersDict[key];
                                    productFilter = new filter_for_product_1["default"]({
                                        name: filterDetails.name,
                                        values: filterForProduct.values,
                                        categoryId: filterDetails.categoryId,
                                        filterType: filterDetails.filterType,
                                        filterId: filterDetails._id
                                    });
                                    filtersForProductMap.set(key, productFilter);
                                }
                            }
                        }
                        return [2 /*return*/, filtersForProductMap];
                }
            });
        }); };
        this.createProduct = function (createProductRequest) { return __awaiter(_this, void 0, Promise, function () {
            var filtersForProductMap, product, _a, _b, savedProduct, ex_1;
            var _this = this;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 7, , 8]);
                        this.eventTracer.request = createProductRequest;
                        this.eventTracer.say("Creating new Product");
                        createProductRequest = new product_requests_1.CreateProductRequest(createProductRequest);
                        return [4 /*yield*/, this.validateAndSetFiltersForProduct(createProductRequest.categories, createProductRequest.filters)];
                    case 1:
                        filtersForProductMap = _d.sent();
                        this.eventTracer.say("created Filters For Products");
                        product = this.convertCreateProductRequestToProduct(createProductRequest, filtersForProductMap);
                        if (!product.mainImg) return [3 /*break*/, 3];
                        product.mainImg.folder = this.ProductMainImageFolder;
                        this.eventTracer.say("Saving main image for product");
                        _a = product;
                        return [4 /*yield*/, this.fileService.uploadFile(product.mainImg)];
                    case 2:
                        _a.mainImg = _d.sent();
                        _d.label = 3;
                    case 3:
                        if (!((_c = product.otherMedia) === null || _c === void 0 ? void 0 : _c.length)) return [3 /*break*/, 5];
                        product.otherMedia = product.otherMedia.map(function (media) {
                            media.folder = _this.ProductOtherMediaFolder;
                            return media;
                        });
                        this.eventTracer.say("Saving other media for product");
                        _b = product;
                        return [4 /*yield*/, this.fileService.uploadMultipleFiles(product.otherMedia)];
                    case 4:
                        _b.otherMedia = _d.sent();
                        _d.label = 5;
                    case 5: return [4 /*yield*/, this.productRepository.addAsync(product)];
                    case 6:
                        savedProduct = _d.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(savedProduct);
                        return [2 /*return*/, savedProduct];
                    case 7:
                        ex_1 = _d.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_1);
                        throw ex_1;
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.addPackProduct = function (productId, createPackProduct) { return __awaiter(_this, void 0, Promise, function () {
            var product, uploadedImage, packProduct, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // get product and ensure it is a pack.
                        productId = new mongoose_1.Types.ObjectId(productId);
                        return [4 /*yield*/, this.productRepository.getByIdAsync(productId)];
                    case 1:
                        product = _b.sent();
                        if (!(product === null || product === void 0 ? void 0 : product.isPack)) {
                            throw new validation_exception_1["default"]("Product not a Pack");
                        }
                        // add product to pack
                        console.log("-----------------------------------------------------");
                        console.log({ PRODUCTIMG: createPackProduct.mainImg });
                        console.log("-----------------------------------------------------");
                        if (!createPackProduct.mainImg) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.fileService.uploadFile(createPackProduct.mainImg)];
                    case 2:
                        uploadedImage = _b.sent();
                        console.log({ uploadedImage: uploadedImage });
                        createPackProduct.mainImg = uploadedImage;
                        _b.label = 3;
                    case 3:
                        packProduct = __assign({}, createPackProduct);
                        product.packProducts.push(packProduct);
                        return [4 /*yield*/, this.productRepository.updateByIdAsync(productId, { packProducts: product.packProducts })];
                    case 4:
                        _b.sent();
                        _a = this.convertProductToProductResponse;
                        return [4 /*yield*/, this.productRepository.getByIdAsync(productId)];
                    case 5: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        }); };
        this.getQuery = function (query, options) { return __awaiter(_this, void 0, Promise, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.productRepository.getAsync(query, { discounts: (_a = options.includeDiscounts) !== null && _a !== void 0 ? _a : false })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        }); };
        this.addPackProducts = function (productId, createPackProducts) { return __awaiter(_this, void 0, Promise, function () {
            var addedProducts, _i, createPackProducts_1, packProduct, addedProduct, _a, ex_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        // get product and ensure it is a pack.
                        productId = new mongoose_1.Types.ObjectId(productId);
                        console.log({ createPackProducts: createPackProducts.map(function (pred) { return pred.mainImg; }) });
                        this.eventTracer.say("Adding multiple products of size " + createPackProducts.length);
                        this.eventTracer.request = createPackProducts;
                        addedProducts = [];
                        _i = 0, createPackProducts_1 = createPackProducts;
                        _b.label = 1;
                    case 1:
                        if (!(_i < createPackProducts_1.length)) return [3 /*break*/, 4];
                        packProduct = createPackProducts_1[_i];
                        return [4 /*yield*/, this.addPackProduct(productId, packProduct)];
                    case 2:
                        addedProduct = _b.sent();
                        addedProducts.push(addedProduct);
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.eventTracer.isSuccessWithResponseAndMessage(addedProducts);
                        _a = this.convertProductToProductResponse;
                        return [4 /*yield*/, this.productRepository.getByIdAsync(productId)];
                    case 5: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                    case 6:
                        ex_2 = _b.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_2);
                        throw ex_2;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.updatePackProduct = function (productId, packProductId, packProductUpdate) { return __awaiter(_this, void 0, Promise, function () {
            var cleanedUpdate, product, packProducts, i, packProduct, updateForProduct, updatedMainImg, newMedia, updatedPackProduct, response, _a, ex_3;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 13, , 14]);
                        this.eventTracer.say("Update Pack Product: Product Id" + productId + ", PackProductId: " + packProductId);
                        this.eventTracer.request = packProductUpdate;
                        cleanedUpdate = object_utility_1["default"].removeNullOrUndefinedValuesFromObject(packProductUpdate);
                        productId = new mongoose_1.Types.ObjectId(productId);
                        packProductId = new mongoose_1.Types.ObjectId(packProductId);
                        return [4 /*yield*/, this.productRepository.getByIdAsync(productId)];
                    case 1:
                        product = _d.sent();
                        if (!product) {
                            throw new not_found_exception_1["default"]("Product with id " + productId);
                        }
                        packProducts = (_b = product.packProducts) !== null && _b !== void 0 ? _b : [];
                        i = 0;
                        _d.label = 2;
                    case 2:
                        if (!(i < packProducts.length)) return [3 /*break*/, 9];
                        packProduct = packProducts[i];
                        if (!(packProduct._id.toString() === packProductId.toString())) return [3 /*break*/, 8];
                        this.eventTracer.say("Pack product to update found");
                        updateForProduct = cleanedUpdate;
                        if (!cleanedUpdate.mainImg) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.fileService.deleteFile((_c = packProduct.mainImg) === null || _c === void 0 ? void 0 : _c.public_id)];
                    case 3:
                        _d.sent();
                        return [4 /*yield*/, this.fileService.uploadFile(cleanedUpdate.mainImg)];
                    case 4:
                        updatedMainImg = _d.sent();
                        updateForProduct.mainImg = updatedMainImg;
                        _d.label = 5;
                    case 5:
                        if (!cleanedUpdate.otherMedia) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.fileService.uploadMultipleFiles(cleanedUpdate.otherMedia)];
                    case 6:
                        newMedia = _d.sent();
                        updateForProduct.otherMedia = __spreadArrays(packProduct.otherMedia, newMedia.filter(function (d) { return d; }));
                        _d.label = 7;
                    case 7:
                        updatedPackProduct = object_utility_1["default"].updateAwithB(packProduct, cleanedUpdate);
                        this.eventTracer.say("updatedPackProduct Update :\n    " + serialization_utility_1["default"].serializeJson(updatedPackProduct));
                        packProducts[i] = updatedPackProduct;
                        _d.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 2];
                    case 9:
                        if (!packProducts.length) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.productRepository.updateByIdAsync(productId, { packProducts: packProducts })];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11:
                        _a = this.convertProductToProductResponse;
                        return [4 /*yield*/, this.productRepository.getByIdAsync(productId)];
                    case 12:
                        response = _a.apply(this, [_d.sent()]);
                        this.eventTracer.isSuccessWithResponseAndMessage(response);
                        return [2 /*return*/, response];
                    case 13:
                        ex_3 = _d.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_3);
                        throw ex_3;
                    case 14: return [2 /*return*/];
                }
            });
        }); };
        this.deletePackProduct = function (productId, packProductId) { return __awaiter(_this, void 0, Promise, function () {
            var product, packProducts, _i, packProducts_1, packProduct, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        // get product and ensure it is a pack.
                        productId = new mongoose_1.Types.ObjectId(productId);
                        packProductId = new mongoose_1.Types.ObjectId(packProductId);
                        return [4 /*yield*/, this.productRepository.getByIdAsync(productId)];
                    case 1:
                        product = _c.sent();
                        if (!(product === null || product === void 0 ? void 0 : product.isPack)) {
                            throw new validation_exception_1["default"]("Product not a Pack");
                        }
                        packProducts = (_b = product.packProducts) !== null && _b !== void 0 ? _b : [];
                        for (_i = 0, packProducts_1 = packProducts; _i < packProducts_1.length; _i++) {
                            packProduct = packProducts_1[_i];
                            if (packProduct._id.toString() === packProductId.toString()) {
                                packProduct.isDeleted = true;
                            }
                        }
                        return [4 /*yield*/, this.productRepository.updateByIdAsync(productId, { packProducts: packProducts })];
                    case 2:
                        _c.sent();
                        _a = this.convertProductToProductResponse;
                        return [4 /*yield*/, this.productRepository.getByIdAsync(productId)];
                    case 3: return [2 /*return*/, _a.apply(this, [_c.sent()])];
                }
            });
        }); };
        this.buildUpdateData = function (product, updateProductRequest) {
            var updateData = {};
            if (updateProductRequest.name && product.name !== updateProductRequest.name) {
                updateData.name = updateProductRequest.name;
            }
            if (updateProductRequest.desc && product.desc !== updateProductRequest.desc) {
                updateData.desc = updateProductRequest.desc;
            }
            if (updateProductRequest.price && product.price !== updateProductRequest.price) {
                updateData.price = updateProductRequest.price;
            }
            if (updateProductRequest.currency && product.currency !== updateProductRequest.currency) {
                updateData.currency = updateProductRequest.currency;
            }
            if (updateProductRequest.extras && updateProductRequest.extras.length) {
                updateData.extras = updateProductRequest.extras;
            }
            return updateData;
        };
        this.updateProduct = function (productId, updateProductRequest) { return __awaiter(_this, void 0, Promise, function () {
            var product, updateData, categoriesIds, updatedCategories, categoryIds, _a, updatedProduct, ex_4;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.eventTracer.say("Updating Product");
                        this.eventTracer.request = updateProductRequest;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 9, , 10]);
                        return [4 /*yield*/, this.getProductByIdOrRaiseException(productId)];
                    case 2:
                        product = _c.sent();
                        this.eventTracer.say("Product gotten for product with id " + productId);
                        updateData = this.buildUpdateData(product, updateProductRequest);
                        if (!(updateProductRequest.categories && updateProductRequest.categories.length)) return [3 /*break*/, 4];
                        categoriesIds = updateProductRequest.categories.map(function (categoryId) { return new mongoose_1.Types.ObjectId(categoryId); });
                        return [4 /*yield*/, this.categoryService.getCategoriesByIds(categoriesIds, false)];
                    case 3:
                        updatedCategories = _c.sent();
                        updateData.categories = updatedCategories.map(function (category) { return category._id; });
                        _c.label = 4;
                    case 4:
                        if (!(updateProductRequest.filters && object_utility_1["default"].objectSize(updateProductRequest.filters))) return [3 /*break*/, 6];
                        categoryIds = ((_b = updateProductRequest.categories) === null || _b === void 0 ? void 0 : _b.length) ? updateProductRequest.categories : product.categories;
                        _a = updateData;
                        return [4 /*yield*/, this.validateAndSetFiltersForProduct(categoryIds, updateProductRequest.filters)];
                    case 5:
                        _a.filters = _c.sent();
                        _c.label = 6;
                    case 6:
                        this.eventTracer.say("Fields to update " + JSON.stringify(updateData));
                        return [4 /*yield*/, this.productRepository.updateByIdAsync(product._id, updateData)];
                    case 7:
                        _c.sent();
                        return [4 /*yield*/, this.productRepository.getByIdAsync(product._id)];
                    case 8:
                        updatedProduct = _c.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(updateProductRequest);
                        return [2 /*return*/, updatedProduct];
                    case 9:
                        ex_4 = _c.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_4);
                        throw ex_4;
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        this.convertProductToProductResponse = function (product) {
            var _a;
            var productResponse = new product_response_1.ProductResponse(product);
            productResponse._id = product._id;
            productResponse.packProducts = (_a = productResponse.packProducts) === null || _a === void 0 ? void 0 : _a.filter(function (prod) { return !prod.isDeleted; });
            return productResponse;
        };
        this.convertProductToProductResponseAsync = function (product, options) { return __awaiter(_this, void 0, Promise, function () {
            var productResponse;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        productResponse = new product_response_1.ProductResponse(product);
                        productResponse._id = product._id;
                        productResponse.packProducts = (_a = productResponse.packProducts) === null || _a === void 0 ? void 0 : _a.filter(function (prod) { return !prod.isDeleted; });
                        if (!((_b = options.includeDiscountAndDiscountPrice) !== null && _b !== void 0 ? _b : false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getDiscountedPriceAndAppliedDiscountsForProduct(productResponse)];
                    case 1:
                        productResponse = _c.sent();
                        _c.label = 2;
                    case 2: return [2 /*return*/, productResponse];
                }
            });
        }); };
        this.convertProductsToProductResponse = function (products, options) { return __awaiter(_this, void 0, Promise, function () {
            var productsResponses, productsResponsePromises, _i, productsResponsePromises_1, productPromise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productsResponses = [];
                        return [4 /*yield*/, Promise.allSettled(products.map(function (product) { return _this.convertProductToProductResponseAsync(product, { includeDiscountAndDiscountPrice: options.includeDiscountAndDiscountPrice }); }))];
                    case 1:
                        productsResponsePromises = _a.sent();
                        for (_i = 0, productsResponsePromises_1 = productsResponsePromises; _i < productsResponsePromises_1.length; _i++) {
                            productPromise = productsResponsePromises_1[_i];
                            if (productPromise.status === "fulfilled" && productPromise.value) {
                                productsResponses.push(productPromise.value);
                            }
                        }
                        return [2 /*return*/, productsResponses];
                }
            });
        }); };
        this.getProducts = function (getProductsQuery, options) { return __awaiter(_this, void 0, Promise, function () {
            var products, allProducts;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.productRepository.getAsync(getProductsQuery, { categories: options.includeCategories })];
                    case 1:
                        products = _a.sent();
                        return [4 /*yield*/, Promise.allSettled(products.map(function (product) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, this.convertProductToProductResponseAsync(product, { includeDiscountAndDiscountPrice: (_a = options.includeDiscountAndDiscountPrice) !== null && _a !== void 0 ? _a : true })];
                                    case 1: return [2 /*return*/, _b.sent()];
                                }
                            }); }); }))];
                    case 2:
                        allProducts = _a.sent();
                        return [2 /*return*/, allProducts.map(function (item) {
                                if (item.status === "fulfilled" && item.value) {
                                    return item.value;
                                }
                            })
                                .filter(function (item) { return item; })];
                }
            });
        }); };
        this.getProduct = function (productId) { return __awaiter(_this, void 0, Promise, function () {
            var productFromDb, product, allCategoriesFiltersDict, ex_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.eventTracer.say("Getting product with id: " + productId);
                        return [4 /*yield*/, this.getProductByIdOrRaiseException(productId, { discounts: true })];
                    case 1:
                        productFromDb = _a.sent();
                        return [4 /*yield*/, this.convertProductsToProductResponse([productFromDb], { includeDiscountAndDiscountPrice: true })];
                    case 2:
                        product = (_a.sent())[0];
                        return [4 /*yield*/, this.getAllCategoryFiltersForProduct(product.categories)];
                    case 3:
                        allCategoriesFiltersDict = _a.sent();
                        this.eventTracer.say("Added all filters to product");
                        product.allFiltersForProduct = allCategoriesFiltersDict;
                        this.eventTracer.isSuccessWithResponseAndMessage(product);
                        console.log({ pF: product.allFiltersForProduct, product: product, isProductResponse: product instanceof product_response_1.ProductResponse });
                        return [2 /*return*/, product];
                    case 4:
                        ex_5 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_5);
                        throw ex_5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.transformCategoryFiltersToDict = function (filters) {
            var filterDict = {};
            for (var _i = 0, filters_2 = filters; _i < filters_2.length; _i++) {
                var filter = filters_2[_i];
                filterDict[filter._id.toJSON()] = filter;
            }
            return filterDict;
        };
        this.isValidDiscount = function (discount, productCurrency) {
            var isValidDiscount = false;
            var timeNow = date_utility_1["default"].getUTCNow();
            var pastValidity = discount.validityStartDate > timeNow || discount.validityEndDate < timeNow;
            var useageLimitExceeded = discount.usedCount > discount.useageLimit;
            switch (discount.discountType) {
                case discount_1.DiscountType.bogo:
                    break;
                case discount_1.DiscountType.fixed:
                    var currencyMisMatch = productCurrency !== discount.currency;
                    console.log({ pastValidity: pastValidity, useageLimitExceeded: useageLimitExceeded, currencyMisMatch: currencyMisMatch, productCurrency: productCurrency, discountCurrency: discount.currency });
                    return !(currencyMisMatch || pastValidity || useageLimitExceeded);
                case discount_1.DiscountType.percentage:
                    return !(pastValidity || useageLimitExceeded);
                default:
                    break;
            }
            return isValidDiscount;
        };
        this.getActiveDiscount = function (product) { return __awaiter(_this, void 0, Promise, function () {
            var discounts, cleanedDiscount, _i, discounts_1, discount, productDiscount, discountToApply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        discounts = product.discounts;
                        cleanedDiscount = [];
                        _i = 0, discounts_1 = discounts;
                        _a.label = 1;
                    case 1:
                        if (!(_i < discounts_1.length)) return [3 /*break*/, 6];
                        discount = discounts_1[_i];
                        productDiscount = void 0;
                        if (!!(discount instanceof discount_1["default"])) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.discountService.getDiscountById(discount)];
                    case 2:
                        productDiscount = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        productDiscount = discount;
                        _a.label = 4;
                    case 4:
                        cleanedDiscount.push(productDiscount);
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6:
                        cleanedDiscount.sort(function (a, b) {
                            var _a, _b, _c, _d;
                            var millisecondsForA = (_b = (_a = a.createdAt) === null || _a === void 0 ? void 0 : _a.getTime()) !== null && _b !== void 0 ? _b : 0;
                            var millisecondsForB = (_d = (_c = b.createdAt) === null || _c === void 0 ? void 0 : _c.getTime()) !== null && _d !== void 0 ? _d : 0;
                            return millisecondsForB - millisecondsForA; // sort date in descending order
                        });
                        if (!cleanedDiscount.length) {
                            return [2 /*return*/, null];
                        }
                        discountToApply = cleanedDiscount[0];
                        if (this.isValidDiscount(discountToApply, product.currency)) {
                            return [2 /*return*/, discountToApply];
                        }
                        // NOTE:  Use only if we want to apply the most recent *VALID* Discount to this product
                        // for(let discount of cleanedDiscount){ 
                        //     console.log({"Working": "WORKING", discount})
                        //     if(this.isValidDiscount(discount, product.currency)){
                        //         return discount;
                        //     }
                        // }
                        return [2 /*return*/, null];
                }
            });
        }); };
        this.getDiscountedPriceAndAppliedDiscountsForProduct = function (product) { return __awaiter(_this, void 0, Promise, function () {
            var discountedPrice, priceDiscount, activeDiscount, ex_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("We reach here");
                        this.eventTracer.say("Get Discounted Price And Applied DiscountsForProduct");
                        if (!product.discounts.length) {
                            return [2 /*return*/, product];
                        }
                        discountedPrice = product.price;
                        priceDiscount = void 0;
                        product.discountedPrice = product.price;
                        return [4 /*yield*/, this.getActiveDiscount(product)];
                    case 1:
                        activeDiscount = _a.sent();
                        if (!activeDiscount) {
                            return [2 /*return*/, product];
                        }
                        switch (activeDiscount.discountType) {
                            case discount_1.DiscountType.fixed:
                                priceDiscount = discountedPrice - activeDiscount.value;
                                console.log({ discountedPrice: discountedPrice, priceDiscount: priceDiscount, activeDiscountVal: activeDiscount.value });
                                if (priceDiscount <= 0) {
                                    priceDiscount = discountedPrice;
                                }
                                discountedPrice = priceDiscount;
                                product.discountedPrice = discountedPrice;
                                product.applieddiscounts.push(activeDiscount);
                                break;
                            case discount_1.DiscountType.percentage:
                                priceDiscount = discountedPrice * (1 - activeDiscount.value);
                                if (priceDiscount <= 0) {
                                    priceDiscount = discountedPrice;
                                }
                                discountedPrice = priceDiscount;
                                product.discountedPrice = discountedPrice;
                                product.applieddiscounts.push(activeDiscount);
                                break;
                            case discount_1.DiscountType.bogo:
                                break;
                            default:
                                break;
                        }
                        this.eventTracer.isSuccessWithResponseAndMessage(product);
                        return [2 /*return*/, product];
                    case 2:
                        ex_6 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_6);
                        throw ex_6;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        ///
        /// <summary>Applies Discount to Product</summary>
        this.applyDiscount = function (productId, discountId) { return __awaiter(_this, void 0, Promise, function () {
            var discount, product, productDiscountSet, updatedDiscountIds, ex_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        this.eventTracer.say("Apply Discount");
                        return [4 /*yield*/, this.discountService.getDiscountById(discountId)];
                    case 1:
                        discount = _a.sent();
                        if (!discount)
                            throw new not_found_exception_1["default"]("Discount with id " + discountId + " not found");
                        return [4 /*yield*/, this.productRepository.getByIdAsync(new mongoose_1.Types.ObjectId(productId))];
                    case 2:
                        product = _a.sent();
                        if (!product)
                            throw new not_found_exception_1["default"]("Product with id " + productId + " not found");
                        productDiscountSet = new Set((product.discounts).map(function (discount) { return discount.toString(); }));
                        productDiscountSet.add(discountId.toString());
                        updatedDiscountIds = __spreadArrays(productDiscountSet).map(function (productIdString) { return new mongoose_1.Types.ObjectId(productIdString); });
                        product.discounts = updatedDiscountIds;
                        return [4 /*yield*/, this.productRepository.updateByIdAsync(productId, { discounts: product.discounts })];
                    case 3:
                        _a.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(product);
                        return [4 /*yield*/, this.productRepository.getByIdAsync(new mongoose_1.Types.ObjectId(productId))];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5:
                        ex_7 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_7);
                        throw ex_7;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.createOrUseExistingDiscountForProduct = function (productDiscount) { return __awaiter(_this, void 0, void 0, function () {
            var discount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (productDiscount.discountId) {
                            return [2 /*return*/, productDiscount];
                        }
                        return [4 /*yield*/, this.discountService.createDiscount(productDiscount.discount)];
                    case 1:
                        discount = _a.sent();
                        return [4 /*yield*/, this.applyDiscount(new mongoose_1.Types.ObjectId(productDiscount.productId), discount._id)];
                    case 2:
                        _a.sent();
                        productDiscount.discountId = discount._id;
                        return [2 /*return*/, productDiscount];
                }
            });
        }); };
        this.applyDiscountsToProducts = function (productDiscounts) { return __awaiter(_this, void 0, Promise, function () {
            var discountsForProducts, settleProductsWithNewDiscounts, productsAndDiscountsPromise, _i, productsAndDiscountsPromise_1, result, ex_8;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        discountsForProducts = [];
                        settleProductsWithNewDiscounts = productDiscounts.map(function (productAndDiscount) { return _this.createOrUseExistingDiscountForProduct(productAndDiscount); });
                        return [4 /*yield*/, Promise.allSettled(settleProductsWithNewDiscounts)];
                    case 1:
                        productsAndDiscountsPromise = _a.sent();
                        for (_i = 0, productsAndDiscountsPromise_1 = productsAndDiscountsPromise; _i < productsAndDiscountsPromise_1.length; _i++) {
                            result = productsAndDiscountsPromise_1[_i];
                            if (result.status === "fulfilled" && result.value) {
                                discountsForProducts.push(result.value);
                            }
                        }
                        return [2 /*return*/, discountsForProducts];
                    case 2:
                        ex_8 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_8);
                        throw ex_8;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getProductsWithDiscountedPriceByIds = function (ids) { return __awaiter(_this, void 0, Promise, function () {
            var productsWithDiscount, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log({ ids: ids });
                        return [4 /*yield*/, this.productRepository.contains({ _id: ids }, { discounts: true })];
                    case 1:
                        productsWithDiscount = _a.sent();
                        return [4 /*yield*/, this.convertProductsToProductResponse(productsWithDiscount, { includeDiscountAndDiscountPrice: true })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        }); };
        this.getProductsWithSpecialOffer = function (specialOfferId) { return __awaiter(_this, void 0, Promise, function () {
            var discounts, discountIds, productsWithDiscounts, _i, discountIds_1, discountId, specialOrderProducts, specialOrderProductsResponse, ex_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        this.eventTracer.say("Getting products with special offer for " + specialOfferId);
                        specialOfferId = new mongoose_1.Types.ObjectId(specialOfferId);
                        return [4 /*yield*/, this.discountService.getDiscountsInSpecialOffer(specialOfferId)];
                    case 1:
                        discounts = _a.sent();
                        discountIds = discounts.map(function (discount) { return discount._id; });
                        this.eventTracer.say("Discounts found count : " + discounts.length);
                        productsWithDiscounts = [];
                        _i = 0, discountIds_1 = discountIds;
                        _a.label = 2;
                    case 2:
                        if (!(_i < discountIds_1.length)) return [3 /*break*/, 6];
                        discountId = discountIds_1[_i];
                        return [4 /*yield*/, this.productRepository.getAsync({ discounts: discountId })];
                    case 3:
                        specialOrderProducts = _a.sent();
                        return [4 /*yield*/, this.convertProductsToProductResponse(specialOrderProducts, { includeDiscountAndDiscountPrice: true })];
                    case 4:
                        specialOrderProductsResponse = _a.sent();
                        productsWithDiscounts = __spreadArrays(productsWithDiscounts, specialOrderProductsResponse);
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6:
                        this.eventTracer.isSuccessWithResponseAndMessage(productsWithDiscounts);
                        return [2 /*return*/, productsWithDiscounts];
                    case 7:
                        ex_9 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_9);
                        throw ex_9;
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.addProductsWithDiscountToSpecialOffer = function (specialOfferId, productDiscounts) { return __awaiter(_this, void 0, Promise, function () {
            var specialOffer, appliedDiscountsAndProducts, addedDiscountsToSpecialOffers, ex_10;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        this.eventTracer.say("AddProductsWithDiscountToSpecialOffer: Getting special offer " + specialOfferId);
                        this.eventTracer.request = productDiscounts;
                        return [4 /*yield*/, this.discountService.getSpecialOffer(specialOfferId)];
                    case 1:
                        specialOffer = _b.sent();
                        if (!specialOffer) {
                            throw new not_found_exception_1["default"]("Special offer with id " + specialOfferId + " not found");
                        }
                        return [4 /*yield*/, this.applyDiscountsToProducts(productDiscounts)];
                    case 2:
                        appliedDiscountsAndProducts = _b.sent();
                        this.eventTracer.say("Applied Discounts length: " + ((_a = appliedDiscountsAndProducts === null || appliedDiscountsAndProducts === void 0 ? void 0 : appliedDiscountsAndProducts.length) !== null && _a !== void 0 ? _a : 0));
                        return [4 /*yield*/, this.discountService.addDiscountsToSpecialOffer(specialOfferId, appliedDiscountsAndProducts.map(function (discountAndProduct) { return new mongoose_1.Types.ObjectId(discountAndProduct.discountId); }))];
                    case 3:
                        addedDiscountsToSpecialOffers = _b.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(addedDiscountsToSpecialOffers);
                        return [2 /*return*/, addedDiscountsToSpecialOffers];
                    case 4:
                        ex_10 = _b.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_10);
                        throw ex_10;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.bestSellers = function (query) { return __awaiter(_this, void 0, Promise, function () {
            var useQuery, response, items;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        useQuery = {};
                        if (query.categoryId) {
                            useQuery.categories = new mongoose_1.Types.ObjectId(query.categoryId);
                        }
                        return [4 /*yield*/, this.productRepository.toPagedAsync(useQuery, query.page, query.pageSize, { "inventory.qtySold": -1 })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, Promise.allSettled(response.items.map(function (item) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.convertProductToProductResponseAsync(item, { includeDiscountAndDiscountPrice: true })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }))];
                    case 2:
                        items = (_a.sent())
                            .map(function (item) {
                            if (item.status === "fulfilled" && item.value) {
                                return item.value;
                            }
                        })
                            .filter(function (item) { return item; });
                        return [2 /*return*/, new pagination_result_1.PaginationResponse(__assign(__assign({}, response), { items: items }))];
                }
            });
        }); };
        this.setProductsAvailabilityPriceAndCurrencyForCartItems = function (items) { return __awaiter(_this, void 0, Promise, function () {
            var allProducts, allProductsWithOnlyIds, _i, items_1, item, product, productsResponse, productResponseDict, returnResponse, _a, items_2, item, product, productId, productResponse;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        allProducts = [];
                        allProductsWithOnlyIds = [];
                        for (_i = 0, items_1 = items; _i < items_1.length; _i++) {
                            item = items_1[_i];
                            product = item.product;
                            if (product instanceof mongoose_1.Types.ObjectId || typeof (product) === "string") {
                                product = new mongoose_1.Types.ObjectId(product);
                                allProductsWithOnlyIds.push(product);
                            }
                            else {
                                allProducts.push(product);
                            }
                        }
                        return [4 /*yield*/, this.getProductsWithDiscountedPriceByIds(__spreadArrays(allProductsWithOnlyIds, allProducts.map(function (prod) { return prod._id; })))];
                    case 1:
                        productsResponse = _d.sent();
                        productResponseDict = {};
                        productsResponse.forEach(function (productResponse) {
                            productResponseDict[productResponse._id.toString()] = productResponse;
                        });
                        returnResponse = [];
                        for (_a = 0, items_2 = items; _a < items_2.length; _a++) {
                            item = items_2[_a];
                            product = item.product;
                            productId = product instanceof mongoose_1.Types.ObjectId || typeof (product) === "string" ? product.toString() : (_c = (_b = product._id) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : '';
                            productResponse = productResponseDict[productId];
                            if (item instanceof cart_request_1.CreateCartItemRequest) {
                                item = new cart_1.CartItem(__assign(__assign({}, item), { product: new mongoose_1.Types.ObjectId(item.product), status: item_status_1.ItemStatus.UNAVAILABLE, priceAtOrder: 0, currency: "" }));
                            }
                            if (!productResponse) {
                                item.status = item_status_1.ItemStatus.UNAVAILABLE;
                                continue;
                            }
                            item.priceAtOrder = productResponse.discountedPrice;
                            item.currency = productResponse.currency;
                            if (item.qty > productResponse.inventory.qtyAvailable) {
                                item.status = item_status_1.ItemStatus.QTY_NOT_AVAILABLE;
                            }
                            else {
                                item.status = item_status_1.ItemStatus.AVAILABLE;
                            }
                            returnResponse.push(item);
                        }
                        return [2 /*return*/, returnResponse];
                }
            });
        }); };
    }
    ProductService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(event_tracer_1.IIEventTracer)),
        __param(1, tsyringe_1.inject(category_service_1.IICategoryService)),
        __param(2, tsyringe_1.inject(product_repository_1.IIProductRepository)),
        __param(3, tsyringe_1.inject(discount_service_1.IIDiscountService)),
        __param(4, tsyringe_1.inject(file_service_1.IIFileService))
    ], ProductService);
    return ProductService;
}());
exports["default"] = ProductService;
