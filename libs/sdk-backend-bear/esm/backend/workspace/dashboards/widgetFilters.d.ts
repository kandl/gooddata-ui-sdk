import { IFilter, ObjRef, IWidget } from "@gooddata/sdk-model";
type ObjRefsToUris = (refs: ObjRef[]) => Promise<string[]>;
/**
 * Performs widget filter resolution:
 * - removes all attribute filters hit by ignoreDashboardFilters
 * - removes all date filters for date dimension different than dateDataSet
 * - picks the last date filter for the dateDataSet dimension
 *   - if it is all time, removes all date filters
 *   - otherwise returns the last date filter specified
 *
 * @param widget - widget to resolve filters for
 * @param filters - filters to try
 * @param objRefsToUris - function providing conversion of any ObjRef to URI
 * @internal
 */
export declare function resolveWidgetFilters(filters: IFilter[], ignoreDashboardFilters: IWidget["ignoreDashboardFilters"], dateDataSet: IWidget["dateDataSet"], objRefsToUris: ObjRefsToUris): Promise<IFilter[]>;
export {};
//# sourceMappingURL=widgetFilters.d.ts.map