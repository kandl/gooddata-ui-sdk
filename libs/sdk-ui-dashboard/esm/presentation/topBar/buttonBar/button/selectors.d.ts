import { DashboardState, DashboardSelector } from "../../../../model/index.js";
/**
 * Decide whether the user has the right to edit dashboard.
 * If dashboard permissions are enabled then use them, otherwise fallback to workspace permissions
 *
 * @internal
 */
export declare const hasEditDashboardPermission: DashboardSelector<boolean>;
/**
 * Decide whether the user has the right to edit locked dashboard.
 * If dashboard permissions are enabled then use them, otherwise fallback to workspace permissions
 *
 * @internal
 */
export declare const hasEditLockedDashboardPermission: DashboardSelector<boolean>;
/**
 * @internal
 */
export declare const selectCanEnterEditMode: DashboardSelector<boolean>;
/**
 * @internal
 */
export declare const selectCanEnterEditModeAndIsLoaded: DashboardSelector<boolean>;
/**
 * @internal
 */
export declare const selectIsPrivateDashboard: DashboardSelector<boolean>;
/**
 * @internal
 */
export declare function selectCanSaveDashboard(state: DashboardState): boolean;
/**
 * @internal
 */
export declare const selectIsCurrentDashboardVisibleInList: DashboardSelector<boolean>;
/**
 * @internal
 */
export declare const selectIsShareButtonVisible: DashboardSelector<boolean>;
