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
exports.__esModule = true;
var not_found_exception_1 = require("../../../application/common/exceptions/not_found_exception");
var product_service_1 = require("../../../application/contract/services/shop/product_service");
var review_1 = require("../../../domain/shop/entity/review");
var mongoose_1 = require("mongoose");
var tsyringe_1 = require("tsyringe");
var event_tracer_1 = require("../../../application/contract/observability/event_tracer");
var createreview_validation_1 = require("./validations/createreview_validation");
var object_utility_1 = require("../../../application/common/utilities/object_utility");
var validation_exception_1 = require("../../../application/common/exceptions/validation_exception");
var review_repository_1 = require("../../../application/contract/data_access/shop/review_repository");
var date_utility_1 = require("../../../application/common/utilities/date_utility");
var product_service_producer_1 = require("../../contract/events/shop/producer/product_service_producer");
var review_created_event_dto_1 = require("../../../domain/model/events/review_created_event_dto");
var user_service_1 = require("../../../application/contract/services/authentication/user_service");
var email_service_1 = require("../../../application/contract/services/notification/email_service");
var send_email_dto_1 = require("../../../domain/model/notification/dto/send_email_dto");
var user_1 = require("../../../domain/authentication/entity/user");
var ProductLogic = /** @class */ (function () {
    function ProductLogic(productService, eventTracer, reviewRepository, productServiceProducer, userService, mailService) {
        var _this = this;
        this.productService = productService;
        this.eventTracer = eventTracer;
        this.reviewRepository = reviewRepository;
        this.productServiceProducer = productServiceProducer;
        this.userService = userService;
        this.mailService = mailService;
        this.convertCreateProductReviewToReview = function (createProductReview) {
            return new review_1["default"](__assign(__assign({}, createProductReview), { productId: new mongoose_1.Types.ObjectId(createProductReview.productId), reviewedAt: date_utility_1["default"].getUTCNow() }));
        };
        this.createReviewForProduct = function (createProductReview) { return __awaiter(_this, void 0, Promise, function () {
            var validationErrors, product, review, savedReview, reviewCreatedEventDTO, publishReviewCreatedEvent, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.eventTracer.request = createProductReview;
                        this.eventTracer.say("Create Review Product For Product");
                        validationErrors = (new createreview_validation_1["default"]()).validate(createProductReview);
                        if (object_utility_1["default"].objectSize(validationErrors)) {
                            throw new validation_exception_1["default"]("Invalid Create Review", validationErrors);
                        }
                        return [4 /*yield*/, this.productService.getProduct(new mongoose_1.Types.ObjectId(createProductReview.productId))];
                    case 1:
                        product = _a.sent();
                        if (!product) {
                            throw new not_found_exception_1["default"]("Product with id " + createProductReview.productId + " not found");
                        }
                        this.eventTracer.say("Product found");
                        review = this.convertCreateProductReviewToReview(createProductReview);
                        this.eventTracer.say("review converted");
                        console.log({ review: review });
                        return [4 /*yield*/, this.reviewRepository.addAsync(review)];
                    case 2:
                        savedReview = _a.sent();
                        this.eventTracer.say("review saved");
                        this.eventTracer.say('Sending to Review Created Queue');
                        reviewCreatedEventDTO = new review_created_event_dto_1["default"]({
                            reviewId: savedReview._id,
                            createdAt: date_utility_1["default"].getUTCNow()
                        });
                        return [4 /*yield*/, this.productServiceProducer.publishReviewCreated(reviewCreatedEventDTO)];
                    case 3:
                        publishReviewCreatedEvent = _a.sent();
                        if (publishReviewCreatedEvent) {
                            this.eventTracer.say("Successfully published Review Created Event with id " + publishReviewCreatedEvent);
                        }
                        else {
                            this.eventTracer.say("WARNING: Failed to publish Review Created Event with id");
                        }
                        this.eventTracer.isSuccessWithResponseAndMessage(savedReview);
                        return [2 /*return*/, savedReview];
                    case 4:
                        ex_1 = _a.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_1);
                        throw ex_1;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.handleReviewCreatedEvent = function (reviewCreatedEventDTO) { return __awaiter(_this, void 0, Promise, function () {
            var review, product, reviewedBy, userPermissionsToNotify, userRolesToNotify, usersToNotify, emailRecipients, recipitentsMail, mailResponses, ex_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        this.eventTracer.say("HANDLING REVIEW CREATED");
                        this.eventTracer.request = reviewCreatedEventDTO;
                        return [4 /*yield*/, this.reviewRepository.getByIdAsync(new mongoose_1.Types.ObjectId(reviewCreatedEventDTO.reviewId), { reviewedBy: true })];
                    case 1:
                        review = _b.sent();
                        return [4 /*yield*/, this.productService.getProduct(review.productId)];
                    case 2:
                        product = _b.sent();
                        reviewedBy = null;
                        if (review.reviewedBy instanceof user_1["default"]) {
                            reviewedBy = review.reviewedBy;
                        }
                        userPermissionsToNotify = ["createproduct", "updateproduct"];
                        userRolesToNotify = ["productmanager"];
                        return [4 /*yield*/, this.userService.getUsersWithRolesOrPermissions({ permissions: userPermissionsToNotify, roles: userRolesToNotify })];
                    case 3:
                        usersToNotify = _b.sent();
                        if (!usersToNotify.length) return [3 /*break*/, 5];
                        emailRecipients = usersToNotify.map(function (user) {
                            var _a;
                            return ({
                                to_email: user.email,
                                to_name: (_a = user.name) !== null && _a !== void 0 ? _a : ""
                            });
                        });
                        recipitentsMail = new send_email_dto_1.SendEmailToMultipleRecipientsDTO({
                            recipients: emailRecipients,
                            from_name: "Notification Department",
                            title: "New review with topic " + review.title + " for product " + product.name,
                            message: "User with name: " + ((_a = reviewedBy === null || reviewedBy === void 0 ? void 0 : reviewedBy.name) !== null && _a !== void 0 ? _a : "unknown") + " rated  " + product.name + " " + review.rating + " stars",
                            messageType: send_email_dto_1.EmailMessageType.HTML
                        });
                        return [4 /*yield*/, this.mailService.sendToMultipleRecipients(recipitentsMail)];
                    case 4:
                        mailResponses = _b.sent();
                        this.eventTracer.isSuccessWithResponseAndMessage(mailResponses);
                        return [2 /*return*/, true];
                    case 5:
                        this.eventTracer.isSuccessWithMessage("No user found to notify");
                        return [2 /*return*/, true];
                    case 6:
                        ex_2 = _b.sent();
                        this.eventTracer.isExceptionWithMessage("" + ex_2);
                        return [2 /*return*/, false];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
    }
    ProductLogic = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject(product_service_1.IIProductService)),
        __param(1, tsyringe_1.inject(event_tracer_1.IIEventTracer)),
        __param(2, tsyringe_1.inject(review_repository_1.IIReviewRepository)),
        __param(3, tsyringe_1.inject(product_service_producer_1.IIProductServiceProducer)),
        __param(4, tsyringe_1.inject(user_service_1.IIUserService)),
        __param(5, tsyringe_1.inject(email_service_1.IIMailService))
    ], ProductLogic);
    return ProductLogic;
}());
exports["default"] = ProductLogic;
