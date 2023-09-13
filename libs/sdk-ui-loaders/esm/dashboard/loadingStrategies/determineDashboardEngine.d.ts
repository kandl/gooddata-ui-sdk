import { IDashboardEngine, IDashboardPluginContract_V1 } from "@gooddata/sdk-ui-dashboard";
/**
 * Determine dashboard engine to use with the plugins.
 * Currently it selects the engine with the greatest version.
 *
 * @internal
 */
export declare function determineDashboardEngine(engines: IDashboardEngine[]): IDashboardEngine;
/**
 * Checks if the dashboard plugin match version of the dashboard engine.
 *
 * @internal
 */
export declare function isPluginCompatibleWithDashboardEngine(engine: IDashboardEngine, plugin: IDashboardPluginContract_V1): boolean;
