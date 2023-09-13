import { DateFilterGranularity, DateString } from "../dateFilterConfig/index.js";
import { IAttributeElements } from "../execution/filter/index.js";
import { ObjRef } from "../objRef/index.js";
import { IDashboardObjectIdentity } from "./common.js";
/**
 * Date filter type - relative
 * @beta
 */
export type DateFilterRelativeType = "relative";
/**
 * Date filter type - absolute
 * @beta
 */
export type DateFilterAbsoluteType = "absolute";
/**
 * Date filter type - relative or absolute
 * @beta
 */
export type DateFilterType = DateFilterRelativeType | DateFilterAbsoluteType;
/**
 * Parent filter of an attribute filter of the filter context
 * @beta
 */
export interface IDashboardAttributeFilterParent {
    /**
     * Local identifier of the parent filter
     */
    filterLocalIdentifier: string;
    /**
     * Specification of the connection point(s) between the parent and child filter in the data model
     */
    over: {
        attributes: ObjRef[];
    };
}
/**
 * Attribute filter selection mode value
 * @beta
 */
export type DashboardAttributeFilterSelectionMode = "single" | "multi";
/**
 * Attribute filter of the filter context
 * @public
 */
export interface IDashboardAttributeFilter {
    attributeFilter: {
        /**
         * Display form object ref
         */
        displayForm: ObjRef;
        /**
         * Is negative filter?
         */
        negativeSelection: boolean;
        /**
         * Selected attribute elements
         * @beta
         */
        attributeElements: IAttributeElements;
        /**
         * Identifier of the filter which is valid in the scope of the filter context
         */
        localIdentifier?: string;
        /**
         * Parent filters that are limiting elements available in this filter
         * @beta
         */
        filterElementsBy?: IDashboardAttributeFilterParent[];
        /**
         * Custom title of the attribute filter. If specified has priority over the default attribute filter title.
         */
        title?: string;
        /**
         * Selection mode which defines how many elements can be in attributeElements.
         * Default value is 'multi' if property is missing.
         * @beta
         */
        selectionMode?: DashboardAttributeFilterSelectionMode;
    };
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardAttributeFilter}.
 * @alpha
 */
export declare function isDashboardAttributeFilter(obj: unknown): obj is IDashboardAttributeFilter;
/**
 * Returns true when given filter has selection mode set to single
 * @alpha
 */
export declare function isSingleSelectionFilter(filter: IDashboardAttributeFilter): boolean;
/**
 * Returns true when given filter has negative selection
 * @alpha
 */
export declare function isNegativeAttributeFilter(filter: IDashboardAttributeFilter): boolean;
/**
 * Returns count of selected elements
 * @alpha
 */
export declare function getSelectedElementsCount(filter: IDashboardAttributeFilter): number;
/**
 * Date filter of the filter context
 * @public
 */
export interface IDashboardDateFilter {
    dateFilter: {
        /**
         * Date filter type - relative or absolute
         * @beta
         */
        type: DateFilterType;
        /**
         * Date filter granularity
         * @beta
         */
        granularity: DateFilterGranularity;
        /**
         * Filter - from
         * @beta
         */
        from?: DateString | number;
        /**
         * Filter - to
         * @beta
         */
        to?: DateString | number;
        /**
         * DateDataSet object ref
         */
        dataSet?: ObjRef;
        /**
         * Date attribute object ref
         */
        attribute?: ObjRef;
    };
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardDateFilter}.
 * @alpha
 */
export declare function isDashboardDateFilter(obj: unknown): obj is IDashboardDateFilter;
/**
 * Returns true when given date filter has type set to relative.
 * @alpha
 */
export declare function isRelativeDashboardDateFilter(dateFilter: IDashboardDateFilter): boolean;
/**
 * Returns true when given date filter has type set to absolute.
 * @alpha
 */
export declare function isAbsoluteDashboardDateFilter(dateFilter: IDashboardDateFilter): boolean;
/**
 * Creates a new relative dashboard date filter.
 *
 * @param granularity - granularity of the filters (month, year, etc.)
 * @param from - start of the interval – negative numbers mean the past, zero means today, positive numbers mean the future
 * @param to - end of the interval – negative numbers mean the past, zero means today, positive numbers mean the future
 * @alpha
 */
