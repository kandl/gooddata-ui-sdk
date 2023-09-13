// (C) 2020-2022 GoodData Corporation
import React from "react";
import { useDashboardComponentsContext } from "../dashboardContexts/index.js";
/**
 * @internal
 */
export const ScheduledEmailManagementDialog = (props) => {
    const { ScheduledEmailManagementDialogComponent } = useDashboardComponentsContext();
    return React.createElement(ScheduledEmailManagementDialogComponent, Object.assign({}, props));
};
//# sourceMappingURL=ScheduledEmailManagementDialog.js.map