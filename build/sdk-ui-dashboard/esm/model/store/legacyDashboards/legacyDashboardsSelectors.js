// (C) 2022-2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
import { invariant } from "ts-invariant";
const selectSelf = createSelector((state) => state, (state) => state.legacyDashboards);
/**
 * Selects all the legacy dashboards. Invocations before initialization lead to invariant errors.
 *
 * @alpha
 */
export const selectLegacyDashboards = createSelector(selectSelf, (state) => {
    invariant(state.legacyDashboards, "attempting to access uninitialized legacy dashboard state");
    return state.legacyDashboards;
});
//# sourceMappingURL=legacyDashboardsSelectors.js.map