// (C) 2021-2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
const selectSelf = createSelector((state) => state, (state) => state.drill);
/**
 * Returns drillable items that are currently set.
 *
 * @alpha
 */
export const selectDrillableItems = createSelector(selectSelf, (state) => {
    return state.drillableItems;
});
//# sourceMappingURL=drillSelectors.js.map