/**
 * This package provides various component loaders.
 *
 * @remarks
 * Currently, there are loaders related to Dashboard embedding and Dashboard plugins.
 * See also `@gooddata/sdk-ui-dashboard`.
 *
 * @packageDocumentation
 */

import { DashboardContext } from '@gooddata/sdk-ui-dashboard';
import { IAnalyticalBackend } from '@gooddata/sdk-backend-spi';
import { IClientWorkspaceIdentifiers } from '@gooddata/sdk-ui';
import { IDashboard } from '@gooddata/sdk-model';
import { IDashboardBaseProps } from '@gooddata/sdk-ui-dashboard';
import { IDashboardEngine } from '@gooddata/sdk-ui-dashboard';
import { IDashboardPluginContract_V1 } from '@gooddata/sdk-ui-dashboard';
import { IDashboardProps } from '@gooddata/sdk-ui-dashboard';
import { IErrorProps } from '@gooddata/sdk-ui';
import { ILoadingProps } from '@gooddata/sdk-ui';
import { ObjRef } from '@gooddata/sdk-model';
import { default as React_2 } from 'react';
import { UseCancelablePromiseState } from '@gooddata/sdk-ui';

/**
 * Adaptive loading requires additional options passed by the client.
 *
 * @remarks
 * The crucial options are the module federation integration functions.
 *
 * The adaptive loader relies on Webpack's Module Federation to get the job done and expects that it
 * is running in context where Webpack Module Federation is correctly setup; the load requires few functions
 * from webpack in order to work properly. You need to pass them in via these options.
 *
 * @public
 */
