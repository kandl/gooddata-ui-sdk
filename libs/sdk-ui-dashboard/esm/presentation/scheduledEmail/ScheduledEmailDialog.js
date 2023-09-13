// (C) 2020 GoodData Corporation
import React from "react";
import { useDashboardComponentsContext } from "../dashboardContexts/index.js";
/**
 * @internal
 */
export const ScheduledEmailDialog = (props) => {
    const { ScheduledEmailDialogComponent } = useDashboardComponentsContext();
    return React.createElement(ScheduledEmailDialogComponent, Object.assign({}, props));
};
//# sourceMappingURL=ScheduledEmailDialog.js.map