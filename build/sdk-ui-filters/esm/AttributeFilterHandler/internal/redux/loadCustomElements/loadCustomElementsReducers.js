import identity from "lodash/identity.js";
import { getElementCacheKey } from "../common/selectors.js";
const loadCustomElementsRequest = identity;
const loadCustomElementsStart = identity;
const loadCustomElementsSuccess = (state, action) => {
    action.payload.elements.forEach((el) => {
        const cacheKey = getElementCacheKey(state, el);
        if (!state.elements.cache[cacheKey]) {
            state.elements.cache[cacheKey] = el;
        }
    });
};
const loadCustomElementsError = identity;
const loadCustomElementsCancelRequest = identity;
const loadCustomElementsCancel = identity;
/**
 * @internal
 */
export const loadCustomElementsReducers = {
    loadCustomElementsRequest,
    loadCustomElementsStart,
    loadCustomElementsSuccess,
    loadCustomElementsError,
    loadCustomElementsCancelRequest,
    loadCustomElementsCancel,
};
//# sourceMappingURL=loadCustomElementsReducers.js.map