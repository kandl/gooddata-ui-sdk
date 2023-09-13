// (C) 2020 GoodData Corporation
import React from "react";
import { useDashboardComponentsContext } from "../../dashboardContexts/index.js";
/**
 * @internal
 */
export const ButtonBar = (props) => {
    const { ButtonBarComponent } = useDashboardComponentsContext();
    return React.createElement(ButtonBarComponent, Object.assign({}, props));
};
//# sourceMappingURL=ButtonBar.js.map