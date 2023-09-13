import { IDashboardPluginContract_V1 } from "./plugin.js";
import { IDashboardExtensionProps, IDashboardProps } from "../presentation/index.js";
import { ComponentType } from "react";
import { DashboardContext } from "../model/index.js";
/**
 * Dashboard Engine encapsulates a particular build of the {@link Dashboard} component and provides
 * factory methods to create the Dashboard component's customization-related props using one or more
 * plugins.
 *
 * @public
 */
export interface IDashboardEngine {
    /**
     * Version of the dashboard engine.
     */
    readonly version: string;
    /**
     * Drives initialization of loaded dashboard plugins and their registration logic.
     *
     * @remarks
     * During registration, the plugins register their customizations, contributions and event handlers.
     *
     * The plugin' contributions will be used to construct the dashboard extension props which can then be
     * used as input to the dashboard component itself and thus achieve the integration of the plugins
     * into the dashboard.
     *
     * @param ctx - dashboard context in which the plugins operate
     * @param plugins - plugins to initialize
     */
    initializePlugins(ctx: DashboardContext, plugins: IDashboardPluginContract_V1[]): IDashboardExtensionProps;
    /**
     * Returns Dashboard component provided by this dashboard engine.
     */
    getDashboardComponent(): ComponentType<IDashboardProps>;
}
/**
 * A factory function to obtain an instance of {@link IDashboardEngine}.
 *
 * @remarks
 * This is the main, well-known entry point to the Dashboard Engine that is used during both static and dynamic
 * loading of the dashboard engine instances by the DashboardLoader.
 *
 * @public
 */
export declare function newDashboardEngine(): IDashboardEngine;
