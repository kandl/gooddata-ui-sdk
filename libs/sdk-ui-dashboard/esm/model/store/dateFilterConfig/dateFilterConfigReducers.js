// (C) 2021-2022 GoodData Corporation
const setDateFilterConfig = (state, action) => {
    const { dateFilterConfig, effectiveDateFilterConfig, isUsingDashboardOverrides } = action.payload;
    state.dateFilterConfig = dateFilterConfig;
    state.effectiveDateFilterConfig = effectiveDateFilterConfig;
    state.isUsingDashboardOverrides = isUsingDashboardOverrides;
};
const addDateFilterConfigValidationWarning = (state, action) => {
    if (!state.dateFilterConfigValidationWarnings) {
        state.dateFilterConfigValidationWarnings = [];
    }
    state.dateFilterConfigValidationWarnings.push(action.payload);
};
const clearDateFilterConfigValidationWarning = (state) => {
    state.dateFilterConfigValidationWarnings = [];
};
export const dateFilterConfigReducers = {
    setDateFilterConfig,
    addDateFilterConfigValidationWarning,
    clearDateFilterConfigValidationWarning,
};
//# sourceMappingURL=dateFilterConfigReducers.js.map