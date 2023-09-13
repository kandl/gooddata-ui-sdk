import { IListedDashboard } from "@gooddata/sdk-model";
import { DashboardSelector, DashboardState } from "../types.js";
import { ObjRefMap } from "../../../_staging/metadata/objRefMap.js";
/**
 * Select all listed dashboard in project.
 *
 * @alpha
 */
export declare const selectListedDashboards: (state: DashboardState) => IListedDashboard[];
/**
 * Select all listed dashboard in project and returns them in a mapping of obj ref to the insight object.
 *
 * @alpha
 */
export declare const selectListedDashboardsMap: DashboardSelector<ObjRefMap<IListedDashboard>>;
