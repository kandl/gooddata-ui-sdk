// (C) 2021-2022 GoodData Corporation
import identity from "lodash/identity.js";
const init = identity;
const initStart = (state) => {
    state.initialization.status = "loading";
};
const initSuccess = (state) => {
    state.initialization.status = "success";
};
const initError = (state, action) => {
    state.initialization.status = "error";
    state.initialization.error = action.payload.error;
};
const initCancel = (state) => {
    state.initialization.status = "canceled";
};
/**
 * @internal
 */
export const initReducers = {
    init,
    initStart,
    initSuccess,
    initError,
    initCancel,
};
//# sourceMappingURL=initReducers.js.map