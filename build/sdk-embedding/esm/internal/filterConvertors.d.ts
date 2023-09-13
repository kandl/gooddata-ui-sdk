import { ObjQualifier } from "@gooddata/api-model-bear";
import { DateFilterItem, FilterItem, RankingFilterOperator } from "../iframe/EmbeddedGdc.js";
export declare const EXTERNAL_DATE_FILTER_FORMAT = "YYYY-MM-DD";
export interface IExternalFiltersObject {
    attributeFilters: ITransformedAttributeFilterItem[];
    dateFilters: ITransformedDateFilterItem[];
    rankingFilter?: ITransformedRankingFilter;
}
export interface ITransformedRankingFilter {
    measureLocalIdentifier: string;
    attributeLocalIdentifiers?: string[];
    operator: RankingFilterOperator;
    value: number;
}
export interface ITransformedDateFilterItem {
    granularity?: string;
    from: string | number;
    to: string | number;
    datasetUri?: string;
    datasetIdentifier?: string;
}
export interface ITransformedAttributeFilterItem {
    negativeSelection: boolean;
    attributeElements: string[];
    dfIdentifier?: string;
    dfUri?: string;
}
export declare const ALL_TIME_GRANULARITY = "ALL_TIME_GRANULARITY";
export type ITransformedFilterItem = ITransformedDateFilterItem | ITransformedAttributeFilterItem;
export declare function isValidDateFilterFormat(filterItem: DateFilterItem, shouldValidateDataSet?: boolean, isTimeSupported?: boolean): boolean;
export declare function isValidFilterItemFormat(filterItem: unknown, shouldValidateDataSet?: boolean, isTimeSupported?: boolean): boolean;
export declare function isValidRemoveFilterItemFormat(filterItem: unknown): boolean;
export declare function isValidRemoveFiltersFormat(filters: unknown[]): boolean;
export declare function isValidFiltersFormat(filters: unknown[], shouldValidateDataSet?: boolean, isTimeSupported?: boolean): boolean;
export declare function getObjectUriIdentifier(obj: ObjQualifier | undefined): {
    uri?: string;
    identifier?: string;
};
export declare function transformFilterContext(filters: FilterItem[]): IExternalFiltersObject;
export declare function isTransformedDateFilterItem(filterItem: ITransformedFilterItem): filterItem is ITransformedDateFilterItem;
export declare function isTransformedAttributeFilterItem(filterItem: ITransformedFilterItem): filterItem is ITransformedAttributeFilterItem;
export declare function isAllTimeDateFilterItem(filterItem: ITransformedFilterItem): boolean;
export declare function isAllValueAttributeFilterItem(filterItem: ITransformedFilterItem): boolean;
//# sourceMappingURL=filterConvertors.d.ts.map