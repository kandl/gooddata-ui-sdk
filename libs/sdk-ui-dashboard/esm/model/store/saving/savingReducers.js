const setSavingStart = (state) => {
    state.saving = true;
    state.result = undefined;
    state.error = undefined;
};
const setSavingSuccess = (state) => {
    state.saving = false;
    state.result = true;
    state.error = undefined;
};
const setSavingError = (state, action) => {
    state.saving = false;
    state.result = false;
    state.error = action.payload;
};
export const savingReducers = {
    setSavingStart,
    setSavingSuccess,
    setSavingError,
};
//# sourceMappingURL=savingReducers.js.map