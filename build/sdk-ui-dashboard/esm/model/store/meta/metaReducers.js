// (C) 2021-2022 GoodData Corporation
import { EmptyDashboardDescriptor } from "./metaState.js";
import { invariant } from "ts-invariant";
const setMeta = (state, action) => {
    const { dashboard } = action.payload;
    state.persistedDashboard = dashboard;
    state.descriptor = dashboard
        ? {
            title: dashboard.title,
            description: dashboard.description,
            tags: dashboard.tags,
            shareStatus: dashboard.shareStatus,
            isUnderStrictControl: dashboard.isUnderStrictControl,
            isLocked: dashboard.isLocked,
        }
        : Object.assign({}, EmptyDashboardDescriptor);
};
const setDashboardTitle = (state, action) => {
    invariant(state.descriptor);
    state.descriptor.title = action.payload;
};
export const metaReducers = {
    setMeta,
    setDashboardTitle,
};
//# sourceMappingURL=metaReducers.js.map