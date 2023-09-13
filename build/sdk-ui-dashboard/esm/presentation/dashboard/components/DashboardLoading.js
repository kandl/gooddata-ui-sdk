// (C) 2022 GoodData Corporation
import React from "react";
import { useDashboardSelector, selectDashboardLoading } from "../../../model/index.js";
import { useDashboardComponentsContext } from "../../dashboardContexts/index.js";
import { DashboardInner } from "./DashboardInner.js";
export const DashboardLoading = (props) => {
    const { loading, error, result } = useDashboardSelector(selectDashboardLoading);
    const { ErrorComponent, LoadingComponent } = useDashboardComponentsContext();
    if (error) {
        return React.createElement(ErrorComponent, { message: error.message });
    }
    if (loading || !result) {
        return React.createElement(LoadingComponent, null);
    }
    return React.createElement(DashboardInner, Object.assign({}, props));
};
//# sourceMappingURL=DashboardLoading.js.map