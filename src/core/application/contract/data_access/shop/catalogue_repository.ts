import Catalogue from "core/domain/shop/entity/catalogue";
import { BaseRepository } from "../../../../infrastructure/persistence/data_access/common/base_repository";
import { Types } from "mongoose";
import CatalogueResponse from "../../../../domain/shop/dto/responses/catalogue_response";

export default interface ICatalogueRepository extends BaseRepository<Catalogue, Types.ObjectId> {
    updateIsFeaturedStatus (catelogueIds: Types.ObjectId[], feature: boolean): Promise<Catalogue[]>;
}

export const IICatalogueRepository = "ICatalogueRepository";