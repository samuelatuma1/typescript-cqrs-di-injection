import { Types } from "mongoose";
import BaseEntity from "../../common/entity/base_entity";
import { FilterType } from "../enum/filter_type";

type FilterInit = {
  name?: string;
  categoryId?: Types.ObjectId | null;
  filterType?: FilterType;
  values?: string[] | number[];
};
export class Filter extends BaseEntity<Types.ObjectId> {
    name: string;
    categoryId: Types.ObjectId;
    filterType: FilterType | string;
    values: string[] | number[];

    // Constructor overloads for different initialization methods
  constructor(name: string, categoryId?: Types.ObjectId | null, filterType?: FilterType, values?: string[] | number[]);
  constructor(init: FilterInit);

  // Implementation of the constructor
  constructor(
    nameOrInit: string | FilterInit = '',
    categoryId: Types.ObjectId | null = null,
    filterType: FilterType = FilterType.string,
    values: string[] | number[] = []
  ) {
    const id = new Types.ObjectId();
    super(id);

    if (typeof nameOrInit === 'string') {
      this.name = nameOrInit;
      this.categoryId = categoryId;
      this.filterType = filterType;
      this.values = values;
    } else {
      this.name = nameOrInit.name ?? '';
      this.categoryId = nameOrInit.categoryId ?? null;
      this.filterType = nameOrInit.filterType ?? FilterType.string;
      this.values = nameOrInit.values ?? [];
    }
  }
}