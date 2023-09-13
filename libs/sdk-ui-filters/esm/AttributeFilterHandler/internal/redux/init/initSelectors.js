// (C) 2021-2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
import { selectState } from "../common/selectors.js";
/**
 * @internal
 */
export const selectInitStatus = createSelector(selectState, (state) => state.initialization.status);
/**
 * @internal
 */
export const selectInitError = createSelector(selectState, (state) => state.initialization.error);
//# sourceMappingURL=initSelectors.js.map