export declare function newRelativeDashboardDateFilter(granularity: DateFilterGranularity, from: number, to: number): IDashboardDateFilter;
/**
 * Creates a new absolute dashboard date filter.
 *
 * @param from - start of the interval in ISO-8601 calendar date format
 * @param to - end of the interval in ISO-8601 calendar date format
 * @alpha
 */
export declare function newAbsoluteDashboardDateFilter(from: DateString, to: DateString): IDashboardDateFilter;
/**
 * Creates a new all time date filter. This filter is used to indicate that there should be no filtering on the dates.
 *
 * @alpha
 */
export declare function newAllTimeDashboardDateFilter(): IDashboardDateFilter;
/**
 * Type-guard testing whether the provided object is an All time dashboard date filter.
 * @alpha
 */
export declare function isAllTimeDashboardDateFilter(obj: unknown): boolean;
/**
 * Supported filter context items
 * @alpha
 */
export type FilterContextItem = IDashboardAttributeFilter | IDashboardDateFilter;
/**
 * Common filter context properties
 *
 * @alpha
 */
export interface IFilterContextBase {
    /**
     * Filter context title
     */
    readonly title: string;
    /**
     * Filter context description
     */
    readonly description: string;
    /**
     * Attribute or date filters
     */
    readonly filters: FilterContextItem[];
}
/**
 * Filter context definition represents modifier or created filter context
 *
 * @alpha
 */
export interface IFilterContextDefinition extends IFilterContextBase, Partial<IDashboardObjectIdentity> {
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IFilterContextDefinition}.
 * @alpha
 */
export declare function isFilterContextDefinition(obj: unknown): obj is IFilterContextDefinition;
/**
 * Filter context consists of configured attribute and date filters
 * (which could be applied to the dashboard, widget alert, or scheduled email)
 *
 * @alpha
 */
export interface IFilterContext extends IFilterContextBase, IDashboardObjectIdentity {
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IFilterContext}.
 * @alpha
 */
export declare function isFilterContext(obj: unknown): obj is IFilterContext;
/**
 * Temporary filter context serves to override original dashboard filter context during the dashboard export
 *
 * @alpha
 */
export interface ITempFilterContext {
    /**
     * Filter context created time
     * YYYY-MM-DD HH:mm:ss
     */
    readonly created: string;
    /**
     * Attribute or date filters
     */
    readonly filters: FilterContextItem[];
    /**
     * Temp filter context ref
     */
    readonly ref: ObjRef;
    /**
     * Temp filter context uri
     */
    readonly uri: string;
}
/**
 * Type-guard testing whether the provided object is an instance of {@link ITempFilterContext}.
 * @alpha
 */
export declare function isTempFilterContext(obj: unknown): obj is ITempFilterContext;
/**
 * Reference to a particular dashboard date filter
 * This is commonly used to define filters to ignore
 * for the particular dashboard widget
 *
 * @alpha
 */
export interface IDashboardDateFilterReference {
    /**
     * Dashboard filter reference type
     */
    type: "dateFilterReference";
    /**
     * DataSet reference of the target date filter
     */
    dataSet: ObjRef;
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardDateFilterReference}.
 * @alpha
 */
export declare function isDashboardDateFilterReference(obj: unknown): obj is IDashboardDateFilterReference;
/**
 * Reference to a particular dashboard attribute filter
 * This is commonly used to define filters to ignore
 * for the particular dashboard widget
 *
 * @alpha
 */
export interface IDashboardAttributeFilterReference {
    /**
     * Dashboard filter reference type
     */
    type: "attributeFilterReference";
    /**
     * Attribute display form reference of the target attribute filter
     */
    displayForm: ObjRef;
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IDashboardAttributeFilterReference}.
 * @alpha
 */
export declare function isDashboardAttributeFilterReference(obj: unknown): obj is IDashboardAttributeFilterReference;
/**
 * Reference to a particular dashboard filter
 * This is commonly used to define filters to ignore
 * for the particular dashboard widget
 *
 * @alpha
 */
export type IDashboardFilterReference = IDashboardDateFilterReference | IDashboardAttributeFilterReference;
/**
 * Gets reference to object being used for filtering. For attribute filters, this will be reference to the display
 * form. For date filters this will be reference to the data set.
 *
 * @alpha
 */
export declare function dashboardFilterReferenceObjRef(ref: IDashboardFilterReference): ObjRef;
//# sourceMappingURL=filterContext.d.ts.map