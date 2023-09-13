import { IBackendCapabilities } from "@gooddata/sdk-backend-spi";
import { DashboardSelector } from "../types.js";
/**
 * This selector returns capabilities of the backend with which the dashboard works.
 *
 * @public
 */
export declare const selectBackendCapabilities: DashboardSelector<IBackendCapabilities>;
/**
 * This selector returns capability if parent child filtering is enabled.
 *
 * @public
 */
export declare const selectSupportsElementsQueryParentFiltering: DashboardSelector<boolean>;
/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.supportsKpiWidget}
 *
 * @internal
 */
export declare const selectSupportsKpiWidgetCapability: DashboardSelector<boolean>;
/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.supportsAccessControl}
 *
 * @internal
 */
export declare const selectSupportsAccessControlCapability: DashboardSelector<boolean>;
/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.supportsHierarchicalWorkspaces}
 *
 * @internal
 */
export declare const selectSupportsHierarchicalWorkspacesCapability: DashboardSelector<boolean>;
/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.supportsElementUris}
 *
 * @internal
 */
export declare const selectSupportsElementUris: DashboardSelector<boolean>;
/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.canExportCsv}
 *
 * @internal
 */
export declare const selectSupportsExportToCsv: DashboardSelector<boolean>;
/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.canExportXlsx}
 *
 * @internal
 */
export declare const selectSupportsExportToXlsx: DashboardSelector<boolean>;
/**
 * Selector for {@link @gooddata/sdk-backend-spi#IBackendCapabilities.supportsObjectUris}
 *
 * @internal
 */
export declare const selectSupportsObjectUris: DashboardSelector<boolean>;
