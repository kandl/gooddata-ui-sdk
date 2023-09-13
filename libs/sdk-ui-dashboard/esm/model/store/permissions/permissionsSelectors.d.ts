import { DashboardSelector } from "../types.js";
import { IWorkspacePermissions } from "@gooddata/sdk-model";
/**
 * This selector returns user's permissions in the workspace where the dashboard is stored.
 *
 * @remarks
 * It is expected that the selector is called only after the permission state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * See {@link @gooddata/sdk-backend-spi#WorkspacePermission} for all available permissions.
 *
 * If the permission is not supported by GoodData Cloud and GoodData.CN backends, the selector always returns `false` value.
 *
 * In case you need multiple permissions available in your application, use common selector.
 *
 * @example - on how to select all permissions.
 * ```
 *      const permissions = useDashboardSelector(selectPermissions);
 *
 *      if (permissions.canCreateAnalyticalDashboard) {
 *          // allow user to do a action for which the `canCreateAnalyticalDashboard` permission is needed
 *      }
 * ```
 *
 * If there is only limited number of permissions, use specific selector instead (available selectors are all below).
 *
 * @example - on how to select specific permission.
 * ```
 *      const canCreateAnalyticalDashboard = useDashboardSelector(selectCanCreateAnalyticalDashboard);
 *
 *      if (canCreateAnalyticalDashboard) {
 *          // allow user to do a action for which the `canCreateAnalyticalDashboard` permission is needed
 *      }
 * ```
 *
 * @public
 */
export declare const selectPermissions: DashboardSelector<IWorkspacePermissions>;
/**
 * Returns whether the current user has permissions to list users, roles, and permissions.
 *
 * @public
 */
export declare const selectCanListUsersInWorkspace: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions to modify workspace metadata, see the workspace token, lock and unlock objects, delete locked objects, set and unset the restricted flag on objects, clear cache, delete a workspace.
 *
 * @public
 */
export declare const selectCanManageWorkspace: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions necessary to export insights.
 *
 * @public
 */
export declare const selectCanExportReport: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions necessary to export insights to CSV, XLSX
 *
 * @public
 */
export declare const selectCanExportTabular: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions necessary to export insights to PDF
 *
 * @public
 */
export declare const selectCanExportPdf: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions to create a KPI dashboard object via API.
 *
 * @public
 */
export declare const selectCanCreateAnalyticalDashboard: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions to modify and delete a KPI dashboard object.
 *
 * @public
 */
export declare const selectCanManageAnalyticalDashboard: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions to add, remove, and list ACLs (Access Control Lists) on an object.
 *
 * @public
 */
export declare const selectCanManageACL: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions to create a scheduled email object and a KPI alert object.
 *
 * @public
 */
export declare const selectCanCreateScheduledMail: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions to run MAQL DDL and DML, access a workspace staging directory.
 *
 * @public
 */
export declare const selectCanInitData: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions to upload CSV files via CSV Uploader.
 *
 * @public
 */
export declare const selectCanUploadNonProductionCSV: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions necessary to export insights to CSV..
 *
 * @public
 */
export declare const selectCanExecuteRaw: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions to create a KPI object, KPI widget object, and an insight object via API.
 *
 * @public
 */
export declare const selectCanCreateVisualization: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions to modify and delete a metric, run MAQL DDL, run the MAQL validator, change metric visibility via the `unlisted` flag.
 *
 * @public
 */
export declare const selectCanManageMetric: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions to modify and delete a domain, run MAQL DDL.
 *
 * @public
 */
export declare const selectCanManageDomain: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions to invite a user to a workspace or delete an invitation.
 *
 * @public
 */
export declare const selectCanInviteUserToWorkspace: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions to run uploads, load date dimensions, access a workspace staging directory.
 *
 * @public
 */
export declare const selectCanRefreshData: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions to manage scheduled email objects.
 *
 * @public
 */
export declare const selectCanManageScheduledMail: DashboardSelector<boolean>;
