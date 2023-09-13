import { DashboardContext } from "@gooddata/sdk-ui-dashboard";
import { IDashboardWithReferences } from "@gooddata/sdk-backend-spi";
/**
 * Validates plugins before actually loading them from remote location.
 *
 * @param ctx - context in which the dashboard operates
 * @param dashboardWithPlugins - dashboard with plugins
 */
export declare function validatePluginsBeforeLoading(ctx: DashboardContext, dashboardWithPlugins: IDashboardWithReferences): Promise<boolean>;
