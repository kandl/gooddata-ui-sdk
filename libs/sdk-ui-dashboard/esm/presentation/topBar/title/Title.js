// (C) 2020 GoodData Corporation
import React from "react";
import { useDashboardComponentsContext } from "../../dashboardContexts/index.js";
/**
 * @internal
 */
export const Title = (props) => {
    const { TitleComponent } = useDashboardComponentsContext();
    return React.createElement(TitleComponent, Object.assign({}, props));
};
//# sourceMappingURL=Title.js.map