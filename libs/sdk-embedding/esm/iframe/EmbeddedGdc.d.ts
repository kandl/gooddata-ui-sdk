import { ILocalIdentifierQualifier as IBearLocalIdentifierQualifier, ObjQualifier as BearObjQualifier, isObjIdentifierQualifier as isBearObjIdentifierQualifier, isObjectUriQualifier as isBearObjectUriQualifier } from "@gooddata/api-model-bear";
/**
 * Attribute filters were exposed in the 'old' format that did not match backend and used the
 * textFilter boolean indicator. We have to honor this for the public API.
 * @public
 */
export interface IPositiveAttributeFilter {
    positiveAttributeFilter: {
        displayForm: ObjQualifier;
        in: string[];
        textFilter?: boolean;
        selectionMode?: AttributeFilterItemSelectionMode;
    };
}
/**
 * @public
 */
export interface INegativeAttributeFilter {
    negativeAttributeFilter: {
        displayForm: ObjQualifier;
        notIn: string[];
        textFilter?: boolean;
        selectionMode?: "multi";
    };
}
/**
 * @public
 */
export interface IAbsoluteDateFilter {
    absoluteDateFilter: {
        dataSet?: ObjQualifier;
        from: string;
        to: string;
    };
}
/**
 * @public
 */
export interface IRelativeDateFilter {
    relativeDateFilter: {
        dataSet?: ObjQualifier;
        granularity: string;
        from: number;
        to: number;
    };
}
/**
 * @public
 */
export type RankingFilterOperator = "TOP" | "BOTTOM";
/**
 * @public
 */
export interface IRankingFilter {
    rankingFilter: {
        measure: ILocalIdentifierQualifier;
        attributes?: ILocalIdentifierQualifier[];
        operator: RankingFilterOperator;
        value: number;
    };
}
/**
 * @public
 */
export type AttributeFilterItem = IPositiveAttributeFilter | INegativeAttributeFilter;
/**
 * @public
 */
export type DateFilterItem = IAbsoluteDateFilter | IRelativeDateFilter;
/**
 * @public
 */
export type FilterItem = DateFilterItem | AttributeFilterItem | IRankingFilter;
/**
 * @public
 */
export type ILocalIdentifierQualifier = IBearLocalIdentifierQualifier;
/**
 * @public
 */
export type ObjQualifier = BearObjQualifier;
/**
 * @public
 */
export type AttributeFilterItemSelectionMode = "single" | "multi";
/**
 * @public
 */
export interface IRemoveDateFilterItem {
    dataSet: ObjQualifier;
}
/**
 * @public
 */
export interface IRemoveAttributeFilterItem {
    displayForm: ObjQualifier;
}
/**
 * @public
 */
export interface IRemoveRankingFilterItem {
    removeRankingFilter: unknown;
}
/**
 * @public
 */
export type RemoveFilterItem = IRemoveDateFilterItem | IRemoveAttributeFilterItem | IRemoveRankingFilterItem;
/**
 * @public
 */
export declare function isDateFilter(filter: unknown): filter is DateFilterItem;
/**
 * @public
 */
export declare function isRelativeDateFilter(filter: unknown): filter is IRelativeDateFilter;
/**
 * @public
 */
export declare function isAbsoluteDateFilter(filter: unknown): filter is IAbsoluteDateFilter;
/**
 * @public
 */
export declare function isAttributeFilter(filter: unknown): filter is AttributeFilterItem;
/**
 * @public
 */
export declare function isPositiveAttributeFilter(filter: unknown): filter is IPositiveAttributeFilter;
/**
 * @public
 */
export declare function isNegativeAttributeFilter(filter: unknown): filter is INegativeAttributeFilter;
/**
 * @public
 */
export declare const isObjIdentifierQualifier: typeof isBearObjIdentifierQualifier;
/**
 * @public
 */
export declare const isObjectUriQualifier: typeof isBearObjectUriQualifier;
/**
 * @public
 */
export declare function isRankingFilter(filter: unknown): filter is IRankingFilter;
/**
 * The filter context content that is used to exchange the filter context
 * between AD, KD embedded page and parent application
 * @public
 */
export interface IFilterContextContent {
    filters: FilterItem[];
}
/**
 * The remove filter context content that is used to exchange the filter context
 * between AD, KD embedded page and parent application
 * @public
 */
export interface IRemoveFilterContextContent {
    filters: RemoveFilterItem[];
}
/**
 * @public
 */
export declare function isRemoveDateFilter(filter: unknown): filter is IRemoveDateFilterItem;
/**
 * @public
 */
export declare function isRemoveAttributeFilter(filter: unknown): filter is IRemoveAttributeFilterItem;
/**
 * @public
 */
export declare function isRemoveRankingFilter(filter: unknown): filter is IRemoveRankingFilterItem;
/**
 * @public
 */
export type AllTimeType = "allTime";
/**
 * @public
 */
export type AbsoluteType = "absolute";
/**
 * @public
 */
export type RelativeType = "relative";
/**
 * @public
 */
export type DateString = string;
/**
 * @public
 */
export type DateFilterGranularity = "GDC.time.minute" | "GDC.time.hour" | "GDC.time.date" | "GDC.time.week_us" | "GDC.time.month" | "GDC.time.quarter" | "GDC.time.year";
/**
 * @public
 */
export interface IDashboardAllTimeDateFilter {
    dateFilter: {
        type: AllTimeType;
    };
}
/**
 * @public
 */
export interface IDashboardAbsoluteDateFilter {
    dateFilter: {
        type: AbsoluteType;
        granularity: DateFilterGranularity;
        from: DateString;
        to: DateString;
    };
}
/**
 * @public
 */
export interface IDashboardRelativeDateFilter {
    dateFilter: {
        type: RelativeType;
        granularity: DateFilterGranularity;
        from: number;
        to: number;
    };
}
/**
 * @public
 */
export type DashboardDateFilter = IDashboardAllTimeDateFilter | IDashboardAbsoluteDateFilter | IDashboardRelativeDateFilter;
/**
 * @public
 */
export declare function isDashboardDateFilter(filter: unknown): filter is DashboardDateFilter;
/**
 * @public
 */
export declare function isDashboardAllTimeDateFilter(filter: unknown): filter is IDashboardAllTimeDateFilter;
/**
 * @public
 */
export declare function isDashboardAbsoluteDateFilter(filter: unknown): filter is IDashboardAbsoluteDateFilter;
/**
 * @public
 */
export declare function isDashboardRelativeDateFilter(filter: unknown): filter is IDashboardRelativeDateFilter;
/**
 * @public
 */
export interface IDashboardAttributeFilter {
    attributeFilter: {
        displayForm: string;
        negativeSelection: boolean;
        attributeElements: string[];
    };
}
/**
 * @public
 */
export declare function isDashboardAttributeFilter(filter: unknown): filter is IDashboardAttributeFilter;
/**
 * @public
 */
export interface IResolvedAttributeFilterValues {
    [elementRef: string]: string | undefined;
}
/**
 * @public
 */
export interface IResolvedDateFilterValue {
    from: string;
    to: string;
}
/**
 * @public
 */
export type ResolvedDateFilterValues = IResolvedDateFilterValue[];
/**
 * Resolved values for all resolvable filters
 * @public
 */
export interface IResolvedFilterValues {
    dateFilters: ResolvedDateFilterValues;
    attributeFilters: {
        [filterStringRef: string]: IResolvedAttributeFilterValues;
    };
}
//# sourceMappingURL=EmbeddedGdc.d.ts.map