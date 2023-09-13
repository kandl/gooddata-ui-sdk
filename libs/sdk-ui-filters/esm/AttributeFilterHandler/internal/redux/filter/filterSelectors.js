// (C) 2021-2023 GoodData Corporation
import { newNegativeAttributeFilter, newPositiveAttributeFilter, } from "@gooddata/sdk-model";
import { createSelector } from "@reduxjs/toolkit";
import difference from "lodash/difference.js";
import union from "lodash/union.js";
import { selectState } from "../common/selectors.js";
import { selectCommittedSelection, selectIsCommittedSelectionInverted, } from "../selection/selectionSelectors.js";
/**
 * @internal
 */
export const selectAttributeFilterElementsForm = createSelector(selectState, (state) => state.elementsForm);
/**
 * @internal
 */
export const selectHiddenElements = createSelector(selectState, (state) => { var _a; return (_a = state.config.hiddenElements) !== null && _a !== void 0 ? _a : []; });
/**
 * @internal
 */
export const selectHiddenElementsAsAttributeElements = createSelector(selectAttributeFilterElementsForm, selectHiddenElements, (elementsForm, hiddenElements) => elementsForm === "uris" ? { uris: hiddenElements } : { values: hiddenElements });
/**
 * @internal
 */
export const selectAttributeFilterDisplayForm = createSelector(selectState, (state) => state.displayFormRef);
/**
 * @internal
 */
export const selectAttributeFilterElements = createSelector(selectAttributeFilterElementsForm, selectCommittedSelection, (elementsForm, selection) => elementsForm === "uris" ? { uris: selection } : { values: selection });
/**
 * @internal
 */
export const selectAttributeFilterElementsWithHiddenElementsResolved = createSelector(selectAttributeFilterElementsForm, selectCommittedSelection, selectIsCommittedSelectionInverted, selectHiddenElements, (elementsForm, selection, isInverted, hiddenElements) => {
    const updatedSelection = isInverted
        ? union(selection, hiddenElements)
        : difference(selection, hiddenElements);
    return elementsForm === "uris" ? { uris: updatedSelection } : { values: updatedSelection };
});
/**
 * @internal
 */
export const selectAttributeFilter = createSelector(selectAttributeFilterDisplayForm, selectIsCommittedSelectionInverted, selectAttributeFilterElementsWithHiddenElementsResolved, (displayForm, isInverted, elements) => isInverted
    ? newNegativeAttributeFilter(displayForm, elements)
    : newPositiveAttributeFilter(displayForm, elements));
//# sourceMappingURL=filterSelectors.js.map