// (C) 2021-2023 GoodData Corporation
import { newDashboardEngine, } from "@gooddata/sdk-ui-dashboard";
import { ResolvedClientWorkspaceProvider, resolveLCMWorkspaceIdentifiers, } from "@gooddata/sdk-ui";
import { idRef, isDashboard } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import isEmpty from "lodash/isEmpty.js";
import React from "react";
import { noopDashboardPluginLoader, staticDashboardEngineLoader, } from "./loadingStrategies/staticComponentLoaders.js";
import { adaptiveDashboardBeforeLoadFactory, adaptiveDashboardEngineLoaderFactory, adaptiveDashboardPluginLoaderFactory, } from "./loadingStrategies/adaptiveComponentLoaders.js";
import { validatePluginsBeforeLoading } from "./beforeLoadPluginValidation.js";
import { isPluginCompatibleWithDashboardEngine } from "./loadingStrategies/determineDashboardEngine.js";
const StaticLoadStrategies = {
    engineLoader: staticDashboardEngineLoader,
    pluginLoader: noopDashboardPluginLoader,
};
const AdaptiveLoadStrategies = (moduleFederationIntegration) => {
    return {
        engineLoader: adaptiveDashboardEngineLoaderFactory(moduleFederationIntegration),
        pluginLoader: adaptiveDashboardPluginLoaderFactory(moduleFederationIntegration),
        beforeLoad: adaptiveDashboardBeforeLoadFactory(moduleFederationIntegration),
    };
};
/**
 * Default implementation of the {@link IDashboardLoader} interface.
 *
 * @remarks
 * This class implements all the necessary functionality related to either static or dynamic dashboard loading.
 *
 * Note: you typically do not have to use this class directly and instead use the `useDashboardLoader`
 * hook or the `DashboardStub` component.
 *
 * @public
 */
