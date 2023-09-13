// (C) 2021-2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
const selectSelf = createSelector((state) => state, (state) => state.saving);
/**
 * @internal
 */
export const selectDashboardSaving = selectSelf;
/**
 * @public
 */
export const selectIsDashboardSaving = createSelector(selectSelf, (state) => state.saving);
//# sourceMappingURL=savingSelectors.js.map