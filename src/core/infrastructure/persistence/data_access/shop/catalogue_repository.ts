

import IProductRepository from "../../../../application/contract/data_access/shop/product_repository";
import { injectable } from "tsyringe";
import { Types } from "mongoose";
import { BaseRepository } from "../common/base_repository";
import { catalogueModel } from "../../entity_configuration/shop/catalogue_config";
import Catalogue from "../../../../domain/shop/entity/catalogue";
import ICatalogueRepository from "core/application/contract/data_access/shop/catalogue_repository";
import CatalogueResponse from "core/domain/shop/dto/responses/catalogue_response";

export enum SortOrder {
    desc = "desc",
    asc = "asc"
}
@injectable()
export default class CatalogueRepository extends  BaseRepository<Catalogue, Types.ObjectId> implements ICatalogueRepository{
    public constructor(){
        const _model = catalogueModel;
        super(_model);
    }
    updateIsFeaturedStatus = async (catelogueIds: Types.ObjectId[], feature: boolean): Promise<Catalogue[]>  => {
        await this.updateManyAsync({_id: {$in: catelogueIds}}, {isFeatured: feature})
        return await this.contains({_id: catelogueIds})
    }
}