import { CompatibilityFilter, ExtendedFilter, FilterItem, IMeasureValueFilter as IBearMeasureValueFilter, IRankingFilter as IBearRankingFilter } from "@gooddata/api-model-bear";
import { IAbsoluteDateFilter, IFilter, IMeasureFilter, IMeasureValueFilter, IRelativeDateFilter, IRankingFilter } from "@gooddata/sdk-model";
export declare function convertAbsoluteDateFilter(filter: IAbsoluteDateFilter): FilterItem | null;
export declare function convertRelativeDateFilter(filter: IRelativeDateFilter): FilterItem | null;
export declare function convertMeasureValueFilter(filter: IMeasureValueFilter): IBearMeasureValueFilter | null;
export declare function convertRankingFilter(filter: IRankingFilter): IBearRankingFilter | null;
export declare function convertFilter(filter: IFilter): ExtendedFilter | null;
export declare function convertMeasureFilter(filter: IMeasureFilter): FilterItem | null;
export declare function convertFilters(filters: IFilter[]): CompatibilityFilter[];
//# sourceMappingURL=FilterConverter.d.ts.map