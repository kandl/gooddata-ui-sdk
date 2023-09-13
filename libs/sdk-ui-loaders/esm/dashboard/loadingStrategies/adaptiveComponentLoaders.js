import isEmpty from "lodash/isEmpty.js";
import { noopDashboardBeforeLoad, noopDashboardPluginLoader, staticDashboardEngineLoader, } from "./staticComponentLoaders.js";
import { dynamicDashboardBeforeLoad, dynamicDashboardEngineLoader, dynamicDashboardPluginLoader, } from "./dynamicComponentLoaders.js";
/**
 * Adaptive loader will check if there are any plugins linked with the dashboard. If so, it will use the
 * dynamic loading to get the engine. Otherwise will use the static loading.
 *
 * @param moduleFederationIntegration - configuration related to the Module Federation
 * @param dashboard - loaded dashboard
 * @internal
 */
export const adaptiveDashboardEngineLoaderFactory = (moduleFederationIntegration) => (dashboard) => {
    if (dashboard && !isEmpty(dashboard.references.plugins)) {
        return dynamicDashboardEngineLoader(dashboard, moduleFederationIntegration);
    }
    return staticDashboardEngineLoader(dashboard);
};
/**
 * Adaptive loader will check if there are any plugins linked with the dashboard. If so, it will use
 * the dynamic loading to get the plugins. Otherwise will not load any plugins.
 *
 * @param moduleFederationIntegration - configuration related to the Module Federation
 * @param ctx - context in which the dashboard operates
 * @param dashboard - loaded dashboard
 * @internal
 */
export const adaptiveDashboardPluginLoaderFactory = (moduleFederationIntegration) => (ctx, dashboard, options) => {
    if (dashboard && !isEmpty(dashboard.references.plugins)) {
        options === null || options === void 0 ? void 0 : options.beforePluginsLoaded({ externalPluginsCount: dashboard.references.plugins.length });
        return dynamicDashboardPluginLoader(ctx, dashboard, moduleFederationIntegration);
    }
    return noopDashboardPluginLoader(ctx, dashboard);
};
/**
 * Adaptive loader will check if there are any plugins linked with the dashboard. If so, it will use
 * the dynamic loading to get the common data. Otherwise will not do anything.
 *
 * @param _moduleFederationIntegration - configuration related to the Module Federation
 * @param ctx - context in which the dashboard operates
 * @param dashboard - loaded dashboard
 * @internal
 */
export const adaptiveDashboardBeforeLoadFactory = (_moduleFederationIntegration) => (ctx, dashboard) => {
    if (dashboard && !isEmpty(dashboard.references.plugins)) {
        return dynamicDashboardBeforeLoad(ctx, dashboard);
    }
    return noopDashboardBeforeLoad(ctx, dashboard);
};
//# sourceMappingURL=adaptiveComponentLoaders.js.map