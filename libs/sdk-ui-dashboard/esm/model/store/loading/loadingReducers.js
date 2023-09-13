const setLoadingStart = (state) => {
    state.loading = true;
    state.result = undefined;
    state.error = undefined;
};
const setLoadingSuccess = (state) => {
    state.loading = false;
    state.result = true;
    state.error = undefined;
};
const setLoadingError = (state, action) => {
    state.loading = false;
    state.result = false;
    state.error = action.payload;
};
export const loadingReducers = {
    setLoadingStart,
    setLoadingSuccess,
    setLoadingError,
};
//# sourceMappingURL=loadingReducers.js.map