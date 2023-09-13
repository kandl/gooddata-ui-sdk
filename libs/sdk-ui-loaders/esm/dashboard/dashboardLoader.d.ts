import { DashboardLoadResult, IDashboardLoader } from "./loader.js";
import { DashboardContext, IDashboardEngine } from "@gooddata/sdk-ui-dashboard";
import { IAnalyticalBackend, IDashboardWithReferences } from "@gooddata/sdk-backend-spi";
import { IClientWorkspaceIdentifiers } from "@gooddata/sdk-ui";
import { ObjRef } from "@gooddata/sdk-model";
import { AdaptiveLoadOptions, IDashboardBasePropsForLoader, IDashboardLoadOptions, IDashboardPluginsLoaderOptions, LoadedPlugin, IEmbeddedPlugin } from "./types.js";
/**
 * @public
 */
export type DashboardEngineLoader = (dashboard: IDashboardWithReferences | undefined) => Promise<IDashboardEngine>;
/**
 * @public
 */
export type DashboardPluginsLoader = (ctx: DashboardContext, dashboard: IDashboardWithReferences | undefined, options?: IDashboardPluginsLoaderOptions) => Promise<LoadedPlugin[]>;
/**
 * @public
 */
export type DashboardBeforeLoad = (ctx: DashboardContext, dashboard: IDashboardWithReferences | undefined) => Promise<void>;
/**
 * @public
 */
export type DashboardLoaderConfig = {
    /**
     * Specify function that will be used to load an instance of {@link @gooddata/sdk-ui-dashboard#DashboardEngine} to
     * use for rendering dashboard.
     */
    engineLoader: DashboardEngineLoader;
    /**
     * Specify function that will be used to load instances of plugins to integrate with the dashboard engine.
     */
    pluginLoader: DashboardPluginsLoader;
    /**
     * Specify a function that will be called before engineLoader and pluginLoader.
     *
     * @remarks
     * This function is useful if there are some steps needed for both engine and plugin loading.
     */
    beforeLoad?: DashboardBeforeLoad;
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
export declare class DashboardLoader implements IDashboardLoader {
    private readonly config;
    private baseProps;
    private embeddedPlugins;
    private clientWorkspace;
    private constructor();
    /**
     * Create loader that will never do any dynamic loading and linking.
     *
     * @remarks
     * The loader will expect that the dashboard engine is statically linked in the context.
     * Any plugins that require dynamic loading from remote locations will be ignored.
     * Only locally embedded plugins will be used.
     */
    static staticOnly(): DashboardLoader;
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
    static adaptive(options: AdaptiveLoadOptions): DashboardLoader;
    onBackend: (backend: IAnalyticalBackend) => this;
    fromClientWorkspace: (clientWorkspace: IClientWorkspaceIdentifiers) => this;
    fromWorkspace: (workspace: string) => this;
    forDashboard: (dashboardRef: ObjRef) => this;
    withFilterContext: (filterContextRef: ObjRef) => this;
    withEmbeddedPlugins: (...plugins: IEmbeddedPlugin[]) => this;
    withBaseProps: (props: IDashboardBasePropsForLoader) => this;
    private resolveWorkspace;
    private loadParts;
    load: (options?: IDashboardLoadOptions) => Promise<DashboardLoadResult>;
}
