"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveProductsToCatalogueRequest = exports.AddProductsToCatalogueRequest = exports.QueryCatalogue = exports.UpdateCatalogueRequest = exports.CreateCatalogueRequest = void 0;
class CreateCatalogueRequest {
    isFeatured;
    title;
    desc;
    mainImg;
}
exports.CreateCatalogueRequest = CreateCatalogueRequest;
class UpdateCatalogueRequest {
    isFeatured;
    title;
    desc;
    mainImg;
}
exports.UpdateCatalogueRequest = UpdateCatalogueRequest;
class QueryCatalogue {
    isFeatured;
    title;
    desc;
    mainImg;
}
exports.QueryCatalogue = QueryCatalogue;
class AddProductsToCatalogueRequest {
    catalogueId;
    productIds;
}
exports.AddProductsToCatalogueRequest = AddProductsToCatalogueRequest;
class RemoveProductsToCatalogueRequest {
    catalogueId;
    productIds;
}
exports.RemoveProductsToCatalogueRequest = RemoveProductsToCatalogueRequest;
//# sourceMappingURL=catalogue_requests.js.map