import { IDashboardPermissions } from "@gooddata/sdk-model";
import { DashboardSelector } from "../types.js";
/**
 * This selector returns user's dashboard permissions.
 *
 * @remarks
 * It is expected that the selector is called only after the dashboard permission state is correctly initialized.
 * Invocations before initialization lead to invariant errors.
 *
 * If the permission is not supported by GoodData Cloud and GoodData.CN backends, the selector always returns `false` value.
 *
 * In case you need multiple permissions available in your application, use this common selector.
 *
 * @public
 */
export declare const selectDashboardPermissions: DashboardSelector<IDashboardPermissions>;
/**
 * Returns whether the current user has permissions to view dashboard.
 *
 * @public
 */
export declare const selectCanViewDashboardPermission: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions to share dashboard.
 *
 * @public
 */
export declare const selectCanShareDashboardPermission: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions to share a locked dashboard.
 *
 * @public
 */
export declare const selectCanShareLockedDashboardPermission: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions to edit dashboard.
 *
 * @public
 */
export declare const selectCanEditDashboardPermission: DashboardSelector<boolean>;
/**
 * Returns whether the current user has permissions to edit locked dashboard.
 *
 * @public
 */
export declare const selectCanEditLockedDashboardPermission: DashboardSelector<boolean>;
