import { JsonApiAnalyticalDashboardOutDocument, JsonApiAnalyticalDashboardOutList, JsonApiAnalyticalDashboardOutWithLinks, JsonApiFilterContextOutDocument, JsonApiDashboardPluginOutDocument, JsonApiDashboardPluginOutWithLinks, JsonApiAnalyticalDashboardOutIncludes } from "@gooddata/api-client-tiger";
import { IFilterContext, IDashboard, IListedDashboard, IDashboardPlugin } from "@gooddata/sdk-model";
export declare const convertAnalyticalDashboard: (analyticalDashboard: JsonApiAnalyticalDashboardOutWithLinks, included?: JsonApiAnalyticalDashboardOutIncludes[]) => IListedDashboard;
export declare const convertAnalyticalDashboardToListItems: (analyticalDashboards: JsonApiAnalyticalDashboardOutList) => IListedDashboard[];
export declare function convertDashboard(analyticalDashboard: JsonApiAnalyticalDashboardOutDocument, filterContext?: IFilterContext): IDashboard;
export declare function convertFilterContextFromBackend(filterContext: JsonApiFilterContextOutDocument): IFilterContext;
export declare function convertDashboardPluginFromBackend(plugin: JsonApiDashboardPluginOutDocument): IDashboardPlugin;
export declare function convertDashboardPluginWithLinksFromBackend(plugin: JsonApiDashboardPluginOutWithLinks, included?: JsonApiAnalyticalDashboardOutIncludes[]): IDashboardPlugin;
export declare function getFilterContextFromIncluded(included: JsonApiAnalyticalDashboardOutDocument["included"]): IFilterContext | undefined;
//# sourceMappingURL=AnalyticalDashboardConverter.d.ts.map