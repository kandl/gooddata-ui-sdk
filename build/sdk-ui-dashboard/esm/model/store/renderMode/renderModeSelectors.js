// (C) 2021-2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
const selectSelf = createSelector((state) => state, (state) => state.renderMode);
/**
 * @internal
 */
export const selectRenderMode = createSelector(selectSelf, (state) => state.renderMode);
/**
 * @internal
 */
export const selectIsInViewMode = createSelector(selectRenderMode, (renderMode) => renderMode === "view");
/**
 * @internal
 */
export const selectIsInEditMode = createSelector(selectRenderMode, (renderMode) => renderMode === "edit");
//# sourceMappingURL=renderModeSelectors.js.map