export declare type AdaptiveLoadOptions = {
    /**
     * The Module Federation interoperability functions.
     *
     * @remarks
     * For information on how to get the value of this, see {@link ModuleFederationIntegration}).
     */
    moduleFederationIntegration: ModuleFederationIntegration;
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

/**
 * Loading mode of the dashboard.
 *
 * @remarks
 * See {@link IDashboardLoadOptions.loadingMode} for more information.
 *
 * @public
 */
export declare type DashboardLoadingMode = "adaptive" | "staticOnly";

/**
 * A result of successful load of a dashboard consists of a React component and constructed props that
 * should be passed to the component in order to mount the dashboard.
 *
 * @public
 */
export declare type DashboardLoadResult = {
    /**
     * Context in which the loaded dashboard operates.
     */
    ctx: DashboardContext;
    /**
     * Dashboard engine that was loaded.
     */
    engine: IDashboardEngine;
    /**
     * A component that should be mounted in order to render the dashboard.
     */
    DashboardComponent: React_2.ComponentType<IDashboardProps>;
    /**
     * Props that should be passed to the {@link DashboardLoadResult.DashboardComponent} when mounting.
     */
    props: IDashboardProps;
    /**
     * All plugins that will be in effect on the dashboard. The plugins are already registered and
     * their contributions are reflected in the {@link DashboardLoadResult.props}.
     */
    plugins: IDashboardPluginContract_V1[];
};

/**
 * Returned by the `useDashboardLoader` to communicate the status of dashboard loading.
 *
 * @public
 */
export declare type DashboardLoadStatus = UseCancelablePromiseState<DashboardLoadResult, any>;

/**
 * DashboardStub encapsulates load, bootstrap and teardown of a dashboard enhanced by plugins.
 *
 * @remarks
 * This component is a thin wrapper on top of the {@link useDashboardLoader} hook which does the heavy lifting - you can
 * use the hook in your own component if this simple stub does not suffice.
 *
 * @public
 */
export declare const DashboardStub: React_2.FC<IDashboardStubProps>;

/**
 * This a specialization of {@link @gooddata/sdk-ui-dashboard#IDashboardBaseProps} interface in which the `dashboard` can only be provided
 * by reference.
 *
 * @public
 */
export declare interface IDashboardBasePropsForLoader extends Omit<IDashboardBaseProps, "dashboard"> {
    /**
     * Specify reference to an existing dashboard that should be loaded or undefined to initialize an empty one.
     *
     * @remarks
     * You may specify an `idRef` or `uriRef`; as a convenience you may also specify dashboard object
     * identifier (string) - that's same as using `idRef(objectIdentifier)`.
     * You can also specify an {@link @gooddata/sdk-model#IDashboard} instance but this is reserved for internal use cases, avoid
     * it unless you are absolutely certain you know what you are doing.
     */
    dashboard: string | ObjRef | undefined | IDashboard;
}

/**
 * Dashboard loader is responsible for loading dashboard and all the assets that the dashboard needs. As a
 * result, it returns a React component and an instance of props to use in order
 * to mount the dashboard.
 *
 * @public
 */
export declare interface IDashboardLoader {
    /**
     * Specify an instance of Analytical Backend that hosts the dashboards.
     *
     * @param backend - an instance of analytical backend
     */
    onBackend(backend: IAnalyticalBackend): IDashboardLoader;
    /**
     * Specify identifier of workspace where the dashboard is stored.
     *
     * @param workspace - identifier of workspace
     */
    fromWorkspace(workspace: string): IDashboardLoader;
    /**
     * Alternatively specify workspace indirectly, using data product, segment and client identifier.
     *
     * @remarks
     * Note: this indirect method of identification is not supported by all backends. At this moment, only
     * the 'bear' backend allows this - and it does so only when it's Life Cycle Management features are
     * employed in the solution.
     *
     * @param clientWorkspace - complex identifier of the client workspace
     */
    fromClientWorkspace(clientWorkspace: IClientWorkspaceIdentifiers): IDashboardLoader;
    /**
     * Specify dashboard to load.
     *
     * @param dashboardRef - reference to an existing dashboard.
     */
    forDashboard(dashboardRef: ObjRef): IDashboardLoader;
    /**
     * Override filter context to use for the loaded dashboard.
     *
     * @remarks
     * Note: Each dashboard has its own, default filter context - that filter context will be used automatically
     * unless you override it using this call. You typically don't need to do this: filter context overrides
     * are needed most commonly during export and scheduled exports - where application has to create point-in-time
     * snapshot of the filters so that they can be reused during exports instead of the default filter context.
     *
     * @param filterContextRef - reference to filter context to use instead of the default filter context
     */
    withFilterContext(filterContextRef: ObjRef): IDashboardLoader;
    /**
     * Specify an instance of {@link @gooddata/sdk-ui-dashboard#IDashboardBaseProps} to use for the dashboard component.
     *
     * @remarks
     * Note: the base props may also contain backend and workspace parameters. The loader can work with them.
     * If specified, they are equivalent to calling {@link IDashboardLoader.onBackend} and/or {@link IDashboardLoader.fromWorkspace}
     *
     * @param props - base props to use
     */
    withBaseProps(props: IDashboardBaseProps): IDashboardLoader;
    /**
     * Specify embedded plugins to use on top of any plugins that the dashboard is already
     * configured to use.
     *
     * @remarks
     * The embedded plugins are implemented, built and linked into the application that loads the dashboard.
     * There is no specific runtime loading and linkage required for these plugins.
     *
     * The lifecycle of the embedded plugins follows the lifecycle of normal plugins that may be linked with
     * the dashboard; instead of loading the plugin assets, the loader will call embedded plugin's
     * factory function to obtain an instance of the actual dashboard plugin to use. From this point on,
     * the lifecycle is the same as for normal plugins:
     *
     * 1.  The loader will call the onPluginLoaded, pass any parameters that may be specified for the embedded plugin
     * 2.  Plugin registration is done same as for normal plugins
     * 3.  The loader will call onPluginUnload when the dashboard containing the plugins gets unmounted
     *
     * @param plugins - extra plugins to use
     */
    withEmbeddedPlugins(...plugins: IEmbeddedPlugin[]): IDashboardLoader;
    /**
     * Load the dashboard, dashboard engine and plugins that should be on the dashboard.
     *
     * @remarks
     * Then performs the initialization of the plugins and their registration.
     *
     * Finally, returns result containing the DashboardComponent to render, it's props and details
     * about the plugins that will be in effect once the DashboardComponent gets mounted.
     */
    load(options?: IDashboardLoadOptions): Promise<DashboardLoadResult>;
}

/**
 * Dashboard loading options.
 *
 * @public
 */
export declare interface IDashboardLoadOptions extends IDashboardBasePropsForLoader {
    /**
     * Loading mode to use.
     *
     * @remarks
     * `staticOnly` mode
     *
     * The loader expects that it is running inside an application that depends on the `@gooddata/sdk-ui-dashboard`
     * package. Furthermore the loader will initialize dashboard with only those plugins that are part of
     * the application and passed via `extraPlugins` property. Plugins that are linked with the dashboard
     * will be ignored.
     *
     * This mode is suitable during plugin development
     *
     * `adaptive` mode
     *
     * In this mode, loader will first inspect the dashboard and then act based on the dashboard setup:
     *
     * -  If the dashboard stored on the analytical backend is configured to use some plugins, the loader will dynamically
     *    load the dashboard engine required by those plugins and then dynamically load the plugins.
     *    It will then initialize the dashboard engine with the loaded plugins and any plugins that are
     *    passed via the `extraPlugins` property.
     *
     * -  If the dashboard is not configured to use any plugins, the loader will fall back to `staticOnly`
     *    behavior.
     *
     * Default loadingMode is `adaptive`.
     */
    loadingMode?: DashboardLoadingMode;
    /**
     * Specify client workspace identifiers to use in order to identify exact workspace to load
     * the dashboard from.
     *
     * @remarks
     * Client workspace identifiers are not applicable to all backends - only the 'bear'
     * backend supports them. They are tightly related to the Lifecycle Management feature of the 'bear'
     * backend.
     *
     * If you specify the client workspace then it has preference over all other means that can be used
     * to specify the workspace; more specifically the `workspace` prop on this object and workspace that may
     * be defined by the context will be ignored.
     */
    clientWorkspace?: IClientWorkspaceIdentifiers;
    /**
     * Specify extra plugins to use during the bootstrap of the dashboard.
     *
     * @remarks
     * Code for these extra plugins must be available at compile time.
     */
    extraPlugins?: IEmbeddedPlugin | IEmbeddedPlugin[];
    /**
     * Specify configuration related adaptive loading.
     *
     * @remarks
     * If loadingMode is not set to "staticOnly", this is mandatory.
     */
    adaptiveLoadOptions?: AdaptiveLoadOptions;
    /**
     * Specify when will be in progress features allowed
     *
     * @remarks
     * `staticOnly` in progress features allowed only when there is no external plugin loaded
     * `alwaysAllow` in progress features always allowed
     * `alwaysPrevent` in progress features always prevented
     *
     * Default allowUnfinishedFeatures is `alwaysPrevent`.
     */
    allowUnfinishedFeatures?: "staticOnly" | "alwaysAllow" | "alwaysPrevent";
}

/**
 * @public
 */
export declare interface IDashboardStubProps extends IDashboardLoadOptions {
    /**
     * Component to render if embedding fails.
     */
    ErrorComponent?: React_2.ComponentType<IErrorProps>;
    /**
     * Component to render while the insight is loading.
     */
    LoadingComponent?: React_2.ComponentType<ILoadingProps>;
}

/**
 * Embedded plugin is implemented, built and linked into the application that loads the dashboard.
 * There is no specific runtime loading and linkage required for these plugins.
 *
 * The lifecycle of embedded plugin is the same as other plugins

 * @public
 */
export declare interface IEmbeddedPlugin {
    /**
     * Factory function to create an instance of the embedded plugin.
     */
    factory: () => IDashboardPluginContract_V1;
    /**
     * Parameters to use.
     */
    parameters?: string;
}

/**
 * Module federation interop data.
 *
 * @remarks
 * All of the values are added by webpack to the global scope if the Module Federation plugin is used in your app.
 * See the following example of a webpack config for this to work:
 * @example
 * ```
 * const { ModuleFederationPlugin } = require("webpack").container;
 *
 * // add all the gooddata packages that absolutely need to be shared and singletons because of contexts
 * const gooddataSharePackagesEntries = Object.keys(deps)
 *   .filter((pkg) => pkg.startsWith("@gooddata"))
 *   .reduce((acc, curr) => {
 *     acc[curr] = { singleton: true };
 *     return acc;
 *   }, {});
 *
 * module.exports = {
 *   // rest of your webpack config
 *   plugins: [
 *     // rest of your plugins
 *     new ModuleFederationPlugin({
 *       shared: {
 *         react: {
 *             import: "react",
 *             shareKey: "react",
 *             singleton: true,
 *         },
 *         "react-dom": {
 *             singleton: true,
 *         },
 *         // add all the packages that absolutely need to be shared and singletons because of contexts
 *         "react-intl": {
 *             singleton: true,
 *         },
 *         ...gooddataSharePackagesEntries,
 *       },
 *     }),
 *   ]
 * };
 * ```
 *
 * @public
 */
export declare type ModuleFederationIntegration = {
    __webpack_init_sharing__: (scope: string) => Promise<void>;
    __webpack_share_scopes__: any;
};

/**
 * This hook encapsulates load, bootstrap and teardown of a dashboard enhanced by plugins.
 *
 * @remarks
 * It is a one-stop hook to use for React embedding of a Dashboard and when building new dashboard plugins.
 *
 * See {@link IDashboardLoadOptions.loadingMode} to learn about loading modes
 *
 * @param options - load options
 * @public
 */
export declare function useDashboardLoader(options: IDashboardLoadOptions): DashboardLoadStatus;

/**
 * Wrapper around {@link useDashboardLoader} that adds the option to reload while keeping the current state of the dashboard intact.
 *
 * @param options - load options
 * @internal
 */
export declare function useDashboardLoaderWithPluginManipulation(options: IDashboardLoadOptions): {
    loaderStatus: DashboardLoadStatus;
    reloadPlugins: () => void;
    hidePluginOverlays: () => void;
    changeLoadingMode: (loadingMode: DashboardLoadingMode) => void;
    loadingMode: DashboardLoadingMode;
    setExtraPlugins: (plugins: IEmbeddedPlugin | IEmbeddedPlugin[]) => void;
    extraPlugins: IEmbeddedPlugin[] | undefined;
};

export { }
