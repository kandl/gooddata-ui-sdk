import { IDashboardWithReferences } from "@gooddata/sdk-backend-spi";
import { DashboardContext, IDashboardEngine } from "@gooddata/sdk-ui-dashboard";
import { LoadedPlugin, ModuleFederationIntegration } from "../types.js";
/**
 * @internal
 */
export declare function dynamicDashboardEngineLoader(dashboard: IDashboardWithReferences, moduleFederationIntegration: ModuleFederationIntegration): Promise<IDashboardEngine>;
/**
 * @internal
 */
export declare function dynamicDashboardPluginLoader(_ctx: DashboardContext, dashboard: IDashboardWithReferences, moduleFederationIntegration: ModuleFederationIntegration): Promise<LoadedPlugin[]>;
/**
 * @internal
 */
export declare function dynamicDashboardBeforeLoad(_ctx: DashboardContext, dashboard: IDashboardWithReferences): Promise<void>;
