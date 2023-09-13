// (C) 2021 GoodData Corporation
import React from "react";
import { selectCanManageAnalyticalDashboard, selectSettings, useDashboardSelector, } from "../../../../model/index.js";
import { LockedStatusIndicator } from "./LockedStatusIndicator.js";
/**
 * @alpha
 */
export const DefaultLockedStatus = (props) => {
    const settings = useDashboardSelector(selectSettings);
    const canManageAnalyticalDashboard = useDashboardSelector(selectCanManageAnalyticalDashboard);
    if (!settings.enableNewAnalyticalDashboardsNavigation || !canManageAnalyticalDashboard) {
        return null;
    }
    return React.createElement(LockedStatusIndicator, Object.assign({}, props));
};
//# sourceMappingURL=DefaultLockedStatus.js.map