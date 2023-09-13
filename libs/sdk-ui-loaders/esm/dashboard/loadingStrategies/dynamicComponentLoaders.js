import { areObjRefsEqual, objRefToString } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import isEmpty from "lodash/isEmpty.js";
import { determineDashboardEngine } from "./determineDashboardEngine.js";
import { DynamicScriptLoadSdkError } from "@gooddata/sdk-ui";
/**
 * @internal
 */
export async function dynamicDashboardEngineLoader(dashboard, moduleFederationIntegration) {
    const { plugins } = dashboard.references;
    // if this bombs, this loader was called with no plugins (which means noop version should have been used)
    invariant(!isEmpty(plugins));
    const loadedEngines = await Promise.all(plugins.map(async (plugin) => {
        const loadedEngineModule = await loadEngine(moduleNameFromUrl(plugin.url), moduleFederationIntegration)();
        const engineFactory = loadedEngineModule.default;
        return engineFactory();
    }));
    return determineDashboardEngine(loadedEngines);
}
/**
 * @internal
 */
export async function dynamicDashboardPluginLoader(_ctx, dashboard, moduleFederationIntegration) {
    const { plugins: referencedPlugins } = dashboard.references;
    const pluginLinks = dashboard.dashboard.plugins;
    if (!referencedPlugins.length || !(pluginLinks === null || pluginLinks === void 0 ? void 0 : pluginLinks.length)) {
        return [];
    }
    return Promise.all(
    // order of the pluginLinks is important: the plugins MUST be loaded in that order
    pluginLinks.map(async (pluginLink) => {
        const pluginMeta = referencedPlugins.find((plugin) => areObjRefsEqual(pluginLink.plugin, plugin.ref));
        invariant(pluginMeta, `Plugin in plugin links not found in referenced plugins. Plugin ref: ${objRefToString(pluginLink.plugin)}`);
        const loadedModule = await loadPlugin(moduleNameFromUrl(pluginMeta.url), moduleFederationIntegration)();
        const pluginFactory = loadedModule.default;
        let plugin = pluginFactory();
        // If the dashboard plugin minEngineVersion or maxEngineVersion equals "bundled",
        // we need to load the bundled engine, to know the desired engine version.
        if (plugin.maxEngineVersion === "bundled" || plugin.minEngineVersion === "bundled") {
            const loadedEngineModule = await loadEngine(moduleNameFromUrl(pluginMeta.url), moduleFederationIntegration)();
            const engineFactory = loadedEngineModule.default;
            const engine = engineFactory();
            // We can't use spread operator here, because we need to preserve
            // the dashboard plugin prototype methods (eg. onPluginLoaded / register / onPluginUnload)
            plugin = Object.assign(plugin, {
                minEngineVersion: plugin.minEngineVersion === "bundled" ? engine.version : plugin.minEngineVersion,
                maxEngineVersion: plugin.maxEngineVersion === "bundled" ? engine.version : plugin.maxEngineVersion,
            });
        }
        return {
            plugin,
            parameters: pluginLink === null || pluginLink === void 0 ? void 0 : pluginLink.parameters,
        };
    }));
}
/**
 * @internal
 */
export async function dynamicDashboardBeforeLoad(_ctx, dashboard) {
    const { plugins } = dashboard.references;
    if (!plugins.length) {
        return;
    }
    const urls = plugins.map((plugin) => plugin.url);
    const tasks = urls.map(addScriptTag);
    // add the script tags...
    await Promise.all(tasks.map((task) => task.promise));
    // ...and once they are added (and added to the global scope), remove them immediately, they are not needed anymore
    tasks.forEach(({ element }) => {
        document.head.removeChild(element);
    });
}
function moduleNameFromUrl(url) {
    var _a;
    const moduleName = (_a = /.*\/([^/]+)\.(?:js|mjs)$/.exec(url)) === null || _a === void 0 ? void 0 : _a[1];
    invariant(moduleName, "Invalid plugin URL provided, it must point to the root .js file");
    return moduleName;
}
function addScriptTag(url) {
    const element = document.createElement("script");
    const promise = new Promise((resolve, reject) => {
        element.src = url;
        element.type = "text/javascript";
        element.async = true;
        if (url.match(/.mjs$/)) {
            element.type = "module";
        }
        element.onload = () => {
            // eslint-disable-next-line no-console
            console.log(`Dynamic Script Loaded: ${url}`);
            resolve();
        };
        element.onerror = () => {
            const message = `Dynamic Script Error: ${url}`;
            console.error(message);
            reject(new DynamicScriptLoadSdkError(message));
        };
        document.head.appendChild(element);
    });
    return {
        promise,
        element,
    };
}
function loadEntry(moduleName, { __webpack_init_sharing__, __webpack_share_scopes__ }) {
    return async () => {
        // Initializes the share scope. This fills it with known provided modules from this build and all remotes
        await __webpack_init_sharing__("default");
        const container = window[moduleName]; // or get the container somewhere else
        // Initialize the container, it may provide shared modules
        await container.init(__webpack_share_scopes__.default);
        // the `./${moduleName}_ENTRY` corresponds to exposes in the dashboard-plugin-template webpack config
        const entryFactory = await window[moduleName].get(`./${moduleName}_ENTRY`);
        return entryFactory().default;
    };
}
function loadPlugin(moduleName, moduleFederationIntegration) {
    return async () => {
        const entry = await loadEntry(moduleName, moduleFederationIntegration)();
        const factory = await window[moduleName].get(entry.pluginKey);
        return factory();
    };
}
function loadEngine(moduleName, moduleFederationIntegration) {
    return async () => {
        const entry = await loadEntry(moduleName, moduleFederationIntegration)();
        const factory = await window[moduleName].get(entry.engineKey);
        try {
            return factory();
        }
        catch (ex) {
            console.error(`Initialization of ${moduleName} failed. This can happen if you deploy the same plugin multiple times each with the different GoodData.UI version or ${moduleName} is not unique in workspace`);
            throw ex;
        }
    };
}
//# sourceMappingURL=dynamicComponentLoaders.js.map