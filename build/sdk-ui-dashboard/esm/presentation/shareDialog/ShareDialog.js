// (C) 2020 GoodData Corporation
import React from "react";
import { useDashboardComponentsContext } from "../dashboardContexts/index.js";
/**
 * @internal
 */
export const ShareDialog = (props) => {
    const { ShareDialogComponent } = useDashboardComponentsContext();
    return React.createElement(ShareDialogComponent, Object.assign({}, props));
};
//# sourceMappingURL=ShareDialog.js.map