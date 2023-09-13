import identity from "lodash/identity.js";
const loadAttributeRequest = identity;
const loadAttributeStart = (state) => {
    state.attribute.status = "loading";
    state.attribute.error = undefined;
    state.attribute.data = undefined;
};
const loadAttributeSuccess = (state, action) => {
    state.attribute.status = "success";
    state.attribute.data = action.payload.attribute;
};
const loadAttributeError = (state, action) => {
    state.attribute.status = "error";
    state.attribute.error = action.payload.error;
};
const loadAttributeCancelRequest = identity;
const loadAttributeCancel = (state) => {
    state.attribute.status = "canceled";
};
/**
 * @internal
 */
export const loadAttributeReducers = {
    loadAttributeRequest,
    loadAttributeStart,
    loadAttributeSuccess,
    loadAttributeError,
    loadAttributeCancelRequest,
    loadAttributeCancel,
};
//# sourceMappingURL=loadAttributeReducers.js.map