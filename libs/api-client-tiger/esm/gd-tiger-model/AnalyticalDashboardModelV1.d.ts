import { ObjRef, IFilterContext as IFilterContextModel, IDashboardLayout, IDashboardDateFilterConfig } from "@gooddata/sdk-model";
/**
 * @deprecated use {@link AnalyticalDashboardModelV2.IAnalyticalDashboard} instead
 * @public
 */
export interface IAnalyticalDashboard {
    analyticalDashboard: {
        layout?: IDashboardLayout;
        filterContextRef?: ObjRef;
        dateFilterConfig?: IDashboardDateFilterConfig;
    };
}
/**
 * @deprecated use {@link AnalyticalDashboardModelV2.IFilterContext} instead
 * @public
 */
export interface IFilterContext {
    filterContext: {
        filters: IFilterContextModel["filters"];
    };
}
/**
 * @public
 */
export declare function isAnalyticalDashboard(dashboard: unknown): dashboard is IAnalyticalDashboard;
/**
 * @public
 */
export declare function isFilterContext(filterContext: unknown): filterContext is IFilterContext;
//# sourceMappingURL=AnalyticalDashboardModelV1.d.ts.map