export class DashboardLoader {
    constructor(config) {
        this.baseProps = {};
        this.embeddedPlugins = [];
        this.clientWorkspace = undefined;
        this.onBackend = (backend) => {
            this.baseProps.backend = backend;
            return this;
        };
        this.fromClientWorkspace = (clientWorkspace) => {
            this.clientWorkspace = clientWorkspace;
            this.baseProps.workspace = undefined;
            return this;
        };
        this.fromWorkspace = (workspace) => {
            this.baseProps.workspace = workspace;
            this.clientWorkspace = undefined;
            return this;
        };
        this.forDashboard = (dashboardRef) => {
            this.baseProps.dashboard = dashboardRef;
            return this;
        };
        this.withFilterContext = (filterContextRef) => {
            this.baseProps.filterContextRef = filterContextRef;
            return this;
        };
        this.withEmbeddedPlugins = (...plugins) => {
            this.embeddedPlugins = plugins !== null && plugins !== void 0 ? plugins : [];
            return this;
        };
        this.withBaseProps = (props) => {
            this.baseProps = Object.assign({}, props);
            return this;
        };
        this.resolveWorkspace = async (backend) => {
            if (!this.clientWorkspace) {
                return [this.baseProps.workspace, undefined];
            }
            const resolvedClientWorkspace = await resolveLCMWorkspaceIdentifiers(backend, this.clientWorkspace);
            invariant(!isEmpty(resolvedClientWorkspace), "DashboardLoader was not able to resolve LCM client workspace to actual workspace.");
            return [resolvedClientWorkspace.workspace, resolvedClientWorkspace];
        };
        this.loadParts = async (ctx, dashboardWithPlugins, config = this.config, beforeExternalPluginLoaded) => {
            const { engineLoader, pluginLoader, beforeLoad } = config;
            // eslint-disable-next-line no-console
            console.debug("Loading engine and plugins...");
            let engine = newDashboardEngine();
            let plugins = [];
            try {
                if (beforeLoad) {
                    await beforeLoad(ctx, dashboardWithPlugins);
                }
                const [resolvedEngine, resolvedPlugins] = await Promise.all([
                    engineLoader(dashboardWithPlugins),
                    pluginLoader(ctx, dashboardWithPlugins, { beforePluginsLoaded: beforeExternalPluginLoaded }),
                ]);
                if (resolvedEngine && resolvedPlugins) {
                    engine = resolvedEngine;
                    plugins = resolvedPlugins;
                }
            }
            catch (err) {
                console.error(err);
                console.error("Dashboard plugins load failed. Loader is falling back to the statically linked dashboard without any external plugins.");
            }
            // eslint-disable-next-line no-console
            console.debug("Initializing the plugins...");
            const additionalPlugins = await initializeEmbeddedPlugins(ctx, this.embeddedPlugins);
            const loadedPlugins = await initializeLoadedPlugins(ctx, plugins);
            // If some of the plugins do not match the engine version, do not use any at all.
            const areLoadedPluginsCompatibleWithDashboardEngine = loadedPlugins.every((p) => isPluginCompatibleWithDashboardEngine(engine, p));
            if (!areLoadedPluginsCompatibleWithDashboardEngine) {
                console.error("Some external dashboard plugin is incompatible with the loaded dashboard engine. " +
                    "None of the external plugins will be initialized.");
            }
            const allPlugins = areLoadedPluginsCompatibleWithDashboardEngine
                ? [...loadedPlugins, ...additionalPlugins]
                : additionalPlugins;
            return [engine, allPlugins];
        };
        this.load = async (options) => {
            const { backend, dashboard, filterContextRef } = this.baseProps;
            const dashboardRef = typeof dashboard === "string"
                ? idRef(dashboard)
                : isDashboard(dashboard)
                    ? dashboard.ref
                    : dashboard;
            invariant(backend, "DashboardLoader is not configured with an instance of Analytical Backend.");
            const [workspace, clientWorkspace] = await this.resolveWorkspace(backend);
            invariant(workspace, "DashboardLoader is not configured with workspace to use and loader.");
            // eslint-disable-next-line no-console
            console.debug("Loading the dashboard...");
            const { config } = this.baseProps;
            let dashboardConfig = config;
            const dashboardWithPlugins = dashboardRef &&
                (await backend
                    .workspace(workspace)
                    .dashboards()
                    .getDashboardWithReferences(dashboardRef, filterContextRef, { loadUserData: true, exportId: config === null || config === void 0 ? void 0 : config.exportId }, ["dashboardPlugin"]));
            const ctx = {
                backend,
                config,
                workspace,
                dashboardRef,
                filterContextRef,
                dataProductId: clientWorkspace === null || clientWorkspace === void 0 ? void 0 : clientWorkspace.dataProduct,
                clientId: clientWorkspace === null || clientWorkspace === void 0 ? void 0 : clientWorkspace.client,
            };
            // eslint-disable-next-line no-console
            console.debug("Validating the plugins...");
            const pluginsAreValid = !dashboardWithPlugins || (await validatePluginsBeforeLoading(ctx, dashboardWithPlugins));
            if (!pluginsAreValid) {
                console.error("Dashboard is configured with plugins that contain invalid URLs or " +
                    "are not located on allowed hosts. Loader is falling back to the " +
                    "statically linked dashboard without any external plugins.");
            }
            let externalPluginLoaded = false;
            const beforeExternalPluginLoaded = (params) => {
                if (params.externalPluginsCount > 0) {
                    externalPluginLoaded = true;
                }
            };
            const [engine, plugins] = await this.loadParts(ctx, dashboardWithPlugins, !pluginsAreValid ? StaticLoadStrategies : this.config, beforeExternalPluginLoaded);
            if ((options === null || options === void 0 ? void 0 : options.allowUnfinishedFeatures) === "staticOnly" && externalPluginLoaded) {
                dashboardConfig = Object.assign(Object.assign({}, config), { allowUnfinishedFeatures: false });
            }
            const extensionProps = engine.initializePlugins(Object.assign(Object.assign({}, ctx), { config: dashboardConfig }), plugins);
            const props = Object.assign(Object.assign(Object.assign(Object.assign({}, this.baseProps), { config: dashboardConfig }), extensionProps), { workspace, dashboard: isDashboard(dashboard) ? dashboard : dashboardWithPlugins === null || dashboardWithPlugins === void 0 ? void 0 : dashboardWithPlugins.dashboard, 
                // do not pass persisted dashboard if we did not pass a dashboard object to the dashboard prop
                // it would be redundant as they are equal
                persistedDashboard: isDashboard(dashboard) ? dashboardWithPlugins === null || dashboardWithPlugins === void 0 ? void 0 : dashboardWithPlugins.dashboard : undefined });
            /*
             * if user specifies workspace using client workspace identifiers (data product & client), then the loader
             * must ensure that the actual dashboard component is rendered in the ClientWorkspace context. The dashboard
             * component is aware of this context and has some special logic in place for this occasion.
             */
            const DashboardComponent = !clientWorkspace
                ? engine.getDashboardComponent()
                : clientWorkspaceDashboardFactory(engine.getDashboardComponent(), clientWorkspace);
            return {
                ctx,
                engine,
                plugins,
                DashboardComponent,
                props,
            };
        };
        this.config = config;
    }
    /**
     * Create loader that will never do any dynamic loading and linking.
     *
     * @remarks
     * The loader will expect that the dashboard engine is statically linked in the context.
     * Any plugins that require dynamic loading from remote locations will be ignored.
     * Only locally embedded plugins will be used.
     */
    static staticOnly() {
        return new DashboardLoader(StaticLoadStrategies);
    }
    /**
     * Create loader that may dynamically load dashboard engine and plugins in case a Dashboard to load
     * is using them.
     *
     * @remarks
     * Otherwise it will fall back to the dashboard engine statically linked to the context
     * and will only use locally embedded plugins.
     *
     * @param options - options for the adaptive load
     */
    static adaptive(options) {
        return new DashboardLoader(AdaptiveLoadStrategies(options.moduleFederationIntegration));
    }
}
function initializeEmbeddedPlugins(ctx, embeddedPlugins) {
    const plugins = embeddedPlugins.map((embedded) => ({
        plugin: embedded.factory(),
        parameters: embedded.parameters,
    }));
    return initializeLoadedPlugins(ctx, plugins);
}
async function initializeLoadedPlugins(ctx, plugins) {
    const validPlugins = [];
    for (const loadedPlugin of plugins) {
        const { plugin, parameters } = loadedPlugin;
        try {
            if (plugin.onPluginLoaded) {
                // eslint-disable-next-line no-console
                console.debug(`Calling onPluginLoaded on ${plugin.displayName}...`);
                const loadPromise = plugin.onPluginLoaded(ctx, parameters);
                await loadPromise;
            }
            validPlugins.push(plugin);
        }
        catch (e) {
            console.error(`The onPluginLoaded call for ${plugin.displayName} failed: ${e === null || e === void 0 ? void 0 : e.message}. Ignoring the plugin.`);
        }
    }
    return validPlugins;
}
function clientWorkspaceDashboardFactory(Component, clientWorkspace) {
    function ClientWorkspaceDashboardWrapper(props) {
        return (React.createElement(ResolvedClientWorkspaceProvider, Object.assign({}, clientWorkspace),
            React.createElement(Component, Object.assign({}, props))));
    }
    return ClientWorkspaceDashboardWrapper;
}
//# sourceMappingURL=dashboardLoader.js.map