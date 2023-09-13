// (C) 2020 GoodData Corporation
import React from "react";
import { useDashboardComponentsContext } from "../../dashboardContexts/index.js";
/**
 * @internal
 */
export const TopBar = (props) => {
    const { TopBarComponent } = useDashboardComponentsContext();
    return React.createElement(TopBarComponent, Object.assign({}, props));
};
//# sourceMappingURL=TopBar.js.map