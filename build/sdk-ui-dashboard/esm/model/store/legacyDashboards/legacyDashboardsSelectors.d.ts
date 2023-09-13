import { DashboardSelector } from "../types.js";
import { ILegacyDashboard } from "../../../types.js";
/**
 * Selects all the legacy dashboards. Invocations before initialization lead to invariant errors.
 *
 * @alpha
 */
export declare const selectLegacyDashboards: DashboardSelector<ILegacyDashboard[]>;
