// (C) 2021-2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
import { selectState } from "../common/selectors.js";
/**
 * @internal
 */
export const selectLoadInitialElementsPageStatus = createSelector(selectState, (state) => state.elements.initialPageLoad.status);
/**
 * @internal
 */
export const selectLoadInitialElementsPageError = createSelector(selectState, (state) => state.elements.initialPageLoad.error);
//# sourceMappingURL=loadInitialElementsPageSelectors.js.map