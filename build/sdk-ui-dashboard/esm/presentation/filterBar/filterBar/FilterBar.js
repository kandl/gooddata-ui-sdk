// (C) 2020 GoodData Corporation
import React from "react";
import { useDashboardComponentsContext } from "../../dashboardContexts/index.js";
/**
 * @internal
 */
export const FilterBar = (props) => {
    const { FilterBarComponent } = useDashboardComponentsContext();
    return React.createElement(FilterBarComponent, Object.assign({}, props));
};
//# sourceMappingURL=FilterBar.js.map