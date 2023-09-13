// (C) 2021-2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
const selectSelf = createSelector((state) => state, (state) => state.loading);
/**
 * @internal
 */
export const selectDashboardLoading = selectSelf;
/**
 * @internal
 */
export const selectIsDashboardLoading = createSelector(selectSelf, (state) => state.loading);
//# sourceMappingURL=loadingSelectors.js.map