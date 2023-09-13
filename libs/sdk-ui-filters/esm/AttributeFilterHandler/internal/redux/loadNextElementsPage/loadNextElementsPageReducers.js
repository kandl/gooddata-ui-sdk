import identity from "lodash/identity.js";
import { getElementCacheKey } from "../common/selectors.js";
const loadNextElementsPageRequest = identity;
const loadNextElementsPageStart = (state) => {
    state.elements.nextPageLoad.status = "loading";
    state.elements.nextPageLoad.error = undefined;
};
const loadNextElementsPageSuccess = (state, action) => {
    state.elements.nextPageLoad.status = "success";
    action.payload.elements.forEach((el) => {
        const cacheKey = getElementCacheKey(state, el);
        if (!state.elements.cache[cacheKey]) {
            state.elements.cache[cacheKey] = el;
        }
    });
    state.elements.data = state.elements.data.concat(action.payload.elements.map((el) => getElementCacheKey(state, el)));
    state.elements.lastLoadedOptions = action.payload.options;
};
const loadNextElementsPageError = (state, action) => {
    state.elements.nextPageLoad.status = "error";
    state.elements.nextPageLoad.error = action.payload.error;
};
const loadNextElementsPageCancelRequest = identity;
const loadNextElementsPageCancel = (state) => {
    state.elements.nextPageLoad.status = "canceled";
};
/**
 * @internal
 */
export const loadNextElementsPageReducers = {
    loadNextElementsPageRequest,
    loadNextElementsPageStart,
    loadNextElementsPageSuccess,
    loadNextElementsPageError,
    loadNextElementsPageCancelRequest,
    loadNextElementsPageCancel,
};
//# sourceMappingURL=loadNextElementsPageReducers.js.map