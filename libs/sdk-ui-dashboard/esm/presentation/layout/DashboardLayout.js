// (C) 2020 GoodData Corporation
import React from "react";
import { useDashboardComponentsContext } from "../dashboardContexts/index.js";
/**
 * @internal
 */
export const DashboardLayout = (props) => {
    const { LayoutComponent } = useDashboardComponentsContext();
    return React.createElement(LayoutComponent, Object.assign({}, props));
};
//# sourceMappingURL=DashboardLayout.js.map