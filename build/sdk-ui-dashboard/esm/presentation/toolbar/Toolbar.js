// (C) 2020-2022 GoodData Corporation
import React from "react";
import { useDashboardComponentsContext } from "../dashboardContexts/index.js";
/**
 * @internal
 */
export const Toolbar = (props) => {
    const { ToolbarComponent } = useDashboardComponentsContext();
    return React.createElement(ToolbarComponent, Object.assign({}, props));
};
//# sourceMappingURL=Toolbar.js.map