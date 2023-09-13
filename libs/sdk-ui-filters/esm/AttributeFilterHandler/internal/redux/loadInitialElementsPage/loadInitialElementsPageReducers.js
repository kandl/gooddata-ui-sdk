import identity from "lodash/identity.js";
import { getElementCacheKey } from "../common/selectors.js";
const loadInitialElementsPageRequest = identity;
const loadInitialElementsPageStart = (state) => {
    state.elements.initialPageLoad.status = "loading";
    state.elements.initialPageLoad.error = undefined;
    state.elements.currentOptions.offset = 0;
    state.elements.lastLoadedOptions.offset = 0;
    state.elements.data = [];
};
const loadInitialElementsPageSuccess = (state, action) => {
    state.elements.initialPageLoad.status = "success";
    state.elements.totalCountWithCurrentSettings = action.payload.totalCount;
    action.payload.elements.forEach((el) => {
        const cacheKey = getElementCacheKey(state, el);
        if (!state.elements.cache[cacheKey]) {
            state.elements.cache[cacheKey] = el;
        }
    });
    state.elements.data = action.payload.elements.map((el) => getElementCacheKey(state, el));
    state.elements.lastLoadedOptions = action.payload.options;
};
const loadInitialElementsPageError = (state, action) => {
    state.elements.initialPageLoad.status = "error";
    state.elements.initialPageLoad.error = action.payload.error;
};
const loadInitialElementsPageCancelRequest = identity;
const loadInitialElementsPageCancel = (state) => {
    state.attribute.status = "canceled";
};
/**
 * @internal
 */
export const loadInitialElementsPageReducers = {
    loadInitialElementsPageRequest,
    loadInitialElementsPageStart,
    loadInitialElementsPageSuccess,
    loadInitialElementsPageError,
    loadInitialElementsPageCancelRequest,
    loadInitialElementsPageCancel,
};
//# sourceMappingURL=loadInitialElementsPageReducers.js.map