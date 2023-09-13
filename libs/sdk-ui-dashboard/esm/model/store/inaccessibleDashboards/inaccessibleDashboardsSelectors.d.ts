import { IInaccessibleDashboard } from "../../types/inaccessibleDashboardTypes.js";
import { DashboardSelector, DashboardState } from "../types.js";
import { ObjRefMap } from "../../../_staging/metadata/objRefMap.js";
/**
 * Select all inaccessible dashboard in project.
 *
 * @alpha
 */
export declare const selectInaccessibleDashboards: (state: DashboardState) => IInaccessibleDashboard[];
/**
 * Select all inaccessible dashboard in project and returns them in a mapping of obj ref to the insight object.
 *
 * @alpha
 */
export declare const selectInaccessibleDashboardsMap: DashboardSelector<ObjRefMap<IInaccessibleDashboard>>;
