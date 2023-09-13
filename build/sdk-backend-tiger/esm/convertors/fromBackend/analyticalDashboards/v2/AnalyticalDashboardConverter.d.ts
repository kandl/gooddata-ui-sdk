import { AnalyticalDashboardModelV2, JsonApiAnalyticalDashboardOutDocument, JsonApiDashboardPluginOutDocument, JsonApiDashboardPluginOutWithLinks, JsonApiFilterContextOutDocument, JsonApiAnalyticalDashboardOutIncludes } from "@gooddata/api-client-tiger";
import { FilterContextItem, IFilterContext, IDashboard, IDashboardPlugin } from "@gooddata/sdk-model";
export declare function convertDashboard(analyticalDashboard: JsonApiAnalyticalDashboardOutDocument, filterContext?: IFilterContext): IDashboard;
export declare function convertFilterContextFromBackend(filterContext: JsonApiFilterContextOutDocument): IFilterContext;
export declare function convertFilterContextFilters(content: AnalyticalDashboardModelV2.IFilterContext): FilterContextItem[];
export declare function convertDashboardPlugin(plugin: JsonApiDashboardPluginOutDocument): IDashboardPlugin;
export declare function convertDashboardPluginWithLinks(plugin: JsonApiDashboardPluginOutWithLinks, included?: JsonApiAnalyticalDashboardOutIncludes[]): IDashboardPlugin;
//# sourceMappingURL=AnalyticalDashboardConverter.d.ts.map