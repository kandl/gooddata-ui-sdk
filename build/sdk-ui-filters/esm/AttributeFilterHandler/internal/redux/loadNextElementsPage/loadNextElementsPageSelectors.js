import { createSelector } from "@reduxjs/toolkit";
import isEqual from "lodash/isEqual.js";
import omit from "lodash/omit.js";
import { selectState } from "../common/selectors.js";
import { selectElementsTotalCountWithCurrentSettings, selectLastLoadedElementsOptions, selectLoadElementsOptions, } from "../elements/elementsSelectors.js";
/**
 * @internal
 */
export const selectLoadNextElementsPageStatus = createSelector(selectState, (state) => state.elements.nextPageLoad.status);
/**
 * @internal
 */
export const selectLoadNextElementsPageError = createSelector(selectState, (state) => state.elements.nextPageLoad.error);
/**
 * @internal
 */
export const selectLoadNextElementsPageOptions = createSelector(selectLastLoadedElementsOptions, (options) => {
    return Object.assign(Object.assign({}, options), { offset: options.offset + options.limit });
});
/**
 * @internal
 */
export const selectHasNextPage = createSelector(selectLastLoadedElementsOptions, selectElementsTotalCountWithCurrentSettings, (lastLoadedOptions, totalCountWithCurrentSettings) => {
    return lastLoadedOptions.offset + lastLoadedOptions.limit < totalCountWithCurrentSettings;
});
/**
 * @internal
 */
export const selectIsLoadElementsOptionsChanged = createSelector(selectLoadElementsOptions, selectLastLoadedElementsOptions, (loadOptions, lastLoadedOptions) => {
    return !isEqual(omit(loadOptions, "offset", "excludePrimaryLabel"), omit(lastLoadedOptions, "offset", "excludePrimaryLabel"));
});
//# sourceMappingURL=loadNextElementsPageSelectors.js.map