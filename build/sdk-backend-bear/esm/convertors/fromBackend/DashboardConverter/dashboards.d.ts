import { IDashboardDateFilterConfig as IBearIDashboardDateFilterConfig, IWrappedAnalyticalDashboard, IVisualizationClassWrapped, IObjectLink } from "@gooddata/api-model-bear";
import { IUser, IDashboard, IListedDashboard, ListedDashboardAvailability, IDashboardDateFilterConfig } from "@gooddata/sdk-model";
import { BearDashboardDependency } from "./types.js";
export declare const convertListedDashboard: (dashboardLink: IObjectLink, availability: ListedDashboardAvailability, userMap?: Map<string, IUser>) => IListedDashboard;
/**
 * @internal
 */
export declare const convertDashboardDateFilterConfig: (dateFilterConfig: IBearIDashboardDateFilterConfig) => IDashboardDateFilterConfig;
export declare const convertDashboard: (dashboard: IWrappedAnalyticalDashboard, dependencies: BearDashboardDependency[], visualizationClasses?: IVisualizationClassWrapped[], exportFilterContextUri?: string, userMap?: Map<string, IUser>) => IDashboard;
//# sourceMappingURL=dashboards.d.ts.map