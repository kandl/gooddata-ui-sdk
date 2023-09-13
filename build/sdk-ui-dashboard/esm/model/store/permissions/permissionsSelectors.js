// (C) 2021-2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
import { invariant } from "ts-invariant";
const selectSelf = createSelector((state) => state, (state) => state.permissions);
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
export const selectPermissions = createSelector(selectSelf, (state) => {
    invariant(state.permissions, "attempting to access uninitialized permissions state");
    return state.permissions;
});
/**
 * Returns whether the current user has permissions to list users, roles, and permissions.
 *
 * @public
 */
export const selectCanListUsersInWorkspace = createSelector(selectPermissions, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.canListUsersInProject) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the current user has permissions to modify workspace metadata, see the workspace token, lock and unlock objects, delete locked objects, set and unset the restricted flag on objects, clear cache, delete a workspace.
 *
 * @public
 */
export const selectCanManageWorkspace = createSelector(selectPermissions, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.canManageProject) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the current user has permissions necessary to export insights.
 *
 * @public
 */
export const selectCanExportReport = createSelector(selectPermissions, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.canExportReport) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the current user has permissions necessary to export insights to CSV, XLSX
 *
 * @public
 */
export const selectCanExportTabular = createSelector(selectPermissions, (state) => {
    var _a;
    return (_a = ((state === null || state === void 0 ? void 0 : state.canExportReport) || (state === null || state === void 0 ? void 0 : state.canExportTabular))) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the current user has permissions necessary to export insights to PDF
 *
 * @public
 */
export const selectCanExportPdf = createSelector(selectPermissions, (state) => {
    var _a;
    return (_a = ((state === null || state === void 0 ? void 0 : state.canExportReport) || (state === null || state === void 0 ? void 0 : state.canExportPdf))) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the current user has permissions to create a KPI dashboard object via API.
 *
 * @public
 */
export const selectCanCreateAnalyticalDashboard = createSelector(selectPermissions, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.canCreateAnalyticalDashboard) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the current user has permissions to modify and delete a KPI dashboard object.
 *
 * @public
 */
export const selectCanManageAnalyticalDashboard = createSelector(selectPermissions, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.canManageAnalyticalDashboard) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the current user has permissions to add, remove, and list ACLs (Access Control Lists) on an object.
 *
 * @public
 */
export const selectCanManageACL = createSelector(selectPermissions, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.canManageACL) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the current user has permissions to create a scheduled email object and a KPI alert object.
 *
 * @public
 */
export const selectCanCreateScheduledMail = createSelector(selectPermissions, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.canCreateScheduledMail) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the current user has permissions to run MAQL DDL and DML, access a workspace staging directory.
 *
 * @public
 */
export const selectCanInitData = createSelector(selectPermissions, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.canInitData) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the current user has permissions to upload CSV files via CSV Uploader.
 *
 * @public
 */
export const selectCanUploadNonProductionCSV = createSelector(selectPermissions, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.canUploadNonProductionCSV) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the current user has permissions necessary to export insights to CSV..
 *
 * @public
 */
export const selectCanExecuteRaw = createSelector(selectPermissions, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.canExecuteRaw) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the current user has permissions to create a KPI object, KPI widget object, and an insight object via API.
 *
 * @public
 */
export const selectCanCreateVisualization = createSelector(selectPermissions, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.canCreateVisualization) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the current user has permissions to modify and delete a metric, run MAQL DDL, run the MAQL validator, change metric visibility via the `unlisted` flag.
 *
 * @public
 */
export const selectCanManageMetric = createSelector(selectPermissions, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.canManageMetric) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the current user has permissions to modify and delete a domain, run MAQL DDL.
 *
 * @public
 */
export const selectCanManageDomain = createSelector(selectPermissions, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.canManageDomain) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the current user has permissions to invite a user to a workspace or delete an invitation.
 *
 * @public
 */
export const selectCanInviteUserToWorkspace = createSelector(selectPermissions, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.canInviteUserToProject) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the current user has permissions to run uploads, load date dimensions, access a workspace staging directory.
 *
 * @public
 */
export const selectCanRefreshData = createSelector(selectPermissions, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.canRefreshData) !== null && _a !== void 0 ? _a : false;
});
/**
 * Returns whether the current user has permissions to manage scheduled email objects.
 *
 * @public
 */
export const selectCanManageScheduledMail = createSelector(selectPermissions, (state) => {
    var _a;
    return (_a = state === null || state === void 0 ? void 0 : state.canManageScheduledMail) !== null && _a !== void 0 ? _a : false;
});
//# sourceMappingURL=permissionsSelectors.js.map