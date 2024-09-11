"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const not_found_exception_1 = __importDefault(require("../../../application/common/exceptions/not_found_exception"));
const product_service_1 = require("../../../application/contract/services/shop/product_service");
const review_1 = __importDefault(require("../../../domain/shop/entity/review"));
const mongoose_1 = require("mongoose");
const tsyringe_1 = require("tsyringe");
const event_tracer_1 = require("../../../application/contract/observability/event_tracer");
const createreview_validation_1 = __importDefault(require("./validations/createreview_validation"));
const object_utility_1 = __importDefault(require("../../../application/common/utilities/object_utility"));
const validation_exception_1 = __importDefault(require("../../../application/common/exceptions/validation_exception"));
const review_repository_1 = require("../../../application/contract/data_access/shop/review_repository");
const date_utility_1 = __importDefault(require("../../../application/common/utilities/date_utility"));
const product_service_producer_1 = require("../../contract/events/shop/producer/product_service_producer");
const review_created_event_dto_1 = __importDefault(require("../../../domain/model/events/review_created_event_dto"));
const user_service_1 = require("../../../application/contract/services/authentication/user_service");
const email_service_1 = require("../../../application/contract/services/notification/email_service");
const send_email_dto_1 = require("../../../domain/model/notification/dto/send_email_dto");
const user_1 = __importDefault(require("../../../domain/authentication/entity/user"));
let ProductLogic = class ProductLogic {
    productService;
    eventTracer;
    reviewRepository;
    productServiceProducer;
    userService;
    mailService;
    constructor(productService, eventTracer, reviewRepository, productServiceProducer, userService, mailService) {
        this.productService = productService;
        this.eventTracer = eventTracer;
        this.reviewRepository = reviewRepository;
        this.productServiceProducer = productServiceProducer;
        this.userService = userService;
        this.mailService = mailService;
    }
    convertCreateProductReviewToReview = (createProductReview) => {
        return new review_1.default({
            ...createProductReview,
            productId: new mongoose_1.Types.ObjectId(createProductReview.productId),
            reviewedAt: date_utility_1.default.getUTCNow(),
        });
    };
    createReviewForProduct = async (createProductReview) => {
        try {
            this.eventTracer.request = createProductReview;
            this.eventTracer.say(`Create Review Product For Product`);
            let validationErrors = (new createreview_validation_1.default()).validate(createProductReview);
            if (object_utility_1.default.objectSize(validationErrors)) {
                throw new validation_exception_1.default(`Invalid Create Review`, validationErrors);
            }
            // get the product associated with the review
            let product = await this.productService.getProduct(new mongoose_1.Types.ObjectId(createProductReview.productId));
            if (!product) {
                throw new not_found_exception_1.default(`Product with id ${createProductReview.productId} not found`);
            }
            this.eventTracer.say(`Product found`);
            let review = this.convertCreateProductReviewToReview(createProductReview);
            this.eventTracer.say(`review converted`);
            console.log({ review });
            let savedReview = await this.reviewRepository.addAsync(review);
            this.eventTracer.say(`review saved`);
            this.eventTracer.say('Sending to Review Created Queue');
            const reviewCreatedEventDTO = new review_created_event_dto_1.default({
                reviewId: savedReview._id,
                createdAt: date_utility_1.default.getUTCNow()
            });
            let publishReviewCreatedEvent = await this.productServiceProducer.publishReviewCreated(reviewCreatedEventDTO);
            if (publishReviewCreatedEvent) {
                this.eventTracer.say(`Successfully published Review Created Event with id ${publishReviewCreatedEvent}`);
            }
            else {
                this.eventTracer.say(`WARNING: Failed to publish Review Created Event with id`);
            }
            this.eventTracer.isSuccessWithResponseAndMessage(savedReview);
            return savedReview;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            throw ex;
        }
    };
    handleReviewCreatedEvent = async (reviewCreatedEventDTO) => {
        try {
            this.eventTracer.say("HANDLING REVIEW CREATED");
            this.eventTracer.request = reviewCreatedEventDTO;
            // Notify all appropriate admins a review has been created
            // get review
            let review = await this.reviewRepository.getByIdAsync(new mongoose_1.Types.ObjectId(reviewCreatedEventDTO.reviewId), { reviewedBy: true });
            let product = await this.productService.getProduct(review.productId);
            let reviewedBy = null;
            if (review.reviewedBy instanceof user_1.default) {
                reviewedBy = review.reviewedBy;
            }
            let userPermissionsToNotify = ["createproduct", "updateproduct"];
            let userRolesToNotify = ["productmanager"];
            let usersToNotify = await this.userService.getUsersWithRolesOrPermissions({ permissions: userPermissionsToNotify, roles: userRolesToNotify });
            if (usersToNotify.length) {
                let emailRecipients = usersToNotify.map(user => ({
                    to_email: user.email,
                    to_name: user.name ?? ""
                }));
                let recipitentsMail = new send_email_dto_1.SendEmailToMultipleRecipientsDTO({
                    recipients: emailRecipients,
                    from_name: "Notification Department",
                    title: `New review with topic ${review.title} for product ${product.name}`,
                    message: `User with name: ${reviewedBy?.name ?? "unknown"} rated  ${product.name} ${review.rating} stars`,
                    messageType: send_email_dto_1.EmailMessageType.HTML
                });
                let mailResponses = await this.mailService.sendToMultipleRecipients(recipitentsMail);
                this.eventTracer.isSuccessWithResponseAndMessage(mailResponses);
                return true;
            }
            this.eventTracer.isSuccessWithMessage("No user found to notify");
            return true;
        }
        catch (ex) {
            this.eventTracer.isExceptionWithMessage(`${ex}`);
            return false;
        }
    };
};
ProductLogic = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(product_service_1.IIProductService)),
    __param(1, (0, tsyringe_1.inject)(event_tracer_1.IIEventTracer)),
    __param(2, (0, tsyringe_1.inject)(review_repository_1.IIReviewRepository)),
    __param(3, (0, tsyringe_1.inject)(product_service_producer_1.IIProductServiceProducer)),
    __param(4, (0, tsyringe_1.inject)(user_service_1.IIUserService)),
    __param(5, (0, tsyringe_1.inject)(email_service_1.IIMailService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], ProductLogic);
exports.default = ProductLogic;
//# sourceMappingURL=product_logic.js.map