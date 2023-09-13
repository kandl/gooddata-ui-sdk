// (C) 2020 GoodData Corporation
import React from "react";
import { useDashboardComponentsContext } from "../../dashboardContexts/index.js";
/**
 * @internal
 */
export const MenuButton = (props) => {
    const { MenuButtonComponent } = useDashboardComponentsContext();
    return React.createElement(MenuButtonComponent, Object.assign({}, props));
};
//# sourceMappingURL=MenuButton.js.map