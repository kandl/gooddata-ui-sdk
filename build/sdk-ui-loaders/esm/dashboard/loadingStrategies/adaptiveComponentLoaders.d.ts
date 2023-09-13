import { IDashboardWithReferences } from "@gooddata/sdk-backend-spi";
import { DashboardContext, IDashboardEngine } from "@gooddata/sdk-ui-dashboard";
import { IDashboardPluginsLoaderOptions, LoadedPlugin, ModuleFederationIntegration } from "../types.js";
/**
 * Adaptive loader will check if there are any plugins linked with the dashboard. If so, it will use the
 * dynamic loading to get the engine. Otherwise will use the static loading.
 *
 * @param moduleFederationIntegration - configuration related to the Module Federation
 * @param dashboard - loaded dashboard
 * @internal
 */
export declare const adaptiveDashboardEngineLoaderFactory: (moduleFederationIntegration: ModuleFederationIntegration) => (dashboard: IDashboardWithReferences | undefined) => Promise<IDashboardEngine>;
/**
 * Adaptive loader will check if there are any plugins linked with the dashboard. If so, it will use
 * the dynamic loading to get the plugins. Otherwise will not load any plugins.
 *
 * @param moduleFederationIntegration - configuration related to the Module Federation
 * @param ctx - context in which the dashboard operates
 * @param dashboard - loaded dashboard
 * @internal
 */
export declare const adaptiveDashboardPluginLoaderFactory: (moduleFederationIntegration: ModuleFederationIntegration) => (ctx: DashboardContext, dashboard: IDashboardWithReferences | undefined, options?: IDashboardPluginsLoaderOptions) => Promise<LoadedPlugin[]>;
/**
 * Adaptive loader will check if there are any plugins linked with the dashboard. If so, it will use
 * the dynamic loading to get the common data. Otherwise will not do anything.
 *
 * @param _moduleFederationIntegration - configuration related to the Module Federation
 * @param ctx - context in which the dashboard operates
 * @param dashboard - loaded dashboard
 * @internal
 */
export declare const adaptiveDashboardBeforeLoadFactory: (_moduleFederationIntegration: ModuleFederationIntegration) => (ctx: DashboardContext, dashboard: IDashboardWithReferences | undefined) => Promise<void>;
