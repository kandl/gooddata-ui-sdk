import { IDateFilterConfig, IDashboardDateFilterConfig } from "@gooddata/sdk-model";
/**
 * Merges the date filter config with the dashboard-level overrides. The overrides may hide some presets
 * or add custom presets. This function addresses all that and returns the final merged Date Filter Config.
 *
 * @param config - date filter config
 * @param dashboardOverrides - dashboard-level overrides.
 */
export declare function mergeDateFilterConfigs(config: IDateFilterConfig, dashboardOverrides: IDashboardDateFilterConfig): IDateFilterConfig;
