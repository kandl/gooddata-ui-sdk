const setRenderMode = (state, action) => {
    state.renderMode = action.payload;
};
const setEditRenderMode = (state) => {
    state.renderMode = "edit";
};
const setViewRenderMode = (state) => {
    state.renderMode = "view";
};
export const renderModeReducers = {
    setRenderMode,
    setEditRenderMode,
    setViewRenderMode,
};
//# sourceMappingURL=renderModeReducers.js.map