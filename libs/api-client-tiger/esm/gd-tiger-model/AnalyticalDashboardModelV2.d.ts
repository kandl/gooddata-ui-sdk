import { ObjRef, IFilterContext as IFilterContextModel, IDashboardLayout, IDashboardDateFilterConfig } from "@gooddata/sdk-model";
/**
 * @public
 */
export interface IAnalyticalDashboard {
    version: "2";
    layout?: IDashboardLayout;
    filterContextRef?: ObjRef;
    dateFilterConfig?: IDashboardDateFilterConfig;
    plugins?: IDashboardPluginLink[];
}
/**
 * @public
 */
export interface IFilterContext {
    version: "2";
    filters: IFilterContextModel["filters"];
}
/**
 * @public
 */
export interface IDashboardPlugin {
    version: "2";
    url: string;
}
/**
 * @public
 */
export interface IDashboardPluginLink {
    version: "2";
    plugin: ObjRef;
    parameters?: string;
}
/**
 * @public
 */
export declare function isAnalyticalDashboard(dashboard: unknown): dashboard is IAnalyticalDashboard;
/**
 * @public
 */
export declare function isFilterContext(filterContext: unknown): filterContext is IFilterContext;
/**
 * @public
 */
export declare function isDashboardPlugin(plugin: unknown): plugin is IDashboardPlugin;
/**
 * @public
 */
export declare function isDashboardPluginLink(pluginLink: unknown): pluginLink is IDashboardPluginLink;
//# sourceMappingURL=AnalyticalDashboardModelV2.d.ts.map