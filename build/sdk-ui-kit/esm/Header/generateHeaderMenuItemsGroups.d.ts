import { ISettings, IWorkspacePermissions } from "@gooddata/sdk-model";
import { IHeaderMenuItem } from "./typings.js";
/**
 * @internal
 */
export declare const HEADER_ITEM_ID_DASHBOARDS = "gs.header.dashboards";
/**
 * @internal
 */
export declare const HEADER_ITEM_ID_REPORTS = "gs.header.reports";
/**
 * @internal
 */
export declare const HEADER_ITEM_ID_KPIS_NEW = "gs.header.kpis.new";
/**
 * @internal
 */
export declare const HEADER_ITEM_ID_KPIS = "gs.header.kpis";
/**
 * @internal
 */
export declare const HEADER_ITEM_ID_ANALYZE = "gs.header.analyze";
/**
 * @internal
 */
export declare const HEADER_ITEM_ID_METRICS = "gs.header.metrics";
/**
 * @internal
 */
export declare const HEADER_ITEM_ID_LOAD = "gs.header.load";
/**
 * @internal
 */
export declare const HEADER_ITEM_ID_DATA = "gs.header.data";
/**
 * @internal
 */
export declare const HEADER_ITEM_ID_MANAGE = "gs.header.manage";
/**
 * @internal
 */
export declare function generateHeaderMenuItemsGroups(featureFlags: ISettings, workspacePermissions: IWorkspacePermissions, hasAnalyticalDashboards?: boolean, workspaceId?: string, dashboardId?: string, tabId?: string, hasNoDataSet?: boolean, backendSupportsDataItem?: boolean, backendSupportsCsvUploader?: boolean, hasMeasures?: boolean, hasManage?: boolean): IHeaderMenuItem[][];
//# sourceMappingURL=generateHeaderMenuItemsGroups.d.ts.map