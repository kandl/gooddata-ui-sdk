import { DateFilterGranularity } from "../extendedDateFilters/GdcExtendedDateFilters.js";
import { IObjectMeta } from "../meta/GdcMetadata.js";
import { DateString, Uri, Timestamp, NumberAsString } from "../base/GdcTypes.js";
/**
 * @public
 */
export type RelativeType = "relative";
/**
 * @public
 */
export type AbsoluteType = "absolute";
/**
 * @public
 */
export type DateFilterType = RelativeType | AbsoluteType;
/**
 * @public
 */
export type AttributeFilterSelectionMode = "single" | "multi";
/**
 * @public
 */
export interface IFilterContext {
    meta: IObjectMeta;
    content: {
        filters: FilterContextItem[];
    };
}
/**
 * @public
 */
export interface IWrappedFilterContext {
    filterContext: IFilterContext;
}
/**
 * Temporary filter context stored during exports
 * @public
 */
export interface ITempFilterContext {
    uri: Uri;
    created: Timestamp;
    filters: FilterContextItem[];
}
/**
 * @public
 */
export interface IWrappedTempFilterContext {
    tempFilterContext: ITempFilterContext;
}
/**
 * @public
 */
export interface IFilterContextAttributeFilter {
    attributeFilter: {
        displayForm: string;
        negativeSelection: boolean;
        attributeElements: string[];
        localIdentifier?: string;
        title?: string;
        filterElementsBy?: Array<{
            filterLocalIdentifier: string;
            over: {
                attributes: Array<string>;
            };
        }>;
        selectionMode?: AttributeFilterSelectionMode;
    };
}
/**
 * @public
 */
export interface IFilterContextDateFilter {
    dateFilter: {
        type: DateFilterType;
        granularity: DateFilterGranularity;
        from?: DateString | NumberAsString;
        to?: DateString | NumberAsString;
        dataSet?: string;
        attribute?: string;
    };
}
/**
 * @public
 */
export type FilterContextItem = IFilterContextAttributeFilter | IFilterContextDateFilter;
/**
 * @public
 */
export declare function isFilterContextDateFilter(filter: FilterContextItem): filter is IFilterContextDateFilter;
/**
 * @public
 */
export declare function isFilterContextAttributeFilter(filter: FilterContextItem): filter is IFilterContextAttributeFilter;
/**
 * @public
 */
export declare function isFilterContext(obj: unknown): obj is IFilterContext;
/**
 * @public
 */
export declare function isWrappedFilterContext(obj: unknown): obj is IWrappedFilterContext;
/**
 * @public
 */
export declare function isTempFilterContext(obj: unknown): obj is ITempFilterContext;
/**
 * @public
 */
export declare function isWrappedTempFilterContext(obj: unknown): obj is IWrappedTempFilterContext;
//# sourceMappingURL=GdcFilterContext.d.ts.map