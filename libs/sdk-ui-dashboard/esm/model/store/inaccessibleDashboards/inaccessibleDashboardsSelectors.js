// (C) 2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
import { newMapForObjectWithIdentity } from "../../../_staging/metadata/objRefMap.js";
import { inaccessibleDashboardsEntityAdapter } from "./inaccessibleDashboardsEntityAdapter.js";
const selectSelf = createSelector((state) => state, (state) => state.inaccessibleDashboards);
const adapterSelectors = inaccessibleDashboardsEntityAdapter.getSelectors(selectSelf);
/**
 * Select all inaccessible dashboard in project.
 *
 * @alpha
 */
export const selectInaccessibleDashboards = adapterSelectors.selectAll;
/**
 * Select all inaccessible dashboard in project and returns them in a mapping of obj ref to the insight object.
 *
 * @alpha
 */
export const selectInaccessibleDashboardsMap = createSelector(selectInaccessibleDashboards, (dashboards) => {
    return newMapForObjectWithIdentity(dashboards);
});
//# sourceMappingURL=inaccessibleDashboardsSelectors.